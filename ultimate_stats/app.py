from flask import Flask, render_template, jsonify
import speech_recognition as sr

app = Flask(__name__)
recognizer = sr.Recognizer()
microphone = sr.Microphone()

# Initialiser la variable transcription globalement
transcription = ""

def recognize_speech():
    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        transcription = recognizer.recognize_google(audio)
        return transcription
    except sr.RequestError:
        return "API unavailable"
    except sr.UnknownValueError:
        return "Unable to recognize speech"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_record', methods=['POST'])
def start_record():
    global transcription  # Utiliser la variable globale
    transcription = recognize_speech()
    return jsonify({"success": True})

@app.route('/stop_record', methods=['POST'])
def stop_record():
    global transcription  # Utiliser la variable globale
    return jsonify({"message": transcription})

if __name__ == "__main__":
    app.run(debug=True)
