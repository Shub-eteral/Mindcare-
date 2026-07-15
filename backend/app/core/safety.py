"""
Safety layer: runs BEFORE any message reaches the AI model.

This is a first-pass, keyword-based safety net - NOT a clinical tool,
and not sufficient on its own. Before a single real user touches this
app, have a mental health professional review and expand the detection
logic below, and decide how borderline cases (things that don't match
a keyword but are still concerning) get handled.
"""

from dataclasses import dataclass, field

# Non-exhaustive starting list. Expand thoughtfully - false negatives
# are dangerous, but a tool that constantly flags normal venting about
# a bad day will just get its warnings ignored.
CRISIS_INDICATORS = [
    "kill myself", "end my life", "want to die", "suicide",
    "hurting myself", "self harm", "self-harm", "no reason to live",
    "better off dead", "can't go on", "cant go on", "ending it all",
]


@dataclass
class SafetyCheckResult:
    flagged: bool
    matched_terms: list[str] = field(default_factory=list)


def screen_message(text: str) -> SafetyCheckResult:
    lowered = text.lower()
    matches = [term for term in CRISIS_INDICATORS if term in lowered]
    return SafetyCheckResult(flagged=bool(matches), matched_terms=matches)


# Seeded with verified resources for Nepal + one global directory as a
# fallback. TODO before launch:
#   1. Let the user select their country during onboarding.
#   2. Verify every number below directly with the org before you rely
#      on it - hotlines change, and this list is a starting point only.
#   3. Add resources for every country you actually launch in.
CRISIS_RESOURCES = {
    "NP": {
        "name": "National Suicide Prevention Helpline (Nepal)",
        "phone": "1166",
        "notes": "Free, government-run, operated with TPO Nepal and WHO Nepal support.",
    },
    "NP_EMERGENCY": {
        "name": "Nepal Police Emergency",
        "phone": "100",
        "notes": "For immediate physical danger.",
    },
    "INTL": {
        "name": "Find A Helpline",
        "url": "https://findahelpline.com",
        "notes": "Directory of vetted crisis lines by country, for users outside Nepal.",
    },
}
