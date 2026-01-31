"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Users</h1>
      <p className="mt-2 text-muted-foreground">
        Manage students and tutors (ban/unban).
      </p>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>All users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">Role</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-right font-medium">Action</th>
                </tr>
              </thead>
            </table>
          </div>
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
