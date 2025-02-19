import { api } from "./server";
import "./firebase"; // Initialize Firebase Admin

// Export the API function
export { api };

// Re-export other modules as needed
export * from "./modules/openrouter/openRouterService";

// Export types (if needed)
export * from "./modules/errors/customErrors";
