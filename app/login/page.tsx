import { login } from "@/lib/auth-actions";
import { configured } from "@/lib/supabase";
import Link from "next/link";
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const p = await searchParams;
  return (
    <main className="login">
      <Link href="/" className="brand">
        ◈ RoadWatch
      </Link>
      <div className="panel">
        <span className="eyebrow">A BETTER ROAD STARTS HERE</span>
        <h1>
          Every report.
          <br />
          Remembered.
        </h1>
        <p>Track the journey from a citizen’s photo to a verified repair.</p>
        {p.error && (
          <p role="alert" className="error">
            {p.error}
          </p>
        )}
        <form action={login}>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              defaultValue="officer@roadwatch.demo"
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              required
              defaultValue="RoadWatchDemo!2026"
            />
          </label>
          <button disabled={!configured()} className="button">
            Sign in →
          </button>
        </form>
        <div className="notice">
          <b>Demo data · three perspectives</b>
          <p>
            Citizen: citizen@roadwatch.demo
            <br />
            Officer: officer@roadwatch.demo
            <br />
            Reviewer: reviewer@roadwatch.demo
          </p>
          <p>
            Password: <code>RoadWatchDemo!2026</code>
          </p>
          <small>
            Available after running the local seed. Change demo passwords before
            public hosting.
          </small>
        </div>
        {!configured() && (
          <Link href="/" className="button secondary">
            Explore read-only demo →
          </Link>
        )}
      </div>
    </main>
  );
}
