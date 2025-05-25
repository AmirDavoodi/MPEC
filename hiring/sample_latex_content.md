# Sample LaTeX Mathematical Content

## Course Content Examples

### 1. Addition Course Content
```latex
\documentclass{article}
\usepackage{amsmath}
\usepackage{amssymb}

\title{Introduction to Addition via Recursion}
\author{}
\date{}

\begin{document}
\maketitle

\section{Recursive Definition}
For non-negative integers \(a\) and \(b\):

\[
    a + b = \begin{cases}
        a                 & \text{if } b = 0 \quad \text{(Base Case)}      \\
        (a + (b - 1)) + 1 & \text{if } b > 0 \quad \text{(Recursive Case)}
    \end{cases}
\]

\section{Explanation}
The recursive definition of addition works by:
\begin{enumerate}
    \item \textbf{Base Case}: When adding zero to any number, the result is the number itself
    \item \textbf{Recursive Case}: When adding a positive number \(b\) to \(a\), we reduce it to adding \((b-1)\) to \(a\), then add 1
\end{enumerate}

\section{Pattern}
This creates a systematic reduction:
\[
    \begin{aligned}
        a + b & = (a + (b-1)) + 1 \\
              & = ((a + (b-2)) + 1) + 1 \\
              & = \cdots \\
              & = (a + 0) + \underbrace{1 + 1 + \cdots + 1}_{b \text{ times}} \\
              & = a + b
    \end{aligned}
\]

\end{document}
```

### 2. Multiplication Course Content
```latex
\documentclass{article}
\usepackage{amsmath}
\usepackage{amssymb}

\title{Introduction to Multiplication via Recursion}
\author{}
\date{}

\begin{document}
\maketitle

\section{Recursive Definition}
For non-negative integers \(a\) and \(b\):

\[
    a \times b = \begin{cases}
        0                     & \text{if } b = 0 \quad \text{(Base Case)}      \\
        a + (a \times (b-1))  & \text{if } b > 0 \quad \text{(Recursive Case)}
    \end{cases}
\]

\section{Explanation}
Multiplication is defined as repeated addition:
\begin{itemize}
    \item Base case: Any number multiplied by 0 equals 0
    \item Recursive case: \(a \times b\) equals \(a\) added to \(a \times (b-1)\)
\end{itemize}

\section{Pattern}
This creates repeated addition:
\[
    \begin{aligned}
        a \times b & = a + (a \times (b-1)) \\
                   & = a + (a + (a \times (b-2))) \\
                   & = a + a + (a \times (b-2)) \\
                   & = \cdots \\
                   & = \underbrace{a + a + \cdots + a}_{b \text{ times}}
    \end{aligned}
\]

\end{document}
```

## Example Problems

### 1. Addition Example: 3 + 2
```latex
\section{Example: \( 3 + 2 \)}

Step-by-step calculation using recursive definition:

\[
    \begin{aligned}
        3 + 2 & = (3 + 1) + 1 \quad       & \text{(First decomposition)}  \\
              & = ((3 + 0) + 1) + 1 \quad & \text{(Second decomposition)} \\
              & = (3 + 1) + 1 \quad       & \text{(Base case applied)}    \\
              & = 4 + 1 \quad             & \text{(First increment)}      \\
              & = 5 \quad                 & \text{(Final result)}
    \end{aligned}
\]

\textbf{Reasoning}:
\begin{enumerate}
    \item Start with \(3 + 2\)
    \item Apply recursive rule: \(3 + 2 = (3 + (2-1)) + 1 = (3 + 1) + 1\)
    \item Apply recursive rule again: \(3 + 1 = (3 + (1-1)) + 1 = (3 + 0) + 1\)
    \item Apply base case: \(3 + 0 = 3\)
    \item Work backwards: \((3 + 0) + 1 = 3 + 1 = 4\)
    \item Final step: \(4 + 1 = 5\)
\end{enumerate}
```

### 2. Addition Example: 5 + 3
```latex
\section{Example: \( 5 + 3 \)}

\[
    \begin{aligned}
        5 + 3 & = (5 + 2) + 1 \\
              & = ((5 + 1) + 1) + 1 \\
              & = (((5 + 0) + 1) + 1) + 1 \\
              & = ((5 + 1) + 1) + 1 \\
              & = (6 + 1) + 1 \\
              & = 7 + 1 \\
              & = 8
    \end{aligned}
\]
```

### 3. Multiplication Example: 4 × 3
```latex
\section{Example: \( 4 \times 3 \)}

\[
    \begin{aligned}
        4 \times 3 & = 4 + (4 \times 2) \\
                   & = 4 + (4 + (4 \times 1)) \\
                   & = 4 + (4 + (4 + (4 \times 0))) \\
                   & = 4 + (4 + (4 + 0)) \\
                   & = 4 + (4 + 4) \\
                   & = 4 + 8 \\
                   & = 12
    \end{aligned}
\]
```

## Test Questions

### Addition Test Questions
1. **Simple Addition**: Calculate \( 4 + 3 \) using the recursive definition of addition.

2. **Medium Addition**: Show all steps for \( 6 + 4 \) using recursive addition.

3. **Base Case**: Demonstrate \( 7 + 0 \) using the recursive definition.

### Multiplication Test Questions
1. **Simple Multiplication**: Calculate \( 3 \times 4 \) using the recursive definition.

2. **Medium Multiplication**: Show all steps for \( 5 \times 3 \) using recursive multiplication.

3. **Base Case**: Demonstrate \( 8 \times 0 \) using the recursive definition.

### Mixed Operations
1. **Combined**: First calculate \( 2 + 3 \), then multiply the result by 2 using recursive definitions.

2. **Complex**: Calculate \( (3 + 2) \times 2 \) showing all recursive steps.

## LaTeX Formatting Notes

### Mathematical Expressions
- Use `\(` and `\)` for inline math
- Use `\[` and `\]` for display math
- Use `\begin{aligned}` for multi-line equations
- Use `\text{}` for text within math mode

### Common Symbols
- `\times` for multiplication
- `\cdots` for horizontal dots
- `\quad` for spacing
- `\underbrace{}` for braces under expressions

### Environments
- `enumerate` for numbered lists
- `itemize` for bullet points
- `cases` for piecewise functions
- `aligned` for equation alignment

## Expected Knowledge Graph Structure

### Entities Types
- **axiom**: Base cases and fundamental rules
- **definition**: Recursive definitions
- **step**: Individual calculation steps
- **operation**: Mathematical operations (+, ×)
- **conclusion**: Final results

### Relation Types
- **grounds**: Provides foundation for
- **enables**: Makes possible
- **requires**: Needs as prerequisite
- **produces**: Creates as result
- **decomposes_to**: Breaks down into
- **applies**: Uses a rule or case
- **evaluates_to**: Calculates to

### Graph Properties
- Should have clear start and end nodes
- Must form a connected component
- Should represent logical flow of mathematical reasoning
- Entities should have meaningful labels and descriptions
