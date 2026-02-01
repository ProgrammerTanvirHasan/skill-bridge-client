"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tutorProfileService } from "@/components/service/tutor.service";

const categoriesList = [
  { id: "1", name: "Math" },
  { id: "2", name: "Science" },
  { id: "3", name: "English" },
  { id: "4", name: "Ict" },
];

export default function TutorProfilePage() {
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [status, setStatus] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCategoryChange = (id: string) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await tutorProfileService.createTutorProfile({
      bio,
      hourlyRate: Number(hourlyRate),
      status,
      categoryIds,
    });

    if (res.error) {
      setError(res.error.message);
    } else {
      alert("Tutor profile created successfully!");
    }

    setLoading(false);
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
          />

          <input
            type="number"
            placeholder="Hourly Rate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="space-y-2">
            {categoriesList.map(({ id, name }) => (
              <label key={id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={categoryIds.includes(id)}
                  onChange={() => handleCategoryChange(id)}
                />
                {name}
              </label>
            ))}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Submit"}
          </Button>
        </form>

        <Link
          href="/tutor/dashboard"
          className="block mt-4 text-sm text-center"
        >
          Back to dashboard
        </Link>
      </CardContent>
    </Card>
  );
}
