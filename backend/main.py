import os
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
import pickle
from store import save_to_json_file, get_latest_data

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

try :
    if GOOGLE_API_KEY:
        print("Google Key Found")
        genai.configure(api_key=GOOGLE_API_KEY)
except Exception as e:
    print("Google API key not found. Please set it in the .env file.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model = tf.keras.models.load_model("football_lstm_model_with_regularization.h5")
    print("Loaded TensorFlow Model Successfully")
except:
    print("Failed to load TensorFlow Model")

try:
    with open("label_encoders.pkl", "rb") as f:
        label_encoders = pickle.load(f)
    print("Loaded Label Encoders Successfully")
except:
    print("Label Encoder not loaded")

try:
    model_genai = genai.GenerativeModel("gemini-1.5-pro-exp-0827")
    #  gemini-1.5-pro-exp-0827  gemini-1.5-flash-002
    print("Loaded Generative AI Model Successfully")
except:
    print("Failed to load Generative AI Model")

user_data = {"chat_history": get_latest_data()}

class MatchInput(BaseModel):
    home_team: str = Field(..., min_length=1, max_length=50, example="Team A")
    away_team: str = Field(..., min_length=1, max_length=50, example="Team B")

def predict_result(home_team: str, away_team: str):
    try:
        home_team_encoded = label_encoders["HomeTeam"].transform([home_team])[0]
        away_team_encoded = label_encoders["AwayTeam"].transform([away_team])[0]

        input_data = np.zeros((1, model.input_shape[-1]))
        input_data[0, 0] = home_team_encoded
        input_data[0, 1] = away_team_encoded
        input_data[0, 2] = 0  # Placeholder for additional features
        input_data = input_data.reshape((1, 1, model.input_shape[-1]))

        prediction = model.predict(input_data)
        result_index = np.argmax(prediction)
        result_label = label_encoders["FTR"].inverse_transform([result_index])[0]
        return result_label
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

def get_fixture_history(home_team: str, away_team: str):
    try:
        llm_prompt = f"For the given home_team: {home_team} and away_team: {away_team}, give the history of past fixtures."
        llm_response = model_genai.generate_content(llm_prompt)
        return llm_response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"History generation error: {str(e)}")


@app.post("/predict")
def get_prediction(input_data: MatchInput):
    try:
        result = predict_result(input_data.home_team, input_data.away_team)
        result_description = {
            "H": "Win Predicted for Home team",
            "D": "Draw Predicted",
            "A": "Win Predicted for Away team"
        }.get(result, "Unknown Result")

        history_summary = get_fixture_history(input_data.home_team, input_data.away_team)

        return {
            "success": True,
            "data": {
                "home_team": input_data.home_team,
                "away_team": input_data.away_team,
                "predicted_result": result_description,
                "history_summary": history_summary,
            },
        }
    except HTTPException as e:
        return {"success": False, "message": e.detail}
    except Exception as e:
        return {"success": False, "message": f"Unexpected Error: {str(e)}"}


class ChatInput(BaseModel):
    input: str

@app.post("/chat")
def chat(input_data: ChatInput):
    try:
        user_input = input_data.input
        llm_prompt = f"""
        You are a football/soccer expert. Based on user input: {user_input} user your football knowledge and give answer to user and interact with the user.
        Hold conversations with the user only on football. If the user deviates and asks about any other topic, respond with => 'Let's just stick to football for this moment.' Also, while giving responses, keep in mind the user history."""

        if not isinstance(user_data.get("chat_history"), list):
            user_data["chat_history"] = []  

        formatted_history = []
        for h in user_data["chat_history"]:
            if isinstance(h, dict) and "role" in h and "parts" in h:
                formatted_history.append({"role": h["role"], "content": h["parts"]})
            else:
                print("Invalid chat history entry:", h)

        chat = model_genai.start_chat(history=formatted_history)
        response = chat.send_message(llm_prompt)
        formatted_response = response.text.strip()

        user_data["chat_history"].append({"role": "user", "content": user_input})
        user_data["chat_history"].append({"role": "model", "content": formatted_response})
        save_to_json_file({"chat_history": user_data["chat_history"]})

        return {
            "success": True,
            "data": {
                "user_input": user_input,
                "response": formatted_response,
                "chat_history": user_data["chat_history"],
            },
        }
    except ValueError as e:
        return {"success": False, "message": f"Value Error: {str(e)}"}
    except Exception as e:
        return {"success": False, "message": f"Unexpected Error: {str(e)}"}


@app.get("/history")
def get_history():
    try:
        history = user_data.get("chat_history")
        return {"success": True, "data": history}
    except Exception as e:
        return {"success": False, "message": f"An unexpected error occurred: {str(e)}"}

@app.delete("/delete_history")
def delete_history():
    try:
        user_data["chat_history"] = []
        save_to_json_file({"chat_history": []})
        return {"success": True, "message": "Chat history has been successfully deleted."}
    except Exception as e:
        return {"success": False, "message": f"An unexpected error occurred: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
