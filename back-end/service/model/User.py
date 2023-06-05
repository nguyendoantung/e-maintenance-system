import re
import uuid
from typing import Optional

from pydantic import BaseModel, root_validator, validator


class ChangePasswordModel(BaseModel):
    current_password: str
    new_password: str
    repeat_password: str

class CreateRepairOrder(BaseModel):
    full_name: str
    phone: str
    category: uuid.UUID
    location: str
    device_suggest: Optional[str]
    note: Optional[str]
