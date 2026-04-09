# app/services/code_generator.py
"""
Code generation service for producing frontend and backend code
"""

from typing import Dict, List, Tuple
import json
from datetime import datetime


class CodeGenerator:
    """
    Generates code for frontend and backend based on intent and requirements
    """

    def __init__(self):
        self.generated_files = []
        self.timestamp = datetime.now().isoformat()

    def generate_frontend_code(
        self,
        component_name: str,
        description: str,
        props: List[str] = None
    ) -> Dict[str, str]:
        """
        Generate React component code
        """
        props = props or []
        props_str = ", ".join(props) if props else ""
        
        template = f'''// {component_name}.jsx
import {{ useState }} from "react";
import "./{component_name}.css";

export function {component_name}({{{props_str}}}) {{
  const [state, setState] = useState(null);

  // TODO: Implement {component_name} logic
  // Purpose: {description}

  return (
    <div className="{component_name.lower()}-container">
      <h2>{component_name}</h2>
      <p>Component: {description}</p>
      {{/* Content goes here */}}
    </div>
  );
}}
'''

        css_template = f'''/* {component_name}.css */
.{component_name.lower()}-container {{
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
}}

.{component_name.lower()}-container h2 {{
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}}
'''

        return {
            "jsx": template,
            "css": css_template,
            "filename": f"{component_name}.jsx",
            "css_filename": f"{component_name}.css",
            "type": "component"
        }

    def generate_backend_api(
        self,
        endpoint_name: str,
        method: str = "GET",
        description: str = ""
    ) -> Dict[str, str]:
        """
        Generate FastAPI endpoint code
        """
        route_decorator = f'@router.{method.lower()}("/{endpoint_name}")'
        
        template = f'''# {endpoint_name} endpoint
{route_decorator}
async def {endpoint_name}():
    """
    {description}
    """
    try:
        # TODO: Implement {endpoint_name} logic
        return {{
            "endpoint": "{endpoint_name}",
            "method": "{method}",
            "status": "ok",
            "message": "Endpoint working"
        }}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
'''

        return {
            "code": template,
            "filename": f"{endpoint_name}.py",
            "type": "api_endpoint",
            "method": method,
            "description": description
        }

    def generate_database_schema(
        self,
        model_name: str,
        fields: Dict[str, str]
    ) -> Dict[str, str]:
        """
        Generate database model/schema code
        """
        field_defs = "\n    ".join([
            f'{field_name}: {field_type}  # {field_name} field'
            for field_name, field_type in fields.items()
        ])

        template = f'''# {model_name} Schema
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class {model_name}Base(BaseModel):
    """Base schema for {model_name}"""
    {field_defs}


class {model_name}({model_name}Base):
    """Full schema for {model_name}"""
    id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
'''

        return {
            "code": template,
            "filename": f"{model_name.lower()}.py",
            "type": "schema",
            "model_name": model_name
        }

    def generate_project_structure(
        self,
        project_name: str,
        features: List[str]
    ) -> Dict[str, any]:
        """
        Generate complete project structure
        """
        frontend_components = []
        backend_endpoints = []
        schemas = []

        for feature in features:
            # Generate components for features
            frontend_components.append({
                "name": f"{feature}Component",
                "description": f"Component for {feature}",
                "code": self.generate_frontend_code(f"{feature}Component", f"Handles {feature}")
            })

            backend_endpoints.append({
                "name": feature.lower(),
                "method": "POST",
                "description": f"Endpoint for {feature}",
                "code": self.generate_backend_api(feature.lower(), "POST", f"Handles {feature}")
            })

            schemas.append({
                "name": f"{feature}Schema",
                "code": self.generate_database_schema(f"{feature}Schema", {
                    "name": "str",
                    "description": "str",
                    "status": "str"
                })
            })

        return {
            "project_name": project_name,
            "timestamp": self.timestamp,
            "frontend": {
                "components": frontend_components,
                "total": len(frontend_components)
            },
            "backend": {
                "endpoints": backend_endpoints,
                "schemas": schemas,
                "total": len(backend_endpoints) + len(schemas)
            },
            "structure": {
                "frontend_path": "frontend/src/components",
                "backend_path": "app/generated",
                "schema_path": "app/schemas"
            }
        }

    def save_generated_code(
        self,
        project_name: str,
        files: List[Dict]
    ) -> Dict[str, any]:
        """
        Save generated code files
        """
        saved_files = []

        for file_info in files:
            file_entry = {
                "filename": file_info.get("filename", ""),
                "type": file_info.get("type", ""),
                "path": f"app/generated/{file_info.get('filename', '')}",
                "timestamp": self.timestamp,
                "size": len(file_info.get("code", file_info.get("jsx", "")))
            }
            saved_files.append(file_entry)

        return {
            "project_name": project_name,
            "files_generated": len(saved_files),
            "files": saved_files,
            "timestamp": self.timestamp,
            "status": "success"
        }


# Global code generator instance
code_generator = CodeGenerator()
