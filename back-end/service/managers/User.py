from http import HTTPStatus

from data import User as UserDB
from service.model.User import ChangePasswordModel
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