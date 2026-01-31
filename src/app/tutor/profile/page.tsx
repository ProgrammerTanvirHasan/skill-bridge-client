"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoUser } from "@/lib/demo-context";
import { categories } from "@/lib/demo-data";
import { toast } from "sonner";

const STORAGE_KEY = "skillbridge-demo-tutor-profile";

export default function TutorProfileEditPage() {
  const { demoUser } = useDemoUser();
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHeadline(data.headline ?? "");
        setBio(data.bio ?? "");
        setHourlyRate(data.hourlyRate ?? "");
        setCategoryIds(Array.isArray(data.categoryIds) ? data.categoryIds : []);
      } catch {}
    }
  }, []);

  const toggleCategory = (id: string) => {
    setCategoryIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { headline, bio, hourlyRate, categoryIds };
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    toast.success("Profile saved (demo).");
  };

  if (!demoUser) {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Please log in.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  if (demoUser.role !== "TUTOR") {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">This page is for tutors.</p>
        <Button asChild variant="link">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Tutor Profile</h1>
      <p className="mt-2 text-muted-foreground">Edit your tutor profile and subjects.</p>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Headline, bio, rate, and subjects (demo: saved in browser).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Expert in Mathematics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell students about your experience..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Hourly rate ($)</Label>
              <Input id="rate" type="number" min={0} value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="50" />
            </div>
            <div className="space-y-2">
              <Label>Subjects</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                    <input type="checkbox" checked={categoryIds.includes(c.id)} onChange={() => toggleCategory(c.id)} className="h-4 w-4" />
                    {c.name}
                  </label>
                ))}
              </div>
            </div>
            <Button type="submit">Save profile</Button>
          </form>
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
