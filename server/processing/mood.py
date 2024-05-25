import time

from transformers import pipeline

from structure.data_types import Mood

classifier = pipeline(
    "text-classification",
    model="bhadresh-savani/bert-base-uncased-emotion",
    return_all_scores=True
)


def infer_mood(user_message: str) -> Mood:
    start_time = time.time_ns() / 1_000_000
    result = classifier(user_message)
    result[0].sort(key=lambda x: x["score"], reverse=True)
    end_time = time.time_ns() / 1_000_000

    # Interpret mood
    mood_str = result[0][0]["label"].lower()
    mood = Mood[mood_str]
    print(f"[Mood] Result: {mood.name} with confidence {result[0][0]['score'] * 100}%")
    print("[Mood] Time elapsed:", (end_time - start_time) / 1000, "s")
    return mood


if __name__ == "__main__":
    print(infer_mood("Unicorns are poopy and frolicking in a field of butter.").name)
    print(infer_mood("i just failed my midterm and now i want to beat up an elderly man").name)
