from chunking import chunk_text
from faiss_search import search_faiss
from rank_embeddings import rank_results

def find_icd_codes(text, index, meta, model):
    chunks = chunk_text(text)
    raw_results = search_faiss(index, meta, model, chunks)
    return rank_results(raw_results)
