import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("Google API key not found. Please set the GOOGLE_API_KEY environment variable in the .env file.")

genai.configure(api_key=api_key)

def list_supported_models():
    print("List of models that support generateContent:\n")
    try:
        models = genai.list_models()
        generate_content_models = [m.name for m in models if "generateContent" in m.supported_generation_methods]
        if generate_content_models:
            for name in generate_content_models:
                print(name)
        else:
            print("No models support generateContent.")
    except Exception as e:
        print(f"Error listing models for generateContent: {e}")

    print("\nList of models that support embedContent:\n")
    try:
        models = genai.list_models()
        embed_content_models = [m.name for m in models if "embedContent" in m.supported_generation_methods]
        if embed_content_models:
            for name in embed_content_models:
                print(name)
        else:
            print("No models support embedContent.")
    except Exception as e:
        print(f"Error listing models for embedContent: {e}")

def model_info(model_name):
    model_info = genai.get_model(model_name)
    print("\n"*3)
    print(model_info)

if __name__ == "__main__":
    list_supported_models()
    model_info("models/gemini-1.5-flash-latest")
    model_info("models/gemini-1.5-pro-exp-0827")
    


# List of models that support generateContent:

# models/gemini-1.0-pro-latest
# models/gemini-1.0-pro
# models/gemini-pro
# models/gemini-1.0-pro-001
# models/gemini-1.0-pro-vision-latest
# models/gemini-pro-vision
# models/gemini-1.5-pro-latest
# models/gemini-1.5-pro-001
# models/gemini-1.5-pro-002
# models/gemini-1.5-pro
# models/gemini-1.5-pro-exp-0801
# models/gemini-1.5-pro-exp-0827
# models/gemini-1.5-flash-latest
# models/gemini-1.5-flash-001
# models/gemini-1.5-flash-001-tuning
# models/gemini-1.5-flash
# models/gemini-1.5-flash-exp-0827
# models/gemini-1.5-flash-002
# models/gemini-1.5-flash-8b
# models/gemini-1.5-flash-8b-001
# models/gemini-1.5-flash-8b-latest
# models/gemini-1.5-flash-8b-exp-0827
# models/gemini-1.5-flash-8b-exp-0924
# models/learnlm-1.5-pro-experimental
# models/gemini-exp-1114
# models/gemini-exp-1121

# List of models that support embedContent:

# models/embedding-001
# models/text-embedding-004