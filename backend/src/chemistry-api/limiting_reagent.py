from fastapi import FastAPI
import periodictable


app = FastAPI()

@app.get("/limiting-reagent/{formula}")
def calculate_limiting_reagent(
    r1_formula: str, r1_coeff: float, r1_mass: float,
    r2_formula: str, r2_coeff: float, r2_mass: float,
    product_formula: str, product_coeff: float
):


    
    return { "result": 18.015 } # placeholder