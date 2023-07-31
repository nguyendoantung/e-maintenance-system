import uuid
from http import HTTPStatus

from data import Category, Device, OrderHistory, RepairOrder, ShopMember, User

# from service.ApiModel.ListDevice import CreateDevice, ListDevice
from service.ApiModel.History import HistoryModel
from utils import create_session


class HistoryOrder:
    def __init__(self) -> None:
        self.session = create_session()

    def get_history_one_order(self, user_id: uuid, order_id: uuid):
        order: RepairOrder = (
            self.session.query(RepairOrder).filter(RepairOrder.id == order_id).first()
        )

        if not order:
            return {"msg": "Không tìm thấy đơn!"}, HTTPStatus.NOT_FOUND
        if order.customer_id != uuid.UUID(user_id):
            return {"msg": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
        query = (
            self.session.query(OrderHistory)
            .filter(OrderHistory.order_id == order_id)
            .order_by(OrderHistory.update_time)
        )
        histories = query.all()
        return {
            "data": [history.as_dict() for history in histories],
            "total": query.count(),
        }
