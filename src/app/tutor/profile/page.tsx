"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tutorProfileService } from "@/components/service/tutor.service";
import { categoryService } from "@/components/service/admin.service";

interface Category {
  id: number;
  name: string;
}

export default function TutorProfilePage() {
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [status, setStatus] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await categoryService.getAllCategories();
        console.log(response, "response");
        setCategoriesList(response);
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (id: number) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await tutorProfileService.createTutorProfile({
        bio,
        hourlyRate: Number(hourlyRate),
        status: status as "AVAILABLE" | "BUSY" | "OFFLINE",
        categoryIds,
      });
      if (response.error) {
        setError(response.error.message || "Failed to create profile");
      } else {
        setSuccess(true);
        // Optionally reset form here:
        setBio("");
        setHourlyRate("");
        setStatus("");
        setCategoryIds([]);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create Tutor Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border p-2 rounded"
            required
            rows={4}
          />

          <input
            type="number"
            placeholder="Hourly Rate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full border p-2 rounded"
            min={0}
            step={0.01}
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="BUSY">Busy</option>
            <option value="OFFLINE">Offline</option>
          </select>

          <div>
            <label className="block font-medium mb-1">Categories</label>
            <div className="flex flex-wrap gap-4">
              {categoriesList.length > 0 ? (
                categoriesList.map(({ id, name }) => (
                  <label
                    key={id}
                    className="inline-flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={categoryIds.includes(id)}
                      onChange={() => handleCategoryChange(id)}
                      className="rounded"
                    />
                    <span>{name}</span>
                  </label>
                ))
              ) : (
                <p>No categories available.</p>
              )}
            </div>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && (
            <p className="text-green-600">Profile created successfully!</p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>

        <Link
          href="/tutor/dashboard"
          className="block mt-4 text-sm text-blue-600 hover:underline"
        >
          Back to dashboard
        </Link>
      </CardContent>
    </Card>
  );
}
