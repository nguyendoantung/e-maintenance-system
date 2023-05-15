import re
import uuid
from http import HTTPStatus

from data import User
from flask_jwt_extended import create_access_token
from service.constant import AuthenticateMessage, RegexPattern
from service.model.Authenticate import LoginModel, RegisterAccount
from sqlalchemy import or_
from utils import create_session


class Authenticate:
    def __init__(self) -> None:
        self.session = create_session()

    def login(self, body: LoginModel):
        email_check = re.fullmatch(RegexPattern.EMAIL, body.user_name)
        if email_check:
            user = (
                self.session.query(User)
                .filter(User.email == body.user_name, User.password == body.password)
                .first()
            )
        else:
            user = (
                self.session.query(User)
                .filter(
                    User.user_name == body.user_name, User.password == body.password
                )
                .first()
            )
        if not user:
            return {"msg": AuthenticateMessage.UNAUTHORIZED}, HTTPStatus.UNAUTHORIZED

        customer_identity = {
            "id": user.id,
            "user_name": user.user_name,
            "role": user.role,
        }

        access_token = create_access_token(identity=customer_identity)
        return {"access_token": access_token}, HTTPStatus.OK

    def register(self, register_model: RegisterAccount):
        check_duplicate_filed = (
            self.session.query(User)
            .filter(
                or_(
                    User.user_name == register_model.user_name,
                    User.email == register_model.email,
                    User.phone == register_model.phone,
                )
            )
            .first()
        )
        if check_duplicate_filed:
            return {"msg": AuthenticateMessage.DUPLICATE_INFO}, 409
        else:
            new_user = User(
                id=uuid.uuid4(),
                email=register_model.email,
                FirstName=register_model.first_name,
                LastName=register_model.last_name,
                user_name=register_model.user_name,
                password=register_model.password,
                phone=register_model.phone,
                role="user",
            )
            self.session.add(new_user)
            customer_identity = {
                "user_name": register_model.user_name,
                "role": "user",
            }
            self.session.commit()
            access_token = create_access_token(identity=customer_identity)
            return {"access_token": access_token}, HTTPStatus.OK
