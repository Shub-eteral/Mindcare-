import uuid

from fastapi import APIRouter

router = APIRouter()


@router.post("/session")
def create_session() -> dict:
    # Anonymous by default - no email or name required to start
    # chatting. Swap for real auth later if you add cross-device sync.
    return {"session_id": str(uuid.uuid4())}
