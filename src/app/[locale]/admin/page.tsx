export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold text-zinc-100">Dashboard</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded border border-zinc-800 bg-zinc-900 p-6 shadow">
          <h3 className="text-zinc-400">Total Projects</h3>
          <p className="mt-2 text-4xl font-bold text-emerald-500">--</p>
        </div>
        <div className="rounded border border-zinc-800 bg-zinc-900 p-6 shadow">
          <h3 className="text-zinc-400">Active Skills</h3>
          <p className="mt-2 text-4xl font-bold text-emerald-500">--</p>
        </div>
        <div className="rounded border border-zinc-800 bg-zinc-900 p-6 shadow">
          <h3 className="text-zinc-400">Languages</h3>
          <p className="mt-2 text-4xl font-bold text-emerald-500">--</p>
        </div>
      </div>
    </div>
  )
}
