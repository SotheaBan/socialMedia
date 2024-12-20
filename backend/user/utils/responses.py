# utils.py (or utils/responses.py)

from rest_framework.response import Response


def generate_response(status: str, code: int, message: str, data: dict = None):
    return Response(
        {
            "status": status,
            "code": code,
            "message": message,
            "data": data if data is not None else None,
        },
        status=code,
    )