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