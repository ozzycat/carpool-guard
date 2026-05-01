import signal
import sys
import time
import random
import json
from dotenv import load_dotenv
import os
import requests

load_dotenv()
API_URL = os.getenv("API_URL")
# CAMERA_ID = os.getenv("CAMERA_ID")

running = True

def handle_stop(signum, frame):
    global running
    print("Received stop signal, shutting down...")
    running = False

signal.signal(signal.SIGTERM, handle_stop)

# TODO: connect camera endpoint to get actual license plate data instead of simulating it
plates = ["ABC123", "EGGROL", "KLM456", "EATPHO", "JHG982"];

while running:
    plate = random.choice(plates);
    payload = {
        "plate": plate,
        "confidence": round(random.uniform(0.8, 0.99), 2),
        "timestamp": time.time()
    }

    try:
        response = requests.post(API_URL, json=payload)
        print(f"Sent plate {plate}, server responded {response.status_code}", flush=True)
    except Exception as e:
        print(f"Error sending plate {plate}: {e}", flush=True)

    time.sleep(2)

print("Process has been stopped gracefully.", flush=True)
sys.exit(0)