from datetime import datetime

from data.Base import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType


class OrderHistory(Base):
    __tablename__ = "order_history"

    id = Column(UUIDType(), nullable=False, primary_key=True)
    order_id = Column(
        ForeignKey("repair_order.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    customer_id = Column(
        ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False
    )
    staff_id = Column(
        ForeignKey("shop_member.user_id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    price = Column(Integer(), nullable=False, default=0)
    start_time = Column(DateTime(), nullable=False, default=datetime.now)
    complete_time = Column(DateTime(), nullable=False, default=datetime.now)
    note = Column(String(200))
    rate = Column(Integer(), default=1)

    order = relationship(
        "RepairOrder", primaryjoin="OrderHistory.order_id == RepairOrder.id"
    )
    customer = relationship("User", primaryjoin="OrderHistory.customer_id == User.id")
    staff = relationship(
        "ShopMember", primaryjoin="OrderHistory.staff_id == ShopMember.user_id"
    )

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
