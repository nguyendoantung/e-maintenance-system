import uuid
from typing import Optional

from pydantic import BaseModel


class ListOrder(BaseModel):
    id: uuid.UUID
    full_name: str
    phone: str
    create_date: str
    status: str
    staff_name: Optional[str]
    price: Optional[str]
    location: str
    device: Optional[str]