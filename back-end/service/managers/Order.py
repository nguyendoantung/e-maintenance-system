import datetime
import uuid
from http import HTTPStatus

import pytz
from data import Device, OrderHistory, OrderItem, RepairOrder, User
from service.ApiModel.ListOrder import ListOrder, ListOrderAdmin, ListOrderOfStaff
from service.ApiModel.ListStaff import Staff
from service.ApiModel.UpdateOrder import DeviceItem, RejectOrder
from service.constant import OrderStatus
from service.utils.email.EmailController import SendEmailController
from utils import create_session


class OrderManager:
    def __init__(self) -> None:
        self.session = create_session()

    def add_device_to_order(
        self, order_id: uuid.UUID, staff_id: uuid.UUID, device_item: DeviceItem
    ):
        # check staff_id pair with order_id
        order: RepairOrder = (
            self.session.query(RepairOrder).filter(RepairOrder.id == order_id).first()
        )
        device = (
            self.session.query(Device)
            .filter(Device.id == device_item.device_id)
            .first()
        )
        if not order or str(order.staff_id) != staff_id or not device:
            return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
        else:
            order_item = OrderItem(
                order_id=order_id,
                item_id=device_item.device_id,
                number=device_item.number,
            )

            self.session.add(order_item)
            history = OrderHistory(
                id=uuid.uuid4(),
                order_id=order_id,
                update_time=datetime.datetime.now(tz=pytz.timezone("Asia/Ho_Chi_Minh")),
                action=f"Thêm thiết bị {device.name}, số lượng {device_item.number}",
            )
            self.session.add(history)
            self.session.commit()
        return {"msg": "Thêm thiết bị thành công!"}, HTTPStatus.OK
