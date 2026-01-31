"use client";

import { useMemo, useState } from "react";
import { TutorCard } from "@/components/tutor-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tutors, categories } from "@/lib/demo-data";
import { Star } from "lucide-react";

export default function BrowseTutorsPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = useMemo(() => {
    return tutors.filter((t) => {
      const nameMatch = !search || t.user?.name?.toLowerCase().includes(search.toLowerCase());
      const headlineMatch = !search || (t.headline ?? "").toLowerCase().includes(search.toLowerCase());
      const catMatch = !categoryId || (t.categoryIds ?? []).includes(categoryId);
      const ratingMatch = !minRating || (t.averageRating ?? 0) >= Number(minRating);
      const priceMatch = !maxPrice || (t.hourlyRateCents ?? 0) <= Number(maxPrice) * 100;
      return (nameMatch || headlineMatch) && catMatch && ratingMatch && priceMatch;
    });
  }, [search, categoryId, minRating, maxPrice]);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Browse Tutors</h1>
      <p className="mt-2 text-muted-foreground">
        Search and filter tutors by subject, rating, and price.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Name or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Min rating</Label>
            <select
              id="rating"
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="">Any</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Max $/hr</Label>
            <Input
              id="price"
              type="number"
              min={0}
              placeholder="e.g. 60"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </aside>
        <div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} tutor{filtered.length !== 1 ? "s" : ""} found
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">No tutors match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
