export const categoryService = {
  getAllCategories: async (): Promise<{ id: number; name: string }[]> => {
    const res = await fetch("http://localhost:5000/api/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    if (!json.success) throw new Error("API returned unsuccessful response");
    return json.data;
  },

  createCategory: async (name: string) => {
    const res = await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },
};
