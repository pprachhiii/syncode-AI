from apps.vector_search.client import FaissClient

class VectorLookupService:
    """Service for looking up ICD codes by disease description"""
    
    def __init__(self):
        self.client = FaissClient()
    
    def get_icd_codes(self, disease_query, top_k=5):
        """
        Get ICD codes for a disease description
        
        Args:
            disease_query (str): The disease description or symptom
            top_k (int): Number of results to return
            
        Returns:
            list: List of dicts with icd_code, description, and distance
        """
        return self.client.search_by_text(disease_query, top_k)
    
    def get_best_match(self, disease_query):
        """
        Get the single best matching ICD code
        
        Args:
            disease_query (str): The disease description or symptom
            
        Returns:
            dict: Single result with icd_code, description, and distance
        """
        results = self.client.search_by_text(disease_query, k=1)
        return results[0] if results else None