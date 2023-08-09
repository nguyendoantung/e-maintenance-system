import datetime
import uuid
from http import HTTPStatus

import pytz
from data import Category, Device, OrderHistory, OrderItem, RepairOrder
from data import User as UserDB
from service.ApiModel.ListOrder import ListOrder, ListOrderForUser
from service.constant import OrderStatus
from service.model.User import ChangePasswordModel, CreateRepairOrder
from service.utils.email.EmailController import SendEmailController
from sqlalchemy import desc
from utils import create_session


class User:
    def __init__(self):
        self.session = create_session()

    def change_password(self, user_name: str, body: ChangePasswordModel):
        current_password = body.current_password
        find_user: UserDB = (
            self.session.query(UserDB)
            .filter(UserDB.user_name == user_name, UserDB.password == current_password)
            .first()
        )
        if not find_user:
            return {"message": "Sai mật khẩu"}, HTTPStatus.BAD_REQUEST
        else:
            find_user.password = body.new_password
            self.session.commit()
            return {"message": "Đổi mật khẩu thành công"}, HTTPStatus.OK

    def create_repair_order(self, user_name: str, body: CreateRepairOrder):
        find_user: UserDB = (
            self.session.query(UserDB).filter(UserDB.user_name == user_name).first()
        )
        user_id = find_user.id
        repair_order_id = uuid.uuid4()
        repair_order = RepairOrder(
            id=repair_order_id,
            customer_id=user_id,
            create_date=datetime.datetime.now(tz=pytz.timezone("Asia/Ho_Chi_Minh")),
            status=OrderStatus.START,
            note=body.note,
            full_name=body.full_name,
            phone=body.phone,
            category=body.category,
            location=body.location,
            device_suggest=body.device_suggest,
        )
        category_name = (
            self.session.query(Category)
            .filter(Category.id == body.category)
            .first()
            .name
        )
        self.session.add(repair_order)
        self.session.commit()

        initial_order = OrderHistory(
            id=uuid.uuid4(),
            order_id=repair_order_id,
            update_time=datetime.datetime.now(tz=pytz.timezone("Asia/Ho_Chi_Minh")),
            action="Tạo đơn",
        )
        self.session.add(initial_order)
        self.session.commit()
        try:
            SendEmailController().send_email(
                receive_email=find_user.email,
                subject="Tạo đơn thành công",
                template_params={
                    "user_name": f"{find_user.FirstName} {find_user.LastName}",
                    "order_id": str(repair_order_id).upper(),
                    "category": category_name,
                    "create_time": repair_order.create_date,
                    "location": body.location,
                    "phone": body.phone,
                    "device_suggest": body.device_suggest,
                    "note": body.note,
                },
                template_file_name="create_order_success.html",
            )
        except Exception:
            pass
        return {
            "message": "Tạo đơn thành công, vui lòng xem trong trang quản lý đơn sửa chữa"
        }, HTTPStatus.OK

    def get_user_repair_order(self, user_name: str, page=1, page_size=5):
        find_user: UserDB = (
            self.session.query(UserDB).filter(UserDB.user_name == user_name).first()
        )
        user_id = find_user.id

        orders = self.session.query(RepairOrder).filter(
            RepairOrder.customer_id == user_id,
            RepairOrder.status.in_(OrderStatus.ACTIVE_ORDER_STATUS),
        )

        total = orders.count()
        show_orders = (
            orders.order_by(RepairOrder.create_date.desc())
            .limit(page_size)
            .offset((page - 1) * page_size)
            .all()
        )
        res = []
        for order in show_orders:
            a = ListOrderForUser(
                id=order.id,
                full_name=order.full_name,
                phone=order.phone,
                status=order.status,
                create_date=order.create_date.strftime("%m/%d/%Y, %H:%M:%S"),
                location=order.location,
                device=order.device_suggest,
            )
            items = (
                self.session.query(OrderItem)
                .filter(OrderItem.order_id == order.id)
                .all()
            )
            price = 0
            for item in items:
                item_price = (
                    self.session.query(Device).filter(Device.id == item.item_id).first()
                )
                price += item_price.price

            a.price = price

            staff = (
                self.session.query(UserDB).filter(UserDB.id == order.staff_id).first()
            )
            if staff:
                a.staff_name = f"{staff.FirstName} {staff.LastName}"
            res.append(a.dict(by_alias=True))
        return {"data": res, "total": total}, HTTPStatus.OK

    def get_all_of_user_repair_order(self, user_name: str, page=1, page_size=5):
        find_user: UserDB = (
            self.session.query(UserDB).filter(UserDB.user_name == user_name).first()
        )
        user_id = find_user.id

        orders = self.session.query(RepairOrder).filter(
            RepairOrder.customer_id == user_id,
            # RepairOrder.status.in_(OrderStatus.ACTIVE_ORDER_STATUS),
        )

        total = orders.count()
        show_orders = (
            orders.order_by(RepairOrder.create_date.desc())
            .limit(page_size)
            .offset((page - 1) * page_size)
            .all()
        )
        res = []
        for order in show_orders:
            a = ListOrderForUser(
                id=order.id,
                full_name=order.full_name,
                phone=order.phone,
                status=order.status,
                create_date=order.create_date.strftime("%m/%d/%Y, %H:%M:%S"),
                location=order.location,
                device=order.device_suggest,
            )
            items = (
                self.session.query(OrderItem)
                .filter(OrderItem.order_id == order.id)
                .all()
            )
            price = 0
            for item in items:
                item_price = (
                    self.session.query(Device).filter(Device.id == item.item_id).first()
                )
                price += item_price.price

            a.price = price

            staff = (
                self.session.query(UserDB).filter(UserDB.id == order.staff_id).first()
            )
            if staff:
                a.staff_name = f"{staff.FirstName} {staff.LastName}"
            res.append(a.dict(by_alias=True))
        return {"data": res, "total": total}, HTTPStatus.OK

    def delete_order(self, user_id, order_id):
        order: RepairOrder = (
            self.session.query(RepairOrder).filter(RepairOrder.id == order_id).first()
        )
        if not order:
            return {}, HTTPStatus.BAD_REQUEST

        if order.customer_id != uuid.UUID(user_id):
            return {
                "msg": "Bạn không có quyền tương tác với đơn!"
            }, HTTPStatus.UNAUTHORIZED
        if order.status == OrderStatus.ON_PROCESS:
            return {
                "msg": "Đơn đang trong quá trình thực thi, không thể hủy!"
            }, HTTPStatus.BAD_REQUEST
        if order.status in OrderStatus.END_ORDER_STATUS:
            return {
                "msg": "Quá trình thực thi đơn đã kết thúc!"
            }, HTTPStatus.BAD_REQUEST
        order.status = OrderStatus.DELETE
        self.session.commit()
        history = OrderHistory(
            id=uuid.uuid4(),
            order_id=order_id,
            update_time=datetime.datetime.now(tz=pytz.timezone("Asia/Ho_Chi_Minh")),
            action=f"Hủy đơn",
        )
        self.session.add(history)
        self.session.commit()
        return {"msg": "Thành công"}, HTTPStatus.OK
