from fastapi import FastAPI
from chempy.util import periodic


app = FastAPI()

@app.get("/stoichiometry/{formula}")
def calculate_stoichiometry(given: str, moles: float, target: str):

    return { "result": 18.015 } # placeholder