"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/components/service/admin.service";

export default function AdminCategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await categoryService.createCategory(categoryName.trim());
      setSuccess(true);
      setCategoryName("");
    } catch {
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Add New Category
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
          <CardDescription>
            Enter the name of the category and click Add.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCategory} className="flex gap-2">
            <input
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="flex-grow border rounded p-2"
              disabled={loading}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {success && (
            <p className="text-green-600 mt-2">Category added successfully!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
