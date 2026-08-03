from fastapi import FastAPI
from stoichiometry import balance_equation
from molar_mass import calculate_molar_mass

app = FastAPI()

@app.get("/limiting-reagent/{formula}")
def calculate_limiting_reagent(
    reactants: list[str], products: list[str], masses: list[float]
    ):

    react, prod = balance_equation(reactants, products)
    all_coeffs = {**react, **prod} 
    reference_prod = list(prod.keys())[0]
    reference_coeff = all_coeffs[reference_prod]

    product_moles = {}

    for formula, mass in zip(reactants, masses): 
        moles = mass / calculate_molar_mass(formula)
        product_moles[formula] = (moles / all_coeffs[formula]) * reference_coeff

    return min(product_moles, key=product_moles.get)