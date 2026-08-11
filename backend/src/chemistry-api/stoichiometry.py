from chempy import balance_stoichiometry

def calculate_stoichiometry(given: str, moles: float, target: str, reactants: list[str], products: list[str]) -> float:

    try: 
        react, prod = balance_equation(reactants, products)

    except Exception: raise ValueError("Invalid chemical formula: Double check your Reactants and/or Products")


    all_coeffs = {**react, **prod}

    if given not in all_coeffs:
        raise ValueError(f"'{given}' was not found in the equation")

    if target not in all_coeffs:
        raise ValueError(f"'{target}' was not found in the equation")

    given_coeff = all_coeffs[given]
    target_coeff = all_coeffs[target]

    result = (moles / given_coeff) * target_coeff


    return float(round(result, 3))

def balance_equation(reactants: list, products: list) -> dict:

    reac = set(reactants)
    prod = set(products)


    return balance_stoichiometry(reac, prod)