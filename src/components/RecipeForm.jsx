import { useState } from "react";

export default function RecipeForm({ onSave, existing }) {
  const [recipe, setRecipe] = useState(
    existing || {
      id: Date.now(),
      strMeal: "",
      strCategory: "",
      strInstructions: "",
      ingredients: [],
    }
  );

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let ingredientsArray = [];
    if (typeof recipe.ingredients === "string") {
      ingredientsArray = recipe.ingredients
        .split(",")
        .map((ing) => ing.trim())
        .filter(Boolean);
    } else if (Array.isArray(recipe.ingredients)) {
      ingredientsArray = recipe.ingredients;
    }

    onSave({
      ...recipe,
      ingredients: ingredientsArray,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {existing ? "Edit Recipe" : "Add New Recipe"}
      </h2>

      <input
        name="strMeal"
        value={recipe.strMeal}
        onChange={handleChange}
        placeholder="Recipe Name"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#239BA7]"
        required
      />

      <input
        name="strCategory"
        value={recipe.strCategory}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#239BA7]"
      />

      <textarea
        name="strInstructions"
        value={recipe.strInstructions}
        onChange={handleChange}
        placeholder="Instructions"
        rows={4}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#239BA7] resize-none"
      />

      <input
        name="ingredients"
        value={
          Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join(", ")
            : recipe.ingredients
        }
        onChange={handleChange}
        placeholder="Ingredients"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#239BA7]"
      />

      <button
        type="submit"
        className="bg-[#239BA7] hover:bg-[#1f8b94] text-white font-medium px-4 py-2 rounded-lg w-full transition"
      >
        Save Recipe
      </button>
    </form>
  );
}
