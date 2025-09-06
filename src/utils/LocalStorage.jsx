const STORAGE_KEY = "localRecipes";

export const getLocalRecipes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLocalRecipes = (recipes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};
