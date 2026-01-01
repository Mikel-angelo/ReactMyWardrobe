import uvicorn
from backend.main import app

uvicorn.run(
    app,
    host="127.0.0.1",
    port=8000,
    reload=False,
    log_config=None,
)

