import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv('diabetes_prediction_dataset.csv')

# doing encoding cus Randomforest classifier or linera classifier do not work with string data, they require string values
le = LabelEncoder()
df['gender'] = le.fit_transform(df['gender'])  # Male=1, Female=0
cat_cols = df.select_dtypes(include='object').columns
df = pd.get_dummies(df, columns=cat_cols, drop_first=True)
df.rename(columns={'smoking_history_not current': 'smoking_history_not_current'}, inplace=True)

# saving my cleaned df to csv for reference
df.to_csv("cleaned_diabetes_data.csv", index=False)

# Preprocessing
y = df['diabetes']
X = df.drop('diabetes', axis=1)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
print(f"Accuracy: {model.score(X_test, y_test):.3f}")

# Save model
joblib.dump(model, 'diabetes_model.pkl')
print("Model saved as diabetes_model.pkl")

import json

# Save feature names
with open("model_features.json", "w") as f:
    json.dump(list(X.columns), f)
