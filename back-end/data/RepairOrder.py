import datetime

from data.Base import Base
from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy_utils import UUIDType


class RepairOrder(Base):
    __tablename__ = "repair_order"

    id = Column(
        UUIDType(),
        primary_key=True,
    )
    customer_id = Column(
        ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False
    )
    staff_if = Column(
        ForeignKey("shop_member.user_id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    create_date = Column(DateTime(), nullable=False, default=datetime.now)
    status = Column(String(200))
    note = Column(String(200))
