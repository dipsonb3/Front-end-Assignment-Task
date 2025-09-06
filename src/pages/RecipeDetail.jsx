import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipeById } from "../api/Recipe";
import { ArrowLeft } from "lucide-react";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id).then(setRecipe);
  }, [id]);

  if (!recipe)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center p-6 min-h-screen bg-gray-50 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-gray-900 font-medium z-50 bg-white rounded-full px-3 py-2 shadow"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Recipes
      </button>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-3xl">
        {recipe.strMealThumb && (
          <div className="w-full h-80 md:h-96 overflow-hidden">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            {recipe.strMeal}
          </h1>
          <p className="text-center text-gray-600 font-medium text-lg">
            Category:{" "}
            <span className="text-gray-800">{recipe.strCategory || "N/A"}</span>
          </p>

          <div className="border-t pt-4 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Instructions
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {recipe.strInstructions || "No instructions provided."}
            </p>
          </div>

          <div className="border-t pt-4 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Ingredients
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(recipe)
                .filter((key) => key.startsWith("strIngredient") && recipe[key])
                .map((key, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white bg-[#239BA7]"
                  >
                    {recipe[key]}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
