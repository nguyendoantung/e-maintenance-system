import datetime
import uuid
from http import HTTPStatus

import pytz

from data import RepairOrder
from data import User as UserDB
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