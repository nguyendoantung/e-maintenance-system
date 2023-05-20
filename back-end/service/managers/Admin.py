from http import HTTPStatus

from sqlalchemy import desc

from data import User
from service.ApiModel.ListStaff import Staff
from utils import create_session


class Admin:
    def __init__(self) -> None:
        self.session = create_session()

    def get_staff(self, page=1, page_size=10):
        users = (
            self.session.query(User)
            .filter(User.role.contains("staff"))
            .order_by(User.email)
        )

        results = users.limit(page_size).offset((page - 1) * page_size).all()

        return {
            "user": [Staff(**user.as_dict()).dict(by_alias=True) for user in results],
            "total": users.count(),
        }, HTTPStatus.OK
