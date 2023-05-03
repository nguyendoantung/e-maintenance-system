from data.Base import Base
from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship


class OrderItem(Base):
    __tablename__ = "order_item"

    order_id = Column(
        ForeignKey("repair_order.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
        primary_key=True,
    )
    item_id = Column(
        ForeignKey("device.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
        primary_key=True,
    )
    number = Column(Integer(), nullable=False, default=0)

    order = relationship(
        "RepairOrder", primaryjoin="OrderItem.order_id == RepairOrder.id"
    )
    item = relationship("Device", primaryjoin="OrderItem.item_id == Device.id")

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
