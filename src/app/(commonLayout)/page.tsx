import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <section className="py-12">
        <h2 className="text-2xl font-bold text-foreground">Featured Tutors</h2>
        <p className="mt-2 text-muted-foreground">
          Discover top tutors and book your first session.
        </p>
        <Button asChild className="mt-4">
          <Link href="/tutors">Browse all tutors</Link>
        </Button>
        {/* TODO: Featured tutor cards from API */}
      </section>
    </div>
  );
}
