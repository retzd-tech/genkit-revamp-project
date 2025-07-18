import { googleAI } from "@genkit-ai/googleai";
import { genkit, z } from "genkit";

// Initialize Genkit with the Google AI plugin
const ai = genkit({
  plugins: [
    googleAI(),
  ],
  model: googleAI.model("gemini-2.5-flash", {
    temperature: 0.8,
  }),
});

// Define input schema
const RecipeInputSchema = z.object({
  ingredient: z.string().describe("Main ingredient or cuisine type"),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe("Any dietary restrictions"),
});

// Define output schema
const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  tips: z.array(z.string()).optional(),
});

// Define a recipe generator flow
export const recipeGeneratorFlow = ai.defineFlow(
  {
    name: "recipeGeneratorFlow",
    inputSchema: RecipeInputSchema,
    outputSchema: RecipeSchema,
  },
  async (input) => {
    // Create a prompt based on the input
    const prompt = `Create a recipe with the following requirements:
      Main ingredient: ${input.ingredient}
      Dietary restrictions: ${input.dietaryRestrictions || "none"}`;

    // Generate structured recipe data using the same schema
    const { output } = await ai.generate({
      prompt,
      output: { schema: RecipeSchema },
    });

    if (!output) throw new Error("Failed to generate recipe");

    return output;
  }
);

import { postgresFlow } from "./postgresFlow";

// Run the flow
async function main() {
  // Run the recipe generator flow
  const recipe = await recipeGeneratorFlow({
    ingredient: "avocado",
    dietaryRestrictions: "vegetarian",
  });
  console.log("Recipe:", recipe);

  // Run the PostgreSQL flow
  // Replace with your actual database connection details
  const dbResult = await postgresFlow({
    user: "your_user",
    host: "your_host",
    database: "your_database",
    password: "your_password",
    port: 5432,
  });
  console.log("Database Result:", dbResult);
}

main().catch(console.error);
