from fastapi import FastAPI
from chempy.util import periodic


app = FastAPI()

@app.get("/percent-yield/{formula}")
def calculate_perecent_yield(actual: float, theoretical: float):
    return round((actual / theoretical) * 100)