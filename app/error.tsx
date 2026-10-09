"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="main wide">
      <div className="panel">
        <h1>That action couldn’t be completed.</h1>
        <p>
          Your session, role, or the record’s current state may not allow this
          action. Check required photos and reasons, then try again.
        </p>
        <div className="actions">
          <button className="button" onClick={reset}>
            Try again
          </button>
          <a href="/" className="button secondary">
            Return to overview
          </a>
        </div>
      </div>
    </main>
  );
}
