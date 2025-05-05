// Use the server's IP address instead of localhost for cross-machine access
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://10.10.14.24:3001" // Use your server's IP in production
    : typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001" // Use localhost when running locally
    : "http://10.10.14.24:3001"; // Use IP when accessing from another machine
