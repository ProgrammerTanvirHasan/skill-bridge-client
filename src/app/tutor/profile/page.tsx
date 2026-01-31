"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TutorProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Tutor Profile</h1>
      <p className="mt-1 text-muted-foreground">
        Edit your tutor profile and subjects.
      </p>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Headline, bio, rate, and subjects (demo: saved in browser).
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
