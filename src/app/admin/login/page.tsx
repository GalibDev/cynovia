import { redirect } from "next/navigation";
import { loginAdmin } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form action={loginAdmin} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">CYNOVIA Admin</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Login</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Enter the admin password to manage categories and products.</p>
        {params.error ? (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{params.error}</div>
        ) : null}
        <label className="mt-6 block text-sm font-bold text-slate-700">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Admin password"
          />
        </label>
        <button className="mt-6 h-12 w-full rounded-lg bg-blue-950 px-5 text-sm font-bold text-white transition hover:bg-blue-900">
          Login
        </button>
        <p className="mt-4 text-xs leading-5 text-slate-500">Default local password is admin123. Change ADMIN_PASSWORD in production.</p>
      </form>
    </div>
  );
}
