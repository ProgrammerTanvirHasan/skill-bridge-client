"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDemoUser } from "@/lib/demo-context";
import { toast } from "sonner";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["9–11", "11–13", "13–15", "15–17", "17–19"];
const STORAGE_KEY = "skillbridge-demo-availability";

export default function TutorAvailabilityPage() {
  const { demoUser } = useDemoUser();
  const [slots, setSlots] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSlots(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const toggle = (day: string, slot: string) => {
    const key = `${day}-${slot}`;
    const next = { ...slots, [key]: !slots[key] };
    setSlots(next);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleSave = () => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    toast.success("Availability saved (demo).");
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
      <h1 className="text-3xl font-bold text-foreground">Availability</h1>
      <p className="mt-2 text-muted-foreground">Set your available time slots for tutoring.</p>

      <Card className="mt-6 max-w-2xl">
        <CardHeader>
          <CardTitle>Weekly slots</CardTitle>
          <CardDescription>Check the slots when you are available (demo: saved in browser).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left font-medium">Day</th>
                  {SLOTS.map((s) => (
                    <th key={s} className="p-2 text-center font-medium">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAYS.map((day) => (
                  <tr key={day}>
                    <td className="p-2 font-medium">{day}</td>
                    {SLOTS.map((slot) => {
                      const key = `${day}-${slot}`;
                      return (
                        <td key={key} className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={!!slots[key]}
                            onChange={() => toggle(day, slot)}
                            className="h-4 w-4 rounded border-input"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button onClick={handleSave} className="mt-4">Save availability</Button>
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
