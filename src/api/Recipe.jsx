const BASE_URL = import.meta.env.VITE_API_URL;

export const searchRecipes = async (query) => {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data = await res.json();
  return data.meals;
};

export const getRecipeById = async (id) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals[0];
};
