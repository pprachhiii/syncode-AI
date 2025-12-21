import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Use dynamic paths like in setup_vectordb.py
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(SCRIPT_DIR, '..', 'ml', 'embeddings', 'faiss_index.index')
META_PATH = os.path.join(SCRIPT_DIR, '..', 'ml', 'embeddings', 'icd_meta.npy')

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

# Test the function
if __name__ == "__main__":
    print("Testing ICD code retrieval...")
    print(f"Total entries in index: {index.ntotal}")
    print(f"Total metadata entries: {len(meta)}")
    print("\n🔍 Searching for 'cholera':")
    results = get_icd_code("cholera")
    for result in results:
        print(f"  {result['icd_code']}: {result['description']} (distance: {result['distance']:.4f})")