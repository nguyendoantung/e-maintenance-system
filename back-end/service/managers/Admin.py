import uuid
from http import HTTPStatus

from data import Device, OrderItem, RepairOrder, User
from service.ApiModel.ListOrder import ListOrder, ListOrderAdmin, ListOrderOfStaff
from service.ApiModel.ListStaff import Staff
from service.ApiModel.UpdateOrder import RejectOrder
from service.constant import OrderStatus
from service.utils.email.EmailController import SendEmailController
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

    def get_order_for_staff(self, page=1, page_size=10):
        query = self.session.query(RepairOrder).filter(RepairOrder.staff_id.is_(None))
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
                note=order.note,
            )

            staff = self.session.query(User).filter(User.id == order.staff_id).first()
            if staff:
                a.staff_name = f"{staff.FirstName} {staff.LastName}"
            res.append(a.dict(by_alias=True))
        return {"data": res, "total": total}, HTTPStatus.OK

    def accept_order(self, order_id: uuid.UUID, staff_id: uuid.UUID):
        order: RepairOrder = (
            self.session.query(RepairOrder).filter(RepairOrder.id == order_id).first()
        )
        if order.staff_id:
            return {"message": "Đơn đã có người thực thi"}, HTTPStatus.FORBIDDEN
        else:
            order.staff_id = staff_id
            order.status = OrderStatus.ON_PROCESS
            user: User = (
                self.session.query(User).filter(User.id == order.customer_id).first()
            )
            staff_user: User = (
                self.session.query(User).filter(User.id == staff_id).first()
            )
            try:
                SendEmailController().send_email(
                    receive_email=user.email,
                    subject="Đơn được chấp thuận",
                    template_params={
                        "user_name": f"{user.FirstName} {user.LastName}",
                        "order_id": str(order_id).upper(),
                        "staff_profile_link": staff_user.profile_link,
                        "staff_name": f"{staff_user.FirstName} {staff_user.LastName}",
                        "staff_phone": staff_user.phone,
                    },
                    template_file_name="accept_order.html",
                )
            except Exception:
                pass
            self.session.commit()
            return {}

    def get_order_of_staff(self, staff_id: uuid.UUID, page=1, page_size=5):
        query = self.session.query(RepairOrder).filter(
            RepairOrder.staff_id == staff_id, RepairOrder.status != "Complete"
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
                note=order.device_suggest,
            )
            items = (
                self.session.query(OrderItem)
                .filter(OrderItem.order_id == order.id)
                .all()
            )
            price = 0
            for item in items:
                item_price = (
                    self.session.query(Device).filter(Device.id == item.item_id).first()
                )
                price += item_price.price * item.number

            a.price = price
            res.append(a.dict(by_alias=True))
        return {
            "data": res,
            "total": total,
        }, HTTPStatus.OK

    def complete_order(self, staff_id, order_id):
        order = (
            self.session.query(RepairOrder)
            .filter(RepairOrder.staff_id == staff_id, RepairOrder.id == order_id)
            .first()
        )
        if not order:
            return {}, HTTPStatus.BAD_REQUEST
        else:
            order.status = "Complete"
            self.session.commit()
            return {}, HTTPStatus.OK

    def get_order_for_admin(self, page=1, page_size=10):
        query = self.session.query(RepairOrder).filter(RepairOrder.staff_id.is_(None))
        orders = query.limit(page_size).offset((page - 1) * page_size)
        total = query.count()
        res = []
        for order in orders:
            a = ListOrderAdmin(
                id=order.id,
                full_name=order.full_name,
                phone=order.phone,
                status=order.status,
                create_date=order.create_date.strftime("%m/%d/%Y, %H:%M:%S"),
                location=order.location,
                device=order.device_suggest,
                note=order.note,
            )

            staff = self.session.query(User).filter(User.id == order.staff_id).first()
            if staff:
                a.staff_name = f"{staff.FirstName} {staff.LastName}"
            res.append(a.dict(by_alias=True))
        return {"data": res, "total": total}, HTTPStatus.OK

    def reject_order(self, body: RejectOrder, order_id):
        query = self.session.query(RepairOrder).filter(RepairOrder.id == order_id)

        check_order_has_process = query.filter(
            RepairOrder.staff_id.is_not(None)
        ).first()
        if check_order_has_process:
            return {
                "message": "Không thể hủy đơn đã có người thực thi!"
            }, HTTPStatus.BAD_REQUEST

        check_order_has_complete_or_reject = query.filter(
            RepairOrder.status.in_([OrderStatus.COMPLETE, OrderStatus.REJECT])
        ).first()
        if check_order_has_complete_or_reject:
            return {
                "message": "Không thể từ chối đơn đã hoàn thành hoặc bị từ chối!"
            }, HTTPStatus.BAD_REQUEST

        order: RepairOrder = query.first()
        if not order:
            return {"message": "Không tìm được đơn tương ứng"}, HTTPStatus.BAD_REQUEST
        customer_id = order.customer_id
        user: User = self.session.query(User).filter(User.id == customer_id).first()
        order.status = OrderStatus.REJECT
        self.session.commit()

        try:
            SendEmailController().send_email(
                receive_email=f"{user.email}",
                subject="Đơn bị từ chối",
                template_params={
                    "user_name": f"{user.FirstName} {user.LastName}",
                    "order_name": order.full_name,
                    "order_id": str(order_id).upper().replace("-", ""),
                    "reason": body.reason,
                },
                template_file_name="reject_order.html",
            )
        except Exception:
            pass

        return {"message": "Từ chối đơn thành công"}, HTTPStatus.OK
