from data.Base import Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy_utils import UUIDType

class ShopCategory(Base):
    __tablename__ = "shop_category"

    shop_id = Column(
        ForeignKey("shop.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    category_id = Column(
        ForeignKey("category.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
