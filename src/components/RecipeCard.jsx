import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";
import RecipeForm from "./RecipeForm";

export default function RecipeCard({ recipe, onDelete, onUpdate, isLocal }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-3">
        <RecipeForm
          existing={recipe}
          onSave={(updated) => {
            onUpdate(updated);
            setIsEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      {recipe.strMealThumb && (
        <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal || "Recipe"}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-md font-semibold text-gray-800 truncate">
            {recipe.strMeal || "Unnamed Recipe"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {recipe.strCategory || "Uncategorized"}
          </p>

          {recipe.strInstructions && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {recipe.strInstructions}
            </p>
          )}

          {isLocal && recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full text-xs font-medium text-white bg-[#239BA7]"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 flex justify-end items-center gap-2">
          {isLocal ? (
            <>
              <Edit2
                size={18}
                className="text-gray-600 hover:text-[#239BA7] cursor-pointer transition"
                onClick={() => setIsEditing(true)}
                title="Edit Recipe"
              />
              <Trash2
                size={18}
                className="text-gray-600 hover:text-red-500 cursor-pointer transition"
                onClick={() => onDelete(recipe.id)}
                title="Delete Recipe"
              />
            </>
          ) : (
            <Link
              to={`/recipe/${recipe.idMeal || recipe.id}`}
              className="text-sm font-medium text-[#239BA7] hover:text-[#1f8b94] hover:underline"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
