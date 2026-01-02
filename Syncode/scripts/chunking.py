
import re
from typing import List

def chunk_text(
    text: str,
    max_chars: int = 500,
    overlap: int = 100
) -> List[str]:

    text = re.sub(r'\s+', ' ', text).strip()

    sentences = re.split(r'(?<=[.!?])\s+', text)

    chunks = []
    current_chunk = ""

    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= max_chars:
            current_chunk += " " + sentence
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence

    if current_chunk.strip():
        chunks.append(current_chunk.strip())

    # Apply overlap
    if overlap > 0 and len(chunks) > 1:
        overlapped_chunks = []
        for i, chunk in enumerate(chunks):
            if i == 0:
                overlapped_chunks.append(chunk)
            else:
                overlap_text = chunks[i - 1][-overlap:]
                overlapped_chunks.append(overlap_text + " " + chunk)
        return overlapped_chunks

    return chunks
