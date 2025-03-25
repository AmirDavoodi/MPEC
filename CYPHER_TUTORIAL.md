# Cypher Query Language Tutorial

Cypher is Neo4J's declarative graph query language, designed for querying and manipulating graph data. Below is a quick guide to get started with Cypher, including how to track changes over the iterations of your algorithm.

## Basic Commands

### 1. Creating Nodes with a `step` Attribute
```cypher
CREATE (n:Person {name: 'Alice', age: 30, step: 1});
```
- Creates a node labeled `Person` with properties `name`, `age`, and `step`.

### 2. Creating Relationships with a `step` Attribute
```cypher
MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
CREATE (a)-[:FRIENDS_WITH {step: 1}]->(b);
```
- Creates a `FRIENDS_WITH` relationship between two nodes with a `step` attribute.

### 3. Updating Nodes for a Specific Step
```cypher
MATCH (n:Person {name: 'Alice'})
SET n.step = 2, n.age = 31;
```
- Updates the `step` and `age` properties of the node with the name `Alice`.

### 4. Updating Relationships for a Specific Step
```cypher
MATCH (a:Person {name: 'Alice'})-[r:FRIENDS_WITH]->(b:Person {name: 'Bob'})
SET r.step = 2;
```
- Updates the `step` property of the `FRIENDS_WITH` relationship between `Alice` and `Bob`.

### 5. Querying Nodes at a Specific Step
```cypher
MATCH (n:Person)
WHERE n.step = 1
RETURN n;
```
- Retrieves all nodes labeled `Person` at step `1`.

### 6. Querying Relationships at a Specific Step
```cypher
MATCH (a:Person)-[r:FRIENDS_WITH]->(b:Person)
WHERE r.step = 1
RETURN a, r, b;
```
- Retrieves all `FRIENDS_WITH` relationships at step `1`.

### 7. Querying Nodes and Relationships Across Multiple Steps
```cypher
MATCH (a:Person)-[r:FRIENDS_WITH]->(b:Person)
WHERE r.step IN [1, 2]
RETURN a, r, b;
```
- Retrieves all `FRIENDS_WITH` relationships at steps `1` and `2`.

### 8. Deleting Nodes at a Specific Step
```cypher
MATCH (n:Person)
WHERE n.step = 1
DELETE n;
```
- Deletes all nodes labeled `Person` at step `1`.

### 9. Deleting Relationships at a Specific Step
```cypher
MATCH (a:Person)-[r:FRIENDS_WITH]->(b:Person)
WHERE r.step = 1
DELETE r;
```
- Deletes all `FRIENDS_WITH` relationships at step `1`.

### 10. Deleting the Whole Database
```cypher
MATCH (n) DETACH DELETE n;
```
- Deletes all nodes and relationships in the database. **Use with caution!**

## Example: Tracking Graph Changes Over Algorithm Iterations

### Scenario
You are using AI agents to build a knowledge graph from unstructured data. Each iteration of your algorithm adds or updates nodes and relationships, and you want to track these changes over time.

### Steps
1. **Initialization (Step 0)**:
   - Create initial nodes and relationships with `step: 0`.
   ```cypher
   CREATE (n:Person {name: 'Alice', age: 30, step: 0});
   CREATE (n:Person {name: 'Bob', age: 25, step: 0});
   MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
   CREATE (a)-[:FRIENDS_WITH {step: 0}]->(b);
   ```

2. **Iteration (Step 1)**:
   - Add new nodes and relationships with `step: 1`.
   ```cypher
   CREATE (n:Person {name: 'Charlie', age: 28, step: 1});
   MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Charlie'})
   CREATE (a)-[:FRIENDS_WITH {step: 1}]->(b);
   ```

3. **Querying the Graph at Step 1**:
   - Retrieve all nodes and relationships at step `1`.
   ```cypher
   MATCH (n:Person)
   WHERE n.step = 1
   RETURN n;

   MATCH (a:Person)-[r:FRIENDS_WITH]->(b:Person)
   WHERE r.step = 1
   RETURN a, r, b;
   ```

4. **Iteration (Step 2)**:
   - Update existing nodes and relationships with `step: 2`.
   ```cypher
   MATCH (n:Person {name: 'Alice'})
   SET n.step = 2, n.age = 31;

   MATCH (a:Person {name: 'Alice'})-[r:FRIENDS_WITH]->(b:Person {name: 'Bob'})
   SET r.step = 2;
   ```

5. **Querying the Graph at Step 2**:
   - Retrieve all nodes and relationships at step `2`.
   ```cypher
   MATCH (n:Person)
   WHERE n.step = 2
   RETURN n;

   MATCH (a:Person)-[r:FRIENDS_WITH]->(b:Person)
   WHERE r.step = 2
   RETURN a, r, b;
   ```

## Resources
- [Neo4J Cypher Documentation](https://neo4j.com/docs/cypher-manual/current/)
- [Cypher Cheat Sheet](https://neo4j.com/docs/cypher-refcard/current/)