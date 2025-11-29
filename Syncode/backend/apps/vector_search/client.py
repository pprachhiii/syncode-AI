import os
import numpy as np
import faiss

EMBEDDINGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '..', '..', 'ml', 'embeddings')
INDEX_PATH = os.path.abspath(os.path.join(EMBEDDINGS_DIR, 'faiss_index.index'))

class FaissClient:
    def __init__(self, index_path=INDEX_PATH):
        self.index = faiss.read_index(index_path)
        self.dim = self.index.d

    def search(self, query_vector, k=5):
        if not isinstance(query_vector, np.ndarray):
            query_vector = np.array(query_vector, dtype='float32').reshape(1, -1)
        D, I = self.index.search(query_vector, k)
        return D[0], I[0]
