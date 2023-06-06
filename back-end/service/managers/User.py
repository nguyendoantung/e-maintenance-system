import datetime
import uuid
from http import HTTPStatus

import pytz
from sqlalchemy import desc

from data import Device, OrderItem, RepairOrder
from data import User as UserDB
from service.ApiModel.ListOrder import ListOrder
from service.model.User import ChangePasswordModel, CreateRepairOrder
from utils import create_session


class User():
    def __init__(self):
        self.session = create_session()

    def change_password(self, user_name: str, body: ChangePasswordModel):
        current_password = body.current_password
        find_user: UserDB = self.session.query(UserDB).filter(UserDB.user_name == user_name,UserDB.password == current_password).first()
        if not find_user:
            return {
                "message": "Sai mật khẩu"
            }, HTTPStatus.BAD_REQUEST
        else:
            find_user.password = body.new_password
            self.session.commit()
            return {
                "message": "Đổi mật khẩu thành công"
            }, HTTPStatus.OK
        
    def create_repair_order(self, user_name: str, body: CreateRepairOrder):
        find_user: UserDB = self.session.query(UserDB).filter(UserDB.user_name == user_name).first()
        user_id = find_user.id
        repair_order = RepairOrder(
            id=uuid.uuid4(),
            customer_id = user_id,
            create_date = datetime.datetime.now(tz=pytz.timezone("Asia/Ho_Chi_Minh")),
            status="Created",
            note=body.note,
            full_name=body.full_name,
            phone=body.phone,
            category=body.category,
            location=body.location,
            device_suggest=body.device_suggest
        )
        self.session.add(repair_order)
        self.session.commit()
        return {
            "message": "Tạo đơn thành công, vui lòng xem trong trang quản lý đơn sửa chữa"
        }, HTTPStatus.OK
    
    def get_user_repair_order(self, user_name: str, page=1, page_size=5):
        find_user: UserDB = self.session.query(UserDB).filter(UserDB.user_name == user_name).first()
        user_id = find_user.id

        orders = self.session.query(RepairOrder).filter(RepairOrder.customer_id == user_id, RepairOrder.status != "Complete")
        total = orders.count()
        orders.order_by(RepairOrder.create_date.desc()).limit(page_size).offset((page - 1) * page_size).all()
        res = []
        for order in orders:
            a = ListOrder(
                id=order.id,
                full_name=order.full_name,
                phone=order.phone,
                status=order.status,
                create_date=order.create_date.strftime("%m/%d/%Y, %H:%M:%S"),
                location=order.location,
                device=order.device_suggest
            )
            items = self.session.query(OrderItem).filter(OrderItem.order_id == order.id).all()
            price = 0
            for item in items:
                item_price = self.session.query(Device).filter(Device.id == item.item_id).first()
                price += item_price.price

            a.price = price

            staff = self.session.query(UserDB).filter(UserDB.id == order.staff_id).first()
            if staff:
                a.staff_name = f"{staff.FirstName} {staff.LastName}"
            res.append(a.dict(by_alias=True))
        return {"data": res, "total": total}, HTTPStatus.OK

