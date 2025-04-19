import os
import json
from uuid import UUID
from datetime import datetime, timezone
from fastapi import HTTPException
from typing import List
from app.models.models import Insight

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'insights.json')

def load_insights() -> List[Insight]:
    try:
        with open(DATA_PATH, 'r') as f:
            data = json.load(f)
            return [Insight(
                diagnostic_id=UUID(item['diagnostic_id']),
created_at=datetime.fromisoformat(item['created_at']).replace(tzinfo=timezone.utc),
                type=item['type'],
                severity=item['severity']
            ) for item in data]
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Corrupted insights data file.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading insights: {str(e)}")

def save_insights(insights: List[Insight]):
    try:
        with open(DATA_PATH, 'w') as f:
            json.dump([
                {
                    'diagnostic_id': str(i.diagnostic_id),
                    'created_at': i.created_at.isoformat(),
                    'type': i.type,
                    'severity': i.severity
                } for i in insights
            ], f, indent=4)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving insights: {str(e)}")

insights_db: List[Insight] = load_insights()
