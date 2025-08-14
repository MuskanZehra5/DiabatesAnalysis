from flask import Flask, request, jsonify
import pandas as pd
from enum import Enum
import joblib
import os

app = Flask(__name__)

# Load model
model_path = os.path.join(os.path.dirname(__file__), "diabetes_model.pkl")
model = joblib.load(model_path)
    
class SmokingHistory(str, Enum):
    Never = "never"
    Former = "former"
    Current = "current"
    Ever = "ever"
    NotCurrent = "not current"

@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    # Map smoking history to one-hot encoding
    smoking_mapping = {
        SmokingHistory.Never: [0, 0, 0, 0, 1],
        SmokingHistory.Former: [0, 0, 1, 0, 0],
        SmokingHistory.Current: [1, 0, 0, 0, 0],
        SmokingHistory.Ever: [0, 1, 0, 0, 0],
        SmokingHistory.NotCurrent: [0, 0, 0, 1, 0]
    }

    # Ensure column order matches training
    feature_order = [
        "gender",
        "age",
        "hypertension",
        "heart_disease",
        "bmi",
        "HbA1c_level",
        "blood_glucose_level",
        "smoking_history_current",
        "smoking_history_ever",
        "smoking_history_former",
        "smoking_history_never",
        "smoking_history_not_current"
    ]
    print(model.feature_names_in_)

    # Build sample
    sample = pd.DataFrame([{
        "gender": 1 if data['gender'] else 0,
        "age": data['age'],
        "hypertension": 1 if data['hypertension'] else 0,
        "heart_disease": 1 if data['heart_disease'] else 0,
        "bmi": data['bmi'],
        "HbA1c_level": data['HbA1c_level'],
        "blood_glucose_level": data['blood_glucose_level'],
        "smoking_history_current": smoking_mapping[data['smoking_history']][0],
        "smoking_history_ever": smoking_mapping[data['smoking_history']][1],
        "smoking_history_former": smoking_mapping[data['smoking_history']][2],
        "smoking_history_not_current": smoking_mapping[data['smoking_history']][3],
        "smoking_history_never": smoking_mapping[data['smoking_history']][4]
    }], columns=feature_order)

    # Predict
    probability = model.predict_proba(sample)[0][1]
    
    # Determine risk level
    if probability >= 0.85:
        risk_level = "Critical"
        at_risk = True
        recommendation = "Immediate medical consultation recommended"
    elif probability >= 0.60:
        risk_level = "High"
        at_risk = True
        recommendation = "Schedule a doctor visit soon"
    elif probability >= 0.30:
        risk_level = "Moderate"
        at_risk = True
        recommendation = "Consider lifestyle changes"
    else:
        risk_level = "Low"
        at_risk = False
        recommendation = "Maintain healthy habits"

    return jsonify({
        "atRisk": at_risk,
        "riskProbability": round(probability, 2),
        "riskLevel": risk_level,
        "recommendation": recommendation
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)