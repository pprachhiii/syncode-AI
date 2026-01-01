import numpy as np

def search_faiss(index, meta, model, chunks, top_k: int = 5):
    results = []

    embeddings = model.encode(chunks)
    embeddings = np.array(embeddings).astype("float32")

    for i, emb in enumerate(embeddings):
        D, I = index.search(emb.reshape(1, -1), top_k)

        for dist, idx in zip(D[0], I[0]):
            code, desc, section = meta[idx]

            results.append({
                "chunk": chunks[i],
                "code": code,
                "description": desc,
                "section_id": section[0],
                "section_name": section[1],
                "includes": section[2],
                "excludes1": section[3],
                "excludes2": section[4],
                "distance": float(dist)
            })

    return results
