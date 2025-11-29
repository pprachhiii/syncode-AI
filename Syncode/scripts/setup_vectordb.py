import os
import pandas as pd
import numpy as np
import faiss

# Path to the CSV file and output directory
CSV_PATH = os.path.join('..', 'docs', 'icd10cm_tabular_2026-2.csv')
EMBEDDINGS_DIR = os.path.join('..', 'ml', 'embeddings')
INDEX_PATH = os.path.join(EMBEDDINGS_DIR, 'faiss_index.index')

# Ensure embeddings directory exists
os.makedirs(EMBEDDINGS_DIR, exist_ok=True)


# Load CSV with encoding fallback
try:
    df = pd.read_csv(CSV_PATH, encoding='utf-8')
except UnicodeDecodeError:
    df = pd.read_csv(CSV_PATH, encoding='latin1')

# Placeholder: select a text column to embed (adjust as needed)
if 'description' in df.columns:
    texts = df['description'].astype(str).tolist()
else:
    texts = df.iloc[:,0].astype(str).tolist()  # fallback: first column

# Placeholder: generate random embeddings (replace with real model later)
embedding_dim = 384  # typical for sentence transformers
embeddings = np.random.rand(len(texts), embedding_dim).astype('float32')

# Create FAISS index
index = faiss.IndexFlatL2(embedding_dim)
index.add(embeddings)

# Save the index
faiss.write_index(index, INDEX_PATH)
print(f"FAISS index created and saved to {INDEX_PATH}")
