import secrets
from .models import APIKey
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# для выдачи API Key
@csrf_exempt
def generate_api_key(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        api_key = APIKey(user=user, key=secrets.token_hex(32))
        api_key.save()
        return JsonResponse({'api_key': api_key.key})
    return JsonResponse({'error': 'Invalid request method'})
