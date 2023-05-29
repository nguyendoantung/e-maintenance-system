import re
from typing import Optional

from pydantic import BaseModel, root_validator, validator


class ChangePasswordModel(BaseModel):
    current_password: str
    new_password: str
    repeat_password: str

    # @validator("current_password", "new_password", "repeat_password")
    # @root_validator()
    # def validate_password(cls, values):
        # if 
        # print("-----------")
        # # print(cls.__dict__)
        # # print(cls.current_password)
        # # print(cls.new_password)

        # # print(cls.repeat_password)

        # # print(values)
        # # print(value)
        # # print(kwargs)
        # print("-----------")

        # print(values.get("current_password"))
        # print(values.new_password)
        # print(values.repeat_password)
        # pass
