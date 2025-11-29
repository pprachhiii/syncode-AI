from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import json
from .client import FaissClient

faiss_client = FaissClient()

@csrf_exempt
def vector_search(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			query_vector = data.get('vector')
			k = int(data.get('k', 5))
			if not query_vector or not isinstance(query_vector, list):
				return JsonResponse({'error': 'vector (list) required'}, status=400)
			D, I = faiss_client.search(np.array(query_vector, dtype='float32').reshape(1, -1), k)
			return JsonResponse({'distances': D.tolist(), 'indices': I.tolist()})
		except Exception as e:
			return JsonResponse({'error': str(e)}, status=500)
	return JsonResponse({'error': 'POST request required'}, status=405)
