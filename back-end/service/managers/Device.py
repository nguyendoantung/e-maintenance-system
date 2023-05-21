import uuid
from http import HTTPStatus

from data import Category, Device
from service.ApiModel.ListDevice import ListDevice
from utils import create_session

# from sqlalchemy import text


class DeviceManager:
    def __init__(self) -> None:
        self.session = create_session()

    def get_device(self, category_id: uuid.UUID, page=1, page_size=10):
        devices = self.session.query(Device, Category.name.label("category_name")).join(
            Category, Category.id == category_id
        )

        results = devices.limit(page_size).offset((page - 1) * page_size).all()
        print(results)
        return {
            "device": [
                ListDevice(
                    id=result.Device.id,
                    category=result.category_name,
                    name=result.Device.name,
                    price=result.Device.price,
                    image_link=result.Device.image_link,
                ).dict(by_alias=True)
                for result in results
            ],
            "total": devices.count(),
        }, HTTPStatus.OK
