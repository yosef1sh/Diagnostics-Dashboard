from fastapi import APIRouter
from typing import List
from datetime import datetime
from app.models.models import Insight, InsightCreate
from app.services.insight_service import  add_insight, filter_insights
from app.utils.insight_utils import  insights_db

router = APIRouter()

@router.post("/insights", response_model=dict)
def create_insight(insight: InsightCreate):
    new_insight = add_insight(insights_db, insight)
    return {"diagnostic_id": new_insight.diagnostic_id}

@router.get("/insights", response_model=List[Insight])
def get_insights(from_date: datetime):
    return filter_insights(insights_db, from_date)

@router.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}
