from pydantic import BaseModel


class HistoryModel(BaseModel):
    date: str
    action: str
