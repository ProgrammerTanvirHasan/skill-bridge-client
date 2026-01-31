"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminCategoriesPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Categories</h1>
      <p className="mt-2 text-muted-foreground">
        Manage subject categories for tutoring.
      </p>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle>Add category</CardTitle>
          <CardDescription>
            New category name (demo: saved in browser).
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle>All categories</CardTitle>
        </CardHeader>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
