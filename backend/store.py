import json
import os
from threading import Lock

lock = Lock()

DATA_FILE = "data.json"

def initialize_data_file():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f, indent=4)

def save_to_json_file(data):
    with lock:
        with open(DATA_FILE, 'r+') as f:
            try:
                existing_data = json.load(f)
            except json.JSONDecodeError:
                existing_data = []
            existing_data.append(data)
            f.seek(0)
            json.dump(existing_data, f, indent=4)

# def get_latest_data():
#     with lock:
#         if not os.path.exists(DATA_FILE):
#             return {"chat_history": []}
#         with open(DATA_FILE, 'r') as f:
#             try:
#                 existing_data = json.load(f)
#                 if not existing_data:
#                     return {"chat_history": []}
#                 return existing_data[-1].get("chat_history", [])
#             except json.JSONDecodeError:
#                 return {"chat_history": []}
            
def get_latest_data():
    try:
        with open("chat_history.json", "r") as f:
            data = json.load(f)
            if isinstance(data.get("chat_history"), list):
                return data.get("chat_history")
    except (FileNotFoundError, json.JSONDecodeError):
        return []  


# Initializes data file 
initialize_data_file()
