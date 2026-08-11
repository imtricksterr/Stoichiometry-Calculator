import periodictable

def parse_formula(formula: str) -> dict:
    elements = dict()
    symbol = ""
    i = 0

    while i < len(formula):
        if formula[i].isupper(): # start of element symbol
            symbol = formula[i]
            i += 1

            if i < len(formula) and formula[i].islower(): # check that it's not a new element
                symbol += formula[i]
                i += 1

            count = ""
            while i < len(formula) and formula[i].isdigit(): # grab subscript
                count += formula[i]
                i += 1

            elements[symbol] = elements.get(symbol, 0) + int(count if count else  1)

        else: i += 1

    return elements

def calculate_molar_mass(formula: str) -> float:
    elements = parse_formula(formula)
    total = 0.0

    for symbol, count in elements.items():
        if not hasattr(periodictable, symbol): raise ValueError(f"'{symbol}' is not a valid element symbol")
        element = getattr(periodictable, symbol)
        total += element.mass * count

    return round(total, 3)
