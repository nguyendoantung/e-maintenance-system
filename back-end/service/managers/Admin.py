import uuid
from http import HTTPStatus

from data import Device, OrderItem, RepairOrder, User
from service.ApiModel.ListOrder import ListOrder, ListOrderOfStaff
from service.ApiModel.ListStaff import Staff
from sqlalchemy import desc
from utils import create_session


class Admin:
    def __init__(self) -> None:
        self.session = create_session()

    def get_staff(self, page=1, page_size=10):
        users = (
            self.session.query(User)
            .filter(User.role.contains("staff"))
            .order_by(User.email)
        )

        results = users.limit(page_size).offset((page - 1) * page_size).all()

        return {
            "user": [Staff(**user.as_dict()).dict(by_alias=True) for user in results],
            "total": users.count(),
        }, HTTPStatus.OK

    def get_order_for_staff(self, page = 1, page_size = 10):
        query = (
            self.session.query(RepairOrder).filter(RepairOrder.staff_id.is_(None))
        )
        orders = query.limit(page_size).offset((page - 1) * page_size)
        total = query.count()
        res = []
        for order in orders:
            a = ListOrder(
                id=order.id,
                full_name=order.full_name,
                phone=order.phone,
                status=order.status,
                create_date=order.create_date.strftime("%m/%d/%Y, %H:%M:%S"),
                location=order.location,
                device=order.device_suggest,
                note=order.note
            )

            staff = self.session.query(User).filter(User.id == order.staff_id).first()
            if staff:
                a.staff_name = f"{staff.FirstName} {staff.LastName}"
            res.append(a.dict(by_alias=True))
        return {"data": res, "total": total}, HTTPStatus.OK

    def accept_order(self, order_id: uuid.UUID, staff_id: uuid.UUID):
        order = self.session.query(RepairOrder).filter(RepairOrder.id == order_id).first()
        if order.staff_id:
            return {
                "message": "Đơn đã có người thực thi"
            }, HTTPStatus.FORBIDDEN
        else:
            order.staff_id = staff_id
            self.session.commit()
            return {}
        
    def get_order_of_staff(self, staff_id: uuid.UUID, page=1, page_size = 5):
        query = (
            self.session.query(RepairOrder).filter(RepairOrder.staff_id == staff_id)
        )
        orders = query.limit(page_size).offset((page - 1) * page_size)
        total = query.count()
        res = []
        for order in orders:
            a = ListOrderOfStaff(
                id=order.id,
                full_name=order.full_name,
                phone=order.phone,
                status=order.status,
                price=0,
                create_date=order.create_date.strftime("%m/%d/%Y, %H:%M:%S"),
                location=order.location,
                device=order.device_suggest,
                note=order.device_suggest
            )
            items = self.session.query(OrderItem).filter(OrderItem.order_id == order.id).all()
            price = 0
            for item in items:
                item_price = self.session.query(Device).filter(Device.id == item.item_id).first()
                price += item_price.price * item.number

            a.price = price
            res.append(a.dict(by_alias=True))
        return {
            "data": res,
            "total": total,
        }, HTTPStatus.OK