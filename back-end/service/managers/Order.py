import uuid
from http import HTTPStatus

from data import Device, OrderItem, RepairOrder, User
from service.ApiModel.ListOrder import ListOrder, ListOrderAdmin, ListOrderOfStaff
from service.ApiModel.ListStaff import Staff
from service.ApiModel.UpdateOrder import RejectOrder
from service.constant import OrderStatus
from service.utils.email.EmailController import SendEmailController
from utils import create_session


class OrderManager:
    def __init__(self) -> None:
        self.session = create_session()

    # def add_device_to_order(self, order_id: uuid.UUID, )
