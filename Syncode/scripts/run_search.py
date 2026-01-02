from faiss_loader import load_resources
from icd_service import find_icd_codes
from pdf_loader import pdf_to_text

index, meta, model = load_resources()

#if input is text
text = """
coughing blood
"""

# OR PDF
# text = pdf_to_text("../../uploads/report.pdf")

results = find_icd_codes(text, index, meta, model)

for r in results[:5]:
    print(r["code"], r["description"])

