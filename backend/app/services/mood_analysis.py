"""
Stub for the "continuous assessment of user's brain activity" feature
from the synopsis.

This implementation assumes you mean *conversational signal* - tone,
sentiment, and engagement inferred from what someone types or says -
NOT literal biometric data (EEG, heart-rate, etc.). Those are two
completely different products:

  - Conversational signal: pure software, feasible now. What's below.
  - Literal biometric/brain data: needs hardware partnerships, and in
    most countries starts running into medical-device-adjacent
    regulation once you're inferring mental state from physiological
    data. Much bigger scope, much bigger legal review. Don't build
    further in this direction until that's a deliberate decision.
"""


def infer_emotional_tone(message: str) -> dict:
    # Placeholder only. Options when you build this for real:
    #   1. Have ai_service.py's model classify tone as a side output
    #      of the same call (cheapest - no extra request).
    #   2. A small dedicated classifier if you need it decoupled from
    #      the conversational model.
    return {"tone": "neutral", "confidence": 0.0, "note": "not yet implemented"}
