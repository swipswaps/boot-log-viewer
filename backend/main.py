import subprocess
import json
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://swipswaps.github.io"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/boot-logs")
def get_boot_logs(limit: int = Query(100)):
    try:
        cmd = ["journalctl", "-b", "-o", "json", "-n", str(limit)]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        logs = []
        for line in result.stdout.strip().split('\n'):
            if line:
                try:
                    logs.append(json.loads(line))
                except:
                    continue
        return {"logs": logs, "count": len(logs)}
    except subprocess.CalledProcessError as e:
        return {"error": f"journalctl failed: {e.stderr}"}
