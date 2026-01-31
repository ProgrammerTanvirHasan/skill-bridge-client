"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StudentProfilePage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Profile</h1>
      <p className="mt-2 text-muted-foreground">
        Edit your account information.
      </p>

      <Card className="mt-6 max-w-md">
        <CardHeader>
          <CardTitle>Personal info</CardTitle>
          <CardDescription>
            Update your name and email (demo: saved in browser).
          </CardDescription>
        </CardHeader>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
