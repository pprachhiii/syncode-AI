import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

def load_resources():
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    SYNCODE_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))

    EMBEDDINGS_DIR = os.path.join(SYNCODE_DIR, 'ml', 'embeddings')
    INDEX_PATH = os.path.join(EMBEDDINGS_DIR, 'faiss_index.index')
    META_PATH = os.path.join(EMBEDDINGS_DIR, 'icd_meta.npy')

    if not os.path.exists(INDEX_PATH):
        raise FileNotFoundError(f"FAISS index not found: {INDEX_PATH}")

    if not os.path.exists(META_PATH):
        raise FileNotFoundError(f"Metadata not found: {META_PATH}")

    index = faiss.read_index(INDEX_PATH)
    meta = np.load(META_PATH, allow_pickle=True)

    model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")

    return index, meta, model
