from data.Base import Base
from sqlalchemy import Column, String
from sqlalchemy_utils import UUIDType

class Shop(Base):
    __tablename__ = "shop"

    id = Column(
        UUIDType(),
        primary_key=True,
    )
    shop_name = Column(String(200), nullable=False)
    shop_image = Column(String(255), nullable=True)

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}