from data.Base import Base
from sqlalchemy import Column, ForeignKey, Integer


class OrderItem(Base):
    __tablename__ = "order_item"

    order_id = Column(
        ForeignKey("repair_order.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    item_id = Column(
        ForeignKey("device.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    number = Column(Integer(), nullable=False, default=0)

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
