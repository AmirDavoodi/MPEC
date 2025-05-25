#!/bin/bash

# Script to generate PDF from LaTeX instructions
# Usage: ./generate_pdf.sh

echo "🔄 Generating PDF from LaTeX instructions..."

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "❌ Error: pdflatex is not installed."
    echo "Please install LaTeX distribution (e.g., TeX Live, MiKTeX)"
    echo "On Ubuntu/Debian: sudo apt-get install texlive-latex-extra"
    echo "On macOS: brew install --cask mactex"
    echo "On Windows: Install MiKTeX from https://miktex.org/"
    exit 1
fi

# Navigate to the hiring directory
cd "$(dirname "$0")"

# Generate PDF
echo "📄 Compiling LaTeX document..."
pdflatex -interaction=nonstopmode programming_test_instructions.tex

# Check if PDF was generated successfully
if [ -f "programming_test_instructions.pdf" ]; then
    echo "✅ PDF generated successfully: programming_test_instructions.pdf"
    
    # Clean up auxiliary files
    echo "🧹 Cleaning up auxiliary files..."
    rm -f *.aux *.log *.out *.toc *.fdb_latexmk *.fls *.synctex.gz
    
    echo "📋 Files ready for candidates:"
    echo "  - programming_test_instructions.pdf (main instructions)"
    echo "  - sample_latex_content.md (sample content)"
    echo "  - mock_api_responses.json (mock data)"
    echo "  - typescript_interfaces.ts (type definitions)"
    
    echo ""
    echo "🎯 Next steps:"
    echo "1. Review the generated PDF"
    echo "2. Send the candidate files listed above"
    echo "3. Use EVALUATION_RUBRIC.md for assessment"
    
else
    echo "❌ Error: Failed to generate PDF"
    echo "Check the LaTeX compilation errors above"
    exit 1
fi

echo ""
echo "✨ PDF generation complete!"
