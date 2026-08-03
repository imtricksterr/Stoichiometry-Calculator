from fastapi import FastAPI
from chempy import balance_stoichiometry
from molar_mass import calculate_molar_mass, parse_formula

app = FastAPI()

@app.get("/stoichiometry/{formula}")
def calculate_stoichiometry(given: str, moles: float, target: str, reactants: list[str], products: list[str]):

    react, prod = balance_equation(reactants, products)

    all_coeffs = {**react, **prod}

    given_coeff = all_coeffs[given]
    target_coeff = all_coeffs[target]

    result = (moles / given_coeff) * target_coeff


    return round(result, 3)

def balance_equation(reactants: list, products: list):

    reac = set(reactants)
    prod = set(products)

    return balance_stoichiometry(reac, prod)


