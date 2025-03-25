# Semantic clustering of entities/relations
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import AgglomerativeClustering


def cluster_entities(entities):
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform([entity.label for entity in entities])
    clustering = AgglomerativeClustering(n_clusters=None, distance_threshold=0.5)
    labels = clustering.fit_predict(X.toarray())
    return labels
