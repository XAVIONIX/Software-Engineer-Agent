# app/api/v1/generate.py
"""
Code generation API endpoints
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid

from app.services.code_generator import code_generator

router = APIRouter()


class GenerateComponentRequest(BaseModel):
    component_name: str
    description: str
    props: Optional[List[str]] = None


class GenerateProjectRequest(BaseModel):
    project_name: str
    features: List[str]


class GenerateResponse(BaseModel):
    status: str
    files_generated: int
    message: str


@router.post("/component", response_model=GenerateResponse)
def generate_component(request: GenerateComponentRequest):
    """
    Generate a React component
    """
    try:
        generated = code_generator.generate_frontend_code(
            component_name=request.component_name,
            description=request.description,
            props=request.props
        )

        saved = code_generator.save_generated_code(
            project_name=request.component_name,
            files=[
                {"filename": generated["filename"], "jsx": generated["jsx"], "type": "component"},
                {"filename": generated["css_filename"], "code": generated["css"], "type": "stylesheet"}
            ]
        )

        return {
            "status": "success",
            "files_generated": saved["files_generated"],
            "message": f"Generated {request.component_name} component with CSS"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class GenerateEndpointRequest(BaseModel):
    endpoint_name: str
    method: str = "GET"
    description: str = ""


@router.post("/endpoint", response_model=GenerateResponse)
def generate_endpoint(request: GenerateEndpointRequest):
    """
    Generate a FastAPI endpoint
    """
    try:
        generated = code_generator.generate_backend_api(
            endpoint_name=request.endpoint_name,
            method=request.method,
            description=request.description
        )

        saved = code_generator.save_generated_code(
            project_name=request.endpoint_name,
            files=[generated]
        )

        return {
            "status": "success",
            "files_generated": saved["files_generated"],
            "message": f"Generated {request.method} {request.endpoint_name} endpoint"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/project", response_model=GenerateResponse)
def generate_full_project(request: GenerateProjectRequest):
    """
    Generate complete project structure with components, endpoints, and schemas
    """
    try:
        structure = code_generator.generate_project_structure(
            project_name=request.project_name,
            features=request.features
        )

        # Flatten all files for saving
        all_files = []

        # Add frontend components
        for component in structure["frontend"]["components"]:
            all_files.append({
                "filename": component["code"]["filename"],
                "jsx": component["code"]["jsx"],
                "type": "component"
            })
            all_files.append({
                "filename": component["code"]["css_filename"],
                "code": component["code"]["css"],
                "type": "stylesheet"
            })

        # Add backend endpoints
        for endpoint in structure["backend"]["endpoints"]:
            all_files.append({
                "filename": endpoint["code"]["filename"],
                "code": endpoint["code"]["code"],
                "type": "endpoint"
            })

        # Add schemas
        for schema in structure["backend"]["schemas"]:
            all_files.append({
                "filename": schema["code"]["filename"],
                "code": schema["code"]["code"],
                "type": "schema"
            })

        saved = code_generator.save_generated_code(
            project_name=request.project_name,
            files=all_files
        )

        return {
            "status": "success",
            "files_generated": saved["files_generated"],
            "message": f"Generated complete project '{request.project_name}' with {len(request.features)} features"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{project_name}")
def get_generation_status(project_name: str):
    """
    Get status of a generated project
    """
    return {
        "project_name": project_name,
        "status": "generated",
        "message": "Project generation complete"
    }
