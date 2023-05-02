from data.Base import Base
from sqlalchemy import Column, String
from sqlalchemy_utils import UUIDType


class Category(Base):
    __tablename__ = "category"

    id = Column(
        UUIDType(),
        primary_key=True,
    )
    name = Column(String(100), nullable=False)

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
