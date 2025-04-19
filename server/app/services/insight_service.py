import json
from uuid import UUID, uuid4
from datetime import datetime
from typing import List
from app.models.models import Insight, InsightCreate
from app.utils.insight_utils import save_insights
from fastapi import HTTPException


def add_insight(insights: List[Insight], insight_data: InsightCreate) -> Insight:
    try:
        new_insight = Insight(
            diagnostic_id=uuid4(),
            **insight_data.dict()
        )
        insights.append(new_insight)
        save_insights(insights)
        return new_insight
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error adding insight: {str(e)}")

def filter_insights(insights: List[Insight], from_date: datetime) -> List[Insight]:
    try:
        return [i for i in insights if i.created_at >= from_date]
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error filtering insights: {str(e)}")
