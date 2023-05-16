from http import HTTPStatus

from data import User
from utils import create_session


class Admin:
    def __init__(self) -> None:
        self.session = create_session()

    def get_staff(self):
        users = self.session.query(User).filter(User.role.contains("staff")).all()

        return {"user": [user.as_dict() for user in users]}, HTTPStatus.OK
