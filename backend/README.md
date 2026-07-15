# Backend - MindCare AI

## Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Then edit `.env`:
- `ANTHROPIC_API_KEY` - get one at https://console.anthropic.com
- `FERNET_KEY` - generate with:
  ```bash
  python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
  ```
- `SECRET_KEY` - any long random string

## Run
```bash
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Auto-generated docs: http://localhost:8000/docs
