import re
from typing import Optional

from pydantic import BaseModel, validator
from service.constant import AuthenticateMessage, RegexPattern


class LoginModel(BaseModel):
    user_name: str
    password: str


class RegisterAccount(BaseModel):
    email: str
    user_name: str
    password: str
    first_name: str
    last_name: str
    phone: Optional[str]

    @validator("email")
    def validate_email(cls, value, values):
        if not re.match(RegexPattern.EMAIL, value):
            raise ValueError("Email is not valid")
        return value
