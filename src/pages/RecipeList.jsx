import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import RecipeForm from "../components/RecipeForm";
import { getLocalRecipes, saveLocalRecipes } from "../utils/LocalStorage";
import { searchRecipes } from "../api/Recipe";
import { Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function RecipeList() {
  const [apiRecipes, setApiRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState(getLocalRecipes());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    searchRecipes("chicken").then(setApiRecipes);
  }, []);

  const handleSearch = async (query) => {
    const results = await searchRecipes(query);
    setApiRecipes(results || []);
  };

  const addRecipe = (recipe) => {
    const updated = [...localRecipes, recipe];
    setLocalRecipes(updated);
    saveLocalRecipes(updated);
    toast.success("Recipe added successfully!");
    setIsModalOpen(false);
  };

  const updateRecipe = (updated) => {
    const updatedList = localRecipes.map((r) =>
      r.id === updated.id ? updated : r
    );
    setLocalRecipes(updatedList);
    saveLocalRecipes(updatedList);
    toast.success("Recipe updated successfully!");
  };

  const deleteRecipe = (id) => {
    const updated = localRecipes.filter((r) => r.id !== id);
    setLocalRecipes(updated);
    saveLocalRecipes(updated);
    toast.success("Recipe deleted successfully!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#239BA7",
            color: "white",
          },
          iconTheme: {
            primary: "white",
            secondary: "#239BA7",
          },
        }}
      />

      <h1 className="text-3xl font-bold mb-4 text-center">Recipe List</h1>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 rounded text-white font-medium transition bg-[#239BA7] hover:bg-[#1f8b94]"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Recipe
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {apiRecipes?.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">My Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {localRecipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            isLocal={true}
            onDelete={deleteRecipe}
            onUpdate={updateRecipe}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <RecipeForm onSave={addRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}
