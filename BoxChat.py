from flask import Flask, request
from flask_socketio import SocketIO, emit
import google.generativeai as genai

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="gevent")

API_KEY = "AIzaSyBUpr-GOU0AWwnEAmzSeh_IJR9jvTk4wfA"
genai.configure(api_key=API_KEY)

generation_config = {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 127,
}
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    safety_settings=safety_settings,
    generation_config=generation_config,
    system_instruction=(
        "You are a customer service advisor at the BASO chain of stores, with the main branch located at Vietnam Aviation Academy, Campus 2. "
        "You should respond in Vietnamese, keeping your answers concise, easy to understand, and polite. "
        "Your job is to focus on customer needs and recommend fast food dishes similar to those offered by KFC, Jollibee, or other chains, but never mention this to the customers. "
        "Your goal is to satisfy customers' needs when they seek advice on a specific dish."
    ),
)

chat_sessions = {}

@socketio.on("connect")
def handle_connect():
    print("Client connected:", request.sid)

@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected:", request.sid)
    if request.sid in chat_sessions:
        del chat_sessions[request.sid]

@socketio.on("message")
def handle_message(data):
    user_message = data

    if request.sid not in chat_sessions:
        chat_sessions[request.sid] = model.start_chat(history=[])

    chat_session = chat_sessions[request.sid]
    response = chat_session.send_message(user_message)
    bot_message = response.text

    emit("botMessage", bot_message)

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    print("Box Chat Run")

    server = pywsgi.WSGIServer(("0.0.0.0", 8000), app, handler_class=WebSocketHandler)
    server.serve_forever()
