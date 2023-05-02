from data.Base import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy_utils import UUIDType


class Device(Base):
    __tablename__ = "device"

    id = Column(UUIDType(), nullable=False, primary_key=True)
    device_type = Column(
        ForeignKey("device_type.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    price = Column(Integer(), nullable=False)
    shop_id = Column(
        ForeignKey("shop.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False
    )
    image_link = Column(String(1000))

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
