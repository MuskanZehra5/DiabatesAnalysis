# Create ML project directory
mkdir health-risk-ml
cd health-risk-ml

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install pandas scikit-learn joblib