import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

INDEX_PATH = '../ml/embeddings/faiss_index.index'
META_PATH = '../ml/embeddings/icd_meta.npy'

model = SentenceTransformer('all-MiniLM-L6-v2')
index = faiss.read_index(INDEX_PATH)
meta = np.load(META_PATH, allow_pickle=True)

def get_icd_code(disease_query, top_k=5):
    query_vec = model.encode([disease_query]).astype('float32')
    distances, indices = index.search(query_vec, top_k)

    results = []
    for i, d in zip(indices[0], distances[0]):
        code, desc = meta[i]
        results.append({
            "icd_code": code,
            "description": desc,
            "distance": float(d)
        })
    return results
##get_icd_code("cholera")
#Expected Output
##{"icd_code": "A00",
  ##"description": "Cholera"
##}
