import pandas as pd
import joblib

# Load the trained model
model = joblib.load("diabetes_model.pkl")

# Sample input (must match features used during training)
sample = pd.DataFrame([{
    "gender": 1,                     # 1 = Male (if LabelEncoded), 0 = Female
    "age": 45,
    "hypertension": 0,
    "heart_disease": 0,
    "bmi": 58.5,
    "HbA1c_level": 6.3,
    "blood_glucose_level": 150,
    "smoking_history_current": 1,
    "smoking_history_ever": 0,
    "smoking_history_former": 0,
    "smoking_history_never": 0,
    "smoking_history_not_current": 0
}])

# Predict
probability = model.predict_proba(sample)[0][1]

if probability >= 0.85:
    risk_level = "Yes"
    at_risk = True
elif probability >= 0.60:
    risk_level = "Likely"
    at_risk = True
else:
    risk_level = "No"
    at_risk = False

# Output
response = {
    "AtRisk": at_risk,
    "RiskProbability": round(probability, 2),
    "RiskLevel": risk_level
}

# Print response as JSON
print("Prediction:", response)
