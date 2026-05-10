from flask import Flask, request, jsonify
from flask_cors import CORS
from core import PasswordStrengthEvaluator
import random
import string

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

evaluator = PasswordStrengthEvaluator()

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    password = data.get('password', '')
    
    analysis = evaluator.analyze_password(password)
    return jsonify(analysis)

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    base_password = data.get('password', '')
    
    # If no base password, generate a random one to start with or use empty
    if not base_password:
        base_password = evaluator._generate_cryptographic_password(12)
        
    # Analyze first to get weaknesses
    analysis = evaluator.analyze_password(base_password)
    suggestions = evaluator.generate_smart_passwords(base_password, analysis)
    
    return jsonify(suggestions)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
