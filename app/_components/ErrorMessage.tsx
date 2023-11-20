export default function ErrorMessage() {
  return (
    <div className="min-h-screen flex gap-2 justify-center items-center">
      <main className="w-3/5 bg-slate-500 rounded-lg">
        <h1 className="text-2xl font-bold p-4">
          Error communicating with Bungie servers
        </h1>
        <section className="text-xl leading-loose p-4 bg-slate-600 rounded-b-lg">
          <p>
            Bungie's API may be down for maintenance, or Destiny Status may have
            encountered an unexpected error.
          </p>
          <ul className="text-lg leading-relaxed list-disc list-inside">
            <li>
              If you're not sure whether the API is down, check Bungie's{' '}
              <a
                target="_blank"
                href="https://twitter.com/BungieHelp"
                className="underline text-blue-300 visited:text-blue-400"
              >
                maintenance notification account
              </a>{' '}
              on Twitter for any recent posts.
            </li>
            <li>
              If you believe the API is available and you're seeing this message
              in error, please wait a moment and try refreshing.
            </li>
            <li>
              If the API is available and you're still seeing this message after
              a refresh, please{' '}
              <a
                target="_blank"
                href="mailto:admin@destinystatus.net"
                className="underline text-blue-300 visited:text-blue-400"
              >
                let us know via email
              </a>{' '}
              so we can look into it ASAP.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
