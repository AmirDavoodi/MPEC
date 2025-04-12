# MPEC

## Setup Instructions

### Docker and Neo4j Setup

1. **Install Docker** on your system. Follow the official [Docker installation guide](https://docs.docker.com/get-docker/) for your operating system.

2. Use the following command to build and run the Neo4j Docker container:
   ```bash
   docker compose up -d
   ```
   - This will start the Neo4j server at port `7687` and the Neo4j Browser at port `7474`.

3. You can access the Neo4j Browser by opening the following URL in your web browser:
   ```
   http://localhost:7474/browser
   ```

### Python Environment Setup

1. **Install pyenv** on your system. Follow the official [pyenv installation guide](https://github.com/pyenv/pyenv#installation) for your operating system.

2. Create a virtual environment in the `.venv` directory using the following command:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - **On macOS/Linux**:
     ```bash
     source .venv/bin/activate
     ```
   - **On Windows** (Command Prompt):
     ```bash
     .venv\Scripts\activate
     ```
   - **On Windows** (PowerShell):
     ```bash
     .\.venv\Scripts\Activate.ps1
     ```

4. Install the Python dependencies from `requirements.txt` using the following command:
   ```bash
   pip install -r requirements.txt
   ```

## Additional Notes

- Ensure that Docker and pyenv are properly installed and configured before proceeding with the setup.
- For any issues, refer to the official documentation of Docker, Neo4j, and pyenv.

### Cypher Query Language Tutorial
For a quick guide on using Neo4J's Cypher query language, see [CYPHER_TUTORIAL.md](CYPHER_TUTORIAL.md).

---

## Project Structure Overview

```
├── configs/                     # Configuration files (e.g., settings.py)
│
├── data/                       # Proof documents and resources
│   ├── books/                  # Reference books in PDF/DJVU formats
│   ├── proofs/                 # LaTeX proofs, images, organized by language/problem
│
├── notebooks/                  # Jupyter notebooks for experiments
│   ├── english/                # English language proofs
│   │   └── <problem>/          # Problem-specific notebooks
│   │       ├── phase1_triplet_extraction.ipynb
│   │       ├── phase2_triplet_resolution.ipynb
│   │       └── triplet_extraction.ipynb (multi-abstraction, to be added)
│   └── persian/                # Persian language proofs
│
├── src/                        # Source code
│   ├── phase1/                 # Triplet extraction logic and prompts
│   ├── phase2/                 # Triplet resolution logic and prompts
│   └── utils/                  # Utility functions (file, LLM, Neo4j helpers)
│
├── docker-compose.yml          # Docker setup for Neo4j
├── requirements.txt            # Python dependencies
├── CYPHER_TUTORIAL.md          # Cypher query language guide
├── test-neo4js.py              # Test script for Neo4j connectivity
├── test2-neo4js.py             # Additional test script
└── README.md                   # Project documentation (this file)
```

### Summary

- **configs/**: Configuration files for the project.
- **data/**: Contains LaTeX proofs, PDFs, images, organized by language and problem.
- **notebooks/**: Jupyter notebooks for triplet extraction and resolution experiments.
- **src/**: Source code for triplet extraction (phase1), resolution (phase2), and utilities.
- **docker-compose.yml**: Docker configuration for Neo4j database.
- **requirements.txt**: Python dependencies.
- **CYPHER_TUTORIAL.md**: Guide for Cypher query language.
- **test-neo4js.py**, **test2-neo4js.py**: Test scripts for Neo4j connectivity.
