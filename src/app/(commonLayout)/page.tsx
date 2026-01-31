import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TutorCard } from "@/components/tutor-card";

export default function HomePage() {
  // const featured = tutors.slice(0, 3);
  return (
    <div>
      <section className="py-12">
        <h2 className="text-2xl font-bold text-foreground">Featured Tutors</h2>
        <p className="mt-2 text-muted-foreground">
          Discover top tutors and book your first session.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* {featured.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))} */}
        </div>
        <Button asChild className="mt-6">
          <Link href="/tutors">Browse all tutors</Link>
        </Button>
      </section>
    </div>
  );
}
