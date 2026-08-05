from fastapi import FastAPI
from pydantic import BaseModel
from molar_mass import calculate_molar_mass
from stoichiometry import calculate_stoichiometry
from limiting_reagent import calculate_limiting_reagent
from percent_yield import calculate_percent_yield

app = FastAPI()

class MolarMassRequest(BaseModel):
    formula: str

class StoichiometryRequest(BaseModel): 
    given: str
    moles: float
    target: str
    reactants: list[str]
    products: list[str]

class LimitingReagentRequest(BaseModel):
    reactants: list[str]
    products: list[str]
    masses: list[float]

class PercentYieldRequest(BaseModel):
    actual: float
    theoretical: float


@app.post("/molar-mass")
def molar_mass(req: MolarMassRequest): 
    result = calculate_molar_mass(req.formula)
    return { "result": result }  

@app.post("/stoichiometry")
def stoichiometry(req: StoichiometryRequest): 
    result = calculate_stoichiometry(req.given, req.moles, req.target, req.reactants, req.products)
    return { "result": result }  

@app.post("/limiting-reagent")
def limiting_reagent(req: LimitingReagentRequest): 
    result = calculate_limiting_reagent(req.reactants, req.products, req.masses)
    return { "result": result }  

@app.post("/percent-yield")
def percent_yield(req: PercentYieldRequest):
    result = calculate_percent_yield(req.actual, req.theoretical)
    return { "result": result }  

