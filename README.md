# MPEC - Math Proof Explanatory Chain

An AI-Assistant Math Proof Explanatory Chain builder.

## Project Structure

```
MPEC/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app directory
│   │   ├── components/       # React components
│   │   │   ├── GraphVisualization.tsx  # Graph visualization component
│   │   │   └── ...
│   │   ├── pages/           # Next.js pages
│   │   │   ├── api/         # API routes
│   │   │   └── ...
│   │   └── ...
│   ├── public/              # Static assets
│   ├── styles/              # Global styles
│   ├── package.json         # Frontend dependencies
│   └── ...
│
├── backend/                 # FastAPI backend application
│   ├── app/                 # Main application code
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Database models
│   │   └── ...
│   ├── tests/              # Test files
│   ├── requirements.txt    # Python dependencies
│   └── ...
│
├── configs/                 # Configuration files (e.g., settings.py)
│
├── data/                   # Proof documents and resources
│   ├── books/              # Reference books in PDF/DJVU formats
│   ├── proofs/             # LaTeX proofs, images, organized by language/problem
│
├── notebooks/              # Jupyter notebooks for experiments
│   ├── english/            # English language proofs
│   │   └── <problem>/      # Problem-specific notebooks
│   │       ├── phase1_triplet_extraction.ipynb
│   │       ├── phase2_triplet_resolution.ipynb
│   │       └── triplet_extraction.ipynb (multi-abstraction, to be added)
│   └── persian/            # Persian language proofs
│
├── src/                    # Source code
│   ├── phase1/             # Triplet extraction logic and prompts
│   ├── phase2/             # Triplet resolution logic and prompts
│   └── utils/              # Utility functions (file, LLM, Neo4j helpers)
│
├── docker-compose.yml      # Docker setup for Neo4j
├── requirements.txt        # Python dependencies
├── CYPHER_TUTORIAL.md      # Cypher query language guide
├── test-neo4js.py          # Test script for Neo4j connectivity
├── test2-neo4js.py         # Additional test script
└── README.md               # Project documentation
```

### Summary

- **frontend/**: Next.js application for the user interface and graph visualization
- **backend/**: FastAPI application for handling business logic and data processing
- **configs/**: Configuration files for the project
- **data/**: Contains LaTeX proofs, PDFs, images, organized by language and problem
- **notebooks/**: Jupyter notebooks for triplet extraction and resolution experiments
- **src/**: Source code for triplet extraction (phase1), resolution (phase2), and utilities
- **docker-compose.yml**: Docker configuration for Neo4j database
- **requirements.txt**: Python dependencies
- **CYPHER_TUTORIAL.md**: Guide for Cypher query language
- **test-neo4js.py**, **test2-neo4js.py**: Test scripts for Neo4j connectivity

## Features

- **Graph Visualization**: Interactive visualization of mathematical proof relationships
- **Proof Chain Analysis**: Automated analysis of mathematical proof structures
- **Multi-language Support**: Support for mathematical proofs in different languages
- **AI-Assisted Proof Building**: AI-powered assistance in constructing proof chains
- **Knowledge Graph**: Structured representation of mathematical concepts and their relationships

## Technologies Used

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- ForceGraph2D for graph visualization
- Axios for API communication

### Backend
- FastAPI
- Python 3.11
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- PostgreSQL 14+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AmirDavoodi/MPEC.git
cd MPEC
```

2. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

3. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Docker and Neo4j Setup

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

## Python Environment Setup

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

## Cypher Query Language

Cypher is Neo4j's graph query language that allows you to store and retrieve data from the graph database. It is designed to be both human-readable and expressive, making it easy to write and understand queries.

Key features of Cypher:
- Pattern matching for graph traversal
- Declarative query syntax
- Built-in functions for graph operations
- Support for complex graph algorithms

For a detailed guide on using Neo4j's Cypher query language, see [CYPHER_TUTORIAL.md](CYPHER_TUTORIAL.md).

## Development

### Frontend Development
- The frontend is built with Next.js and uses TypeScript for type safety
- Components are organized in the `app/components` directory
- API routes are defined in `app/pages/api`
- Global styles are managed with Tailwind CSS

### Backend Development
- The backend uses FastAPI for high-performance API development
- Database models are defined in `app/models`
- API endpoints are organized in `app/api`
- Core business logic is in `app/core`

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Amirehsan Davoodi - amirehsan.davoodi@gmail.com

Project Link: [https://github.com/AmirDavoodi/MPEC](https://github.com/AmirDavoodi/MPEC)
