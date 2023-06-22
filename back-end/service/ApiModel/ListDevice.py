import uuid

from pydantic import BaseModel


class ListDevice(BaseModel):
    id: uuid.UUID
    category: str
    price: str
    name: str
    image_link: str


class CreateDevice(BaseModel):
    name: str
    price: str
    category: uuid.UUID
    image_url: str
    unit: str
