from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import json
from .client import FaissClient

# Lazy initialization to prevent startup crashes
_faiss_client = None

def get_faiss_client():
	global _faiss_client
	if _faiss_client is None:
		_faiss_client = FaissClient()
	return _faiss_client

@csrf_exempt
def vector_search(request):
	if request.method == 'POST':
		try:
			faiss_client = get_faiss_client()
			data = json.loads(request.body)
			query_text = data.get('query')
			query_vector = data.get('vector')
			k = int(data.get('k', 5))
			
			# Support text-based search (primary method)
			if query_text:
				results = faiss_client.search_by_text(query_text, k)
				return JsonResponse({'results': results, 'count': len(results)})
			
			# Support vector-based search (backward compatibility)
			elif query_vector and isinstance(query_vector, list):
				D, I = faiss_client.search(np.array(query_vector, dtype='float32').reshape(1, -1), k)
				# Return with metadata
				results = []
				for i, d in zip(I, D):
					code, desc = faiss_client.meta[i]
					results.append({
						"icd_code": str(code),
						"description": str(desc),
						"distance": float(d)
					})
				return JsonResponse({'results': results, 'count': len(results)})
			else:
				return JsonResponse({'error': 'query (text) or vector (list) required'}, status=400)
		except Exception as e:
			return JsonResponse({'error': str(e)}, status=500)
	return JsonResponse({'error': 'POST request required'}, status=405)
