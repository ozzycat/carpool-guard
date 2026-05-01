import signal
import sys
import time

running = True

def handle_stop(signum, frame):
    global running
    print("Received stop signal, shutting down...")
    running = False

signal.signal(signal.SIGTERM, handle_stop)

while running:
    # work
    time.sleep(1)

print("Process has been stopped gracefully.")
sys.exit(0)