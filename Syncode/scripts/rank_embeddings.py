from collections import defaultdict

def rank_results(results):
    grouped = defaultdict(list)

    for r in results:
        grouped[r["code"]].append(r)

    final = []
    for hits in grouped.values():
        final.append(min(hits, key=lambda x: x["distance"]))

    return sorted(final, key=lambda x: x["distance"])
