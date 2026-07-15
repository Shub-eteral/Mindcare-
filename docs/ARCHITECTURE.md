# Architecture notes

## Stack
- **Frontend:** React + TypeScript + Tailwind (Vite). Common, well-documented,
  huge hiring pool if you ever bring on a developer.
- **Backend:** Python + FastAPI. Async, auto-generates API docs at `/docs`,
  and Python has the deepest AI/ML ecosystem if you build custom models later.
- **AI:** Claude API by default, wired through one file
  (`backend/app/services/ai_service.py`) so it's swappable.
- **DB:** SQLite for local dev, Postgres recommended in production - same
  SQLAlchemy code path either way once you wire up real models.

## Three decisions made for you here - please revisit them

### 1. "End-to-end encryption" - what's actually possible
True end-to-end encryption (the Signal/WhatsApp definition) means only the
two conversation endpoints can decrypt the content - not even the server
operator. That works for peer-to-peer chat. It does **not** work for an AI
chatbot, because the AI has to read the plaintext message to generate a
reply. The backend process is, definitionally, a party to the conversation.

What's built instead - and what's honestly the more accurate thing to market -
is:
- TLS in transit (table stakes, not a differentiator)
- Encryption at rest for stored messages (`services/encryption_service.py`)
- Minimal retention and strict access controls
- True E2E *is* possible for the peer-matching feature in your synopsis's
  "Additional Part" section, once two humans are talking to each other
  instead of to the AI. That's the right place for it.

### 2. "Continuous assessment of user's brain activity"
This phrase could mean two very different products:
- **Conversational signal** - tone, sentiment, engagement inferred from what
  someone types or says. Pure software, feasible now. Stubbed in
  `services/mood_analysis.py`.
- **Literal biometric data** - EEG headbands, heart-rate wearables. Needs
  hardware partnerships, and in most countries starts running into
  medical-device-adjacent regulation once you're inferring mental state from
  physiological data.

This scaffold assumes the first interpretation. If you meant the second,
don't build further until you've had a legal review specific to health-tech
regulation in your target markets.

### 3. The safety/crisis layer is a starting point, not a finished feature
`backend/app/core/safety.py` does keyword matching. That's enough to
demonstrate the *architecture* - screening happens before the AI ever sees
the message - but keyword matching alone will miss things, and will also
false-positive on normal venting. Before any real person uses this:
- Have a mental health professional review and expand the detection logic
- Verify every number in `CRISIS_RESOURCES` directly with the organization
  before launch, and add resources for every country you launch in
- Decide explicitly what happens for borderline cases keyword matching won't catch

## Data flow
Frontend -> Backend API -> Safety screening -> (if flagged: crisis resources,
skip the AI entirely) -> (if clear: AI service -> encrypted storage).
See the architecture diagram earlier in this conversation.
