"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticateWithGoogle() {
  cookies().set({
    name: "redirect_to",
    value: "http://localhost:3000/discover",
  });

  redirect("http://localhost:3001/auth/google");
}
