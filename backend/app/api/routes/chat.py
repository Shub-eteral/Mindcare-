from fastapi import APIRouter

from app.core.safety import screen_message, CRISIS_RESOURCES
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import generate_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    check = screen_message(payload.message)

    if check.flagged:
        # Safety net fires BEFORE the AI ever sees the message. This
        # should never be the only safety measure in a live product -
        # see docs/ARCHITECTURE.md.
        return ChatResponse(
            reply=(
                "It sounds like you might be going through something really "
                "heavy right now. I'm not able to help with this the way a "
                "trained person can - please reach out to one of the "
                "resources below. You don't have to be in crisis to use them."
            ),
            flagged=True,
            resources=list(CRISIS_RESOURCES.values()),
        )

    history = [m.model_dump() for m in payload.history]
    reply = generate_response(payload.message, history)
    return ChatResponse(reply=reply, flagged=False)
