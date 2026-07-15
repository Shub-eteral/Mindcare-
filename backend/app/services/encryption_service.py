"""
Field-level encryption for sensitive data at rest.

Important: this protects data IN THE DATABASE (e.g. if a disk or
backup leaks). It does NOT make this "end-to-end encrypted" in the
Signal/WhatsApp sense - your AI has to read the plaintext message to
respond to it, so this backend process is necessarily a party to the
conversation. True E2E only makes sense for human-to-human features
(see the peer-matching item in docs/ROADMAP.md).
"""

from cryptography.fernet import Fernet
from app.core.config import settings

_fernet = Fernet(settings.fernet_key.encode())


def encrypt(plaintext: str) -> str:
    return _fernet.encrypt(plaintext.encode()).decode()


def decrypt(ciphertext: str) -> str:
    return _fernet.decrypt(ciphertext.encode()).decode()
