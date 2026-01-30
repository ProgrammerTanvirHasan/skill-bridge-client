export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Tutor Profile</h1>
      <p className="mt-2 text-muted-foreground">
        Tutor details, reviews, and book session. (ID: {id})
      </p>
      {/* TODO: Tutor profile, reviews, booking form */}
    </div>
  );
}
