"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoUser } from "@/lib/demo-context";
import { categories as initialCategories } from "@/lib/demo-data";
import { toast } from "sonner";

const STORAGE_KEY = "skillbridge-demo-admin-categories";

export default function AdminCategoriesPage() {
  const { demoUser } = useDemoUser();
  const [newName, setNewName] = useState("");
  const [localCategories, setLocalCategories] = useState(initialCategories);

  useEffect(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      try {
        setLocalCategories(JSON.parse(s));
      } catch {}
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const next = [...localCategories, { id: `cat-${Date.now()}`, name: newName.trim(), slug: newName.trim().toLowerCase().replace(/\s+/g, "-") }];
    setLocalCategories(next);
    setNewName("");
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    toast.success("Category added (demo).");
  };

  const handleRemove = (id: string) => {
    const next = localCategories.filter((c) => c.id !== id);
    setLocalCategories(next);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    toast.success("Category removed (demo).");
  };

  if (!demoUser || demoUser.role !== "ADMIN") {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Admin only.</p>
        <Button asChild variant="link">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Categories</h1>
      <p className="mt-2 text-muted-foreground">Manage subject categories for tutoring.</p>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle>Add category</CardTitle>
          <CardDescription>New category name (demo: saved in browser).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex gap-2">
            <Label htmlFor="new-cat" className="sr-only">Name</Label>
            <Input id="new-cat" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Biology" className="flex-1" />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle>All categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {localCategories.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-md border p-3">
                <span className="font-medium">{c.name}</span>
                <Button variant="destructive" size="sm" onClick={() => handleRemove(c.id)}>Remove</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
