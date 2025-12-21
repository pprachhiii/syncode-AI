import os
import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

CSV_PATH = '../docs/icd10cm_tabular_2026-2.csv'
EMBEDDINGS_DIR = '../ml/embeddings'
INDEX_PATH = os.path.join(EMBEDDINGS_DIR, 'faiss_index.index')
META_PATH = os.path.join(EMBEDDINGS_DIR, 'icd_meta.npy')

os.makedirs(EMBEDDINGS_DIR, exist_ok=True)

df = pd.read_csv(CSV_PATH, encoding='latin1')

# Keep only rows with descriptions
df = df[['code', 'code_desc']].dropna()

texts = df['code_desc'].astype(str).tolist()
codes = df['code'].astype(str).tolist()

model = SentenceTransformer('all-MiniLM-L6-v2')

embeddings = model.encode(texts, show_progress_bar=True)
embeddings = np.array(embeddings).astype('float32')

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

faiss.write_index(index, INDEX_PATH)
np.save(META_PATH, np.array(list(zip(codes, texts)), dtype=object))

print("✅ ICD FAISS index built successfully")

