from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType

from data.Base import Base


class RepairOrder(Base):
    __tablename__ = "repair_order"

    id = Column(
        UUIDType(),
        primary_key=True,
    )
    customer_id = Column(
        ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False
    )
    staff_id = Column(
        ForeignKey("shop_member.user_id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    create_date = Column(DateTime(), nullable=False, default=datetime.now)
    status = Column(String(200))
    note = Column(String(200))
    full_name = Column(String(200))
    phone = Column(String(20))
    category = Column(
        UUIDType()
    )
    location = Column(String(1000))
    device_suggest = Column(String(1000))

    customer = relationship("User", primaryjoin="RepairOrder.customer_id == User.id")
    staff = relationship("ShopMember", primaryjoin="RepairOrder.staff_id == ShopMember.user_id")
