import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "node:crypto";

const ADMIN_COOKIE = "cynovia_admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin123";
}

function getAdminToken() {
  return createHash("sha256").update(`cynovia-admin:${getAdminPassword()}`).digest("hex");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === getAdminToken();
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, getAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
