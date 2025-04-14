from langchain import OpenAI
from langgraph import LangGraph
from neo4j import GraphDatabase

# Initialize LangChain and LangGraph
llm = OpenAI(model="gpt-4-mini")
lang_graph = LangGraph(llm)

# Process text and generate graph
text = "Alice knows Bob. Bob knows Charlie."
graph = lang_graph.process_text(text)

# Connect to Neo4j
uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("fanavaran", "fanavaran"))


# Store the graph in Neo4j
def store_graph(tx, graph):
    for node in graph.nodes:
        tx.run("CREATE (a:Person {name: $name})", name=node)
    for edge in graph.edges:
        tx.run(
            """
            MATCH (a:Person {name: $source}), (b:Person {name: $target})
            CREATE (a)-[:KNOWS]->(b)
        """,
            source=edge.source,
            target=edge.target,
        )


with driver.session() as session:
    session.execute_write(store_graph, graph)

# Close the connection
driver.close()
