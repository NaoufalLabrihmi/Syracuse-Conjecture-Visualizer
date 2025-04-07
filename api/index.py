from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict
import numpy as np
from mangum import Mangum

app = FastAPI(title="Syracuse Conjecture API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SequenceRequest(BaseModel):
    start_number: int = Field(..., gt=0, description="Starting number for the sequence")

class SequenceResponse(BaseModel):
    sequence: List[int]
    steps: int
    max_value: int
    statistics: Dict[str, float]

def calculate_syracuse_sequence(n: int) -> List[int]:
    sequence = [n]
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        sequence.append(n)
    return sequence

@app.get("/")
async def root():
    return {"message": "Welcome to the Syracuse Conjecture API"}

@app.post("/sequence", response_model=SequenceResponse)
async def get_sequence(request: SequenceRequest):
    try:
        sequence = calculate_syracuse_sequence(request.start_number)
        stats = {
            "mean": float(np.mean(sequence)),
            "std": float(np.std(sequence)),
            "max": max(sequence),
            "min": min(sequence)
        }
        
        return SequenceResponse(
            sequence=sequence,
            steps=len(sequence) - 1,
            max_value=max(sequence),
            statistics=stats
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/batch/{start}/{end}")
async def get_batch_sequences(start: int, end: int):
    if start < 1 or end < start:
        raise HTTPException(status_code=400, detail="Invalid range")
    
    results = {}
    for n in range(start, end + 1):
        sequence = calculate_syracuse_sequence(n)
        results[n] = {
            "sequence": sequence,
            "steps": len(sequence) - 1,
            "max_value": max(sequence)
        }
    return results

# Handler for AWS Lambda
handler = Mangum(app) 