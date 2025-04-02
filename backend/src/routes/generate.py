# backend/src/routes/generate.py
from fastapi import APIRouter, Body
from pydantic import BaseModel
from services.ai_service import generate_uml_diagram

router = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str
    type: str

class GenerateResponse(BaseModel):
    diagram: str

@router.post("", response_model=GenerateResponse)
async def generate_diagram(data: GenerateRequest = Body(...)):
    """Generate a UML diagram from a description using AI"""
    try:
        diagram_code = generate_uml_diagram(data.prompt, data.type)
        return {"diagram": diagram_code}
    except Exception as e:
        return {"error": str(e)}, 500