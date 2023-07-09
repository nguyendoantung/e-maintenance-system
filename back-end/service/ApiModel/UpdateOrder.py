import uuid

from pydantic import BaseModel


class RejectOrder(BaseModel):
    reason: str


class DeviceItem(BaseModel):
    device_id: uuid.UUID
    number: int


class AddDevice(BaseModel):
    devices: list[DeviceItem]
