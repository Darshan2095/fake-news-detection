from fastapi import FastAPI
import joblib

app = FastAPI()

model = joblib.load("model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsInput(BaseModel):
    text: str


@app.post("/predict")
def predict_news(input: NewsInput):
    # Transform input
    transformed = vectorizer.transform([input.text])

    # Prediction
    prediction = model.predict(transformed)[0]
    probability = model.predict_proba(transformed)[0].max()

    # Convert label
    label = "Real" if prediction == 1 else "Fake"

    return {
        "prediction": label,
        "confidence": float(probability)
    }