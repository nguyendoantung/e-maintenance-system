import uuid

from pydantic import BaseModel


class ListDevice(BaseModel):
    id: uuid.UUID
    category: str
    price: str
    name: str
    image_link: str
