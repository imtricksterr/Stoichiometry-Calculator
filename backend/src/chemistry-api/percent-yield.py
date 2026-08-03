from fastapi import FastAPI


app = FastAPI()

@app.get("/percent-yield/{formula}")
def calculate_perecent_yield(actual: float, theoretical: float):
    return round((actual / theoretical) * 100, 2)