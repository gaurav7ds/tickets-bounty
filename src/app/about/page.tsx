export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 text-muted-foreground">
        Tickets Bounty is a platform where users post tickets — bugs, tasks, or
        small projects — and attach a bounty. Other users pick up open tickets,
        complete the work, and earn the bounty when their submission is
        approved.
      </p>
      <p className="mt-3 text-muted-foreground">
        It is built for makers who want to crowdsource focused work and for
        builders who want to get paid for shipping it.
      </p>
    </main>
  );
}
