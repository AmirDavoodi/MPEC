import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mathematical Proof Graph Visualizer",
  description: "Visualize mathematical proofs using Neo4j graphs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --foreground-rgb: 0, 0, 0;
            --background-rgb: 255, 255, 255;
          }

          body {
            color: rgb(var(--foreground-rgb));
            background: rgb(var(--background-rgb));
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
              Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }

          .main {
            display: flex;
            min-height: 100vh;
            padding: 2rem;
          }

          .visualization {
            width: 50%;
            padding-right: 1rem;
          }

          .content {
            width: 50%;
            padding-left: 1rem;
          }

          .textarea {
            width: 100%;
            height: 16rem;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
          }

          .button {
            background-color: #3b82f6;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
          }

          .button:hover {
            background-color: #2563eb;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
