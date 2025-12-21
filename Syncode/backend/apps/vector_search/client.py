import os
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# Get path to backend/apps/vector_search -> backend -> Syncode -> ml/embeddings
EMBEDDINGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '..', 'ml', 'embeddings')
INDEX_PATH = os.path.abspath(os.path.join(EMBEDDINGS_DIR, 'faiss_index.index'))
META_PATH = os.path.abspath(os.path.join(EMBEDDINGS_DIR, 'icd_meta.npy'))

class FaissClient:
    def __init__(self, index_path=INDEX_PATH, meta_path=META_PATH):
        self.index = faiss.read_index(index_path)
        self.meta = np.load(meta_path, allow_pickle=True)
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.dim = self.index.d

    def search(self, query_vector, k=5):
        if not isinstance(query_vector, np.ndarray):
            query_vector = np.array(query_vector, dtype='float32').reshape(1, -1)
        D, I = self.index.search(query_vector, k)
        return D[0], I[0]
    
    def search_by_text(self, query_text, k=5):
        """Search for ICD codes by disease description text"""
        query_vec = self.model.encode([query_text]).astype('float32')
        distances, indices = self.index.search(query_vec, k)
        
        results = []
        for i, d in zip(indices[0], distances[0]):
            code, desc = self.meta[i]
            results.append({
                "icd_code": str(code),
                "description": str(desc),
                "distance": float(d)
            })
        return results
