import uuid
from http import HTTPStatus

from data import Category, Device, ShopMember, User
from service.ApiModel.ListDevice import CreateDevice, ListDevice
from utils import create_session

# from sqlalchemy import text


class DeviceManager:
    def __init__(self) -> None:
        self.session = create_session()

    def get_device(self, category_id: uuid.UUID, page=1, page_size=10):
        if category_id:
            devices = (
                self.session.query(Device, Category.name.label("category_name"))
                .join(Category, Category.id == category_id)
                .filter(Device.device_type == category_id)
            )

        else:
            devices = self.session.query(
                Device, Category.name.label("category_name")
            ).join(Category, Category.id == Device.device_type)

        results = devices.limit(page_size).offset((page - 1) * page_size).all()

        return {
            "device": [
                ListDevice(
                    id=result.Device.id,
                    category=result.category_name,
                    name=result.Device.name,
                    price=f"{result.Device.price} VND/{result.Device.unit}",
                    image_link=result.Device.image_link,
                ).dict(by_alias=True)
                for result in results
            ],
            "total": devices.count(),
        }, HTTPStatus.OK

    def add_device(self, admin_user: str, body: CreateDevice):
        shop_member: ShopMember = (
            self.session.query(ShopMember)
            .join(User, ShopMember.user_id == User.id)
            .filter(User.user_name == admin_user)
        ).first()
        device = Device(
            id=uuid.uuid4(),
            name=body.name,
            device_type=body.category,
            price=body.price,
            unit=body.unit,
            shop_id=shop_member.shop_id,
            image_link=body.image_url,
        )
        self.session.add(device)
        self.session.commit()
        return {"message": "Tạo thiết bị thành công"}, HTTPStatus.OK
