from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    anthropic_api_key: str
    secret_key: str
    fernet_key: str
    database_url: str = "sqlite:///./dev.db"
    allowed_origins: str = "http://localhost:5173"
    environment: str = "development"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
