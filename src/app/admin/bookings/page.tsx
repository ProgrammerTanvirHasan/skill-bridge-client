"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminBookingsPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
      <p className="mt-2 text-muted-foreground">
        View all platform bookings (demo).
      </p>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>All bookings</CardTitle>
        </CardHeader>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
