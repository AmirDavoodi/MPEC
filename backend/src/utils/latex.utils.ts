/**
 * Utility functions for processing LaTeX content
 */

/**
 * Extract content between \begin{document} and \end{document}
 * @param latexContent The LaTeX content
 * @returns The extracted content
 */
export function extractDocumentContent(latexContent: string): string {
  const beginDocIndex = latexContent.indexOf('\\begin{document}');
  const endDocIndex = latexContent.indexOf('\\end{document}');
  
  if (beginDocIndex === -1 || endDocIndex === -1) {
    return latexContent; // Return original if not found
  }
  
  const startPos = beginDocIndex + '\\begin{document}'.length;
  return latexContent.substring(startPos, endDocIndex).trim();
}

/**
 * Convert LaTeX sections to markdown format
 * @param content The LaTeX content
 * @returns The content with sections converted to markdown
 */
export function convertSectionsToMarkdown(content: string): string {
  // Replace \section{...} with ## ...
  let result = content.replace(/\\section\{([^}]+)\}/g, '## $1');
  
  // Replace \subsection{...} with ### ...
  result = result.replace(/\\subsection\{([^}]+)\}/g, '### $1');
  
  // Replace \title{...} with # ...
  result = result.replace(/\\title\{([^}]+)\}/g, '# $1');
  
  // Remove \maketitle
  result = result.replace(/\\maketitle/g, '');
  
  // Replace itemize environments
  result = result.replace(/\\begin\{itemize\}/g, '');
  result = result.replace(/\\end\{itemize\}/g, '');
  
  // Replace \item with -
  result = result.replace(/\\item\s+/g, '- ');
  
  return result;
}

/**
 * Process LaTeX content for use with LLM
 * @param latexContent The raw LaTeX content
 * @returns Processed content ready for LLM
 */
export function processLatexForLLM(latexContent: string): string {
  const extractedContent = extractDocumentContent(latexContent);
  const processedContent = convertSectionsToMarkdown(extractedContent);
  return processedContent;
}
