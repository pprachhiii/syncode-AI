import pdfplumber

def pdf_to_text(pdf_path: str) -> str:
    
    all_text = []

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()
            if text:
                all_text.append(text)

    return "\n".join(all_text)
