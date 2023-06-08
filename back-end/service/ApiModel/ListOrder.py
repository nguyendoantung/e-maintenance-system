import uuid
from typing import Optional

from pydantic import BaseModel


class ListOrder(BaseModel):
    id: uuid.UUID
    full_name: str
    phone: str
    create_date: str
    staff_name: Optional[str]
    status: str
    location: str
    device: Optional[str]
    note: Optional[str]

class ListOrderForUser(BaseModel):
    id: uuid.UUID
    full_name: str
    phone: str
    create_date: str
    price: Optional[str]
    staff_name: Optional[str]
    status: str
    location: str
    device: Optional[str]
    note: Optional[str]

class ListOrderOfStaff(BaseModel):
    id: uuid.UUID
    full_name: str
    phone: str
    create_date: str
    status: str
    price: str
    location: str
    note: str
    device: str
    device_use: Optional[list[str]]