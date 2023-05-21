import uuid

from pydantic import BaseModel


class ListDevice(BaseModel):
    id: uuid.UUID
    category: str
    price: int
    name: str
    image_link: str
