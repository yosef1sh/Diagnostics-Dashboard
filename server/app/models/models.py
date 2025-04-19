from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Literal

class InsightCreate(BaseModel):
    created_at: datetime
    type: Literal["bearing", "gear", "motor"]
    severity: Literal["healthy", "alarm", "critical"]

class Insight(InsightCreate):
    diagnostic_id: UUID
