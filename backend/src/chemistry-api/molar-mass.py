from fastapi import FastAPI
from chempy.util import periodic


app = FastAPI()

@app.get("/molar-mass/{formula}")
def calculate_molar_mass(formula: str):


    return { "result": 18.015 } # placeholder