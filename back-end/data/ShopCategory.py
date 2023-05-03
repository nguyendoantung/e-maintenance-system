from data.Base import Base
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship


class ShopCategory(Base):
    __tablename__ = "shop_category"

    shop_id = Column(
        ForeignKey("shop.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
        primary_key=True,
    )
    category_id = Column(
        ForeignKey("category.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
        primary_key=True,
    )

    shop = relationship("Shop", primaryjoin="ShopCategory.shop_id == Shop.id")
    category = relationship(
        "Category", primaryjoin="ShopCategory.category_id == Category.id"
    )

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
