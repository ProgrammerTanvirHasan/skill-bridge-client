"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoUser } from "@/lib/demo-context";
import { toast } from "sonner";

const PROFILE_KEY = "skillbridge-demo-student-profile";

export default function StudentProfilePage() {
  const { demoUser } = useDemoUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (demoUser) {
      setName(demoUser.name);
      setEmail(demoUser.email);
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(PROFILE_KEY);
        if (saved) {
          try {
            const { name: n, email: e } = JSON.parse(saved);
            if (n) setName(n);
            if (e) setEmail(e);
          } catch {}
        }
      }
    }
  }, [demoUser]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ name, email }));
    }
    toast.success("Profile saved (demo).");
  };

  if (!demoUser) {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Please log in to edit your profile.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  if (demoUser.role !== "STUDENT") {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">This page is for students.</p>
        <Button asChild variant="link">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Profile</h1>
      <p className="mt-2 text-muted-foreground">Edit your account information.</p>

      <Card className="mt-6 max-w-md">
        <CardHeader>
          <CardTitle>Personal info</CardTitle>
          <CardDescription>Update your name and email (demo: saved in browser).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
