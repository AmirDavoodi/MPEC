from neo4j import GraphDatabase

# Connect to Neo4j
uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("fanavaran", "fanavaran"))


# Example: Create a node
def create_node(tx, name):
    tx.run("CREATE (a:Person {name: $name})", name=name)


with driver.session() as session:
    session.execute_write(create_node, "Alice")

# Close the connection
driver.close()
