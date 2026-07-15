# Roadmap

## Phase 1 - built in this scaffold
- [x] Chat UI (React + Tailwind)
- [x] Chat API (FastAPI) wired to Claude
- [x] Pre-AI safety screening layer
- [x] Pseudonymous sessions (no email required)
- [x] Encryption-at-rest scaffold

## Phase 2 - next logical build
- [ ] Real database persistence + optional user accounts (keep anonymous
      by default)
- [ ] Voice chat (speech-to-text in, text-to-speech out - same chat
      endpoint underneath)
- [ ] Anonymous peer-matching ("connect to users with similar issues") -
      true end-to-end encryption belongs here, not in the AI chat
- [ ] A real mood/tone model to replace the `mood_analysis.py` stub

## Phase 3 - needs a decision from you first
- [ ] Religious/philosophical text integration (Gita, Bible, Osho, folk
      lore) - recommend opt-in per tradition, retrieval-augmented (RAG),
      not baked into the core AI persona by default
- [ ] "Brain activity" feature - see docs/ARCHITECTURE.md; this forks into
      two very different products depending on what you meant

## Ongoing, not a phase
- Legal/privacy review for each market you launch in (mental health data
  is sensitive-category data almost everywhere)
- Professional review of the safety/crisis protocol
