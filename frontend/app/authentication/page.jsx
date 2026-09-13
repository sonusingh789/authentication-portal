"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";
import { useAuth } from "../../components/AuthProvider";
import { apiRequest } from "../../lib/api";

export default function AuthenticationPage() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { user, logIn } = useAuth();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true); setError("");
    try {
      const data = await apiRequest(mode === "login" ? "login/" : "register/", { email: form.get("email"), password: form.get("password"), ...(mode === "register" ? { name: form.get("name"), password2: form.get("password2"), tc: true } : {}) });
      await logIn(data.token);
      router.push("/");
    } catch (caught) { setError(caught.message || "Unable to authenticate."); } finally { setBusy(false); }
  }

  if (user) return <section className="authPage"><div className="authCard"><p className="eyebrow">Already signed in</p><h1>Hello, {user.name}</h1><p>You are logged in. Go home to continue.</p><Button href="/">Go to home</Button></div></section>;
  return <section className="authPage"><div className="authCard"><p className="eyebrow">Authentication</p><h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1><p>{mode === "login" ? "Sign in with your Django account." : "Register and you will be signed in right away."}</p>{error && <p className="error">{error}</p>}<form className="form" onSubmit={handleSubmit}>{mode === "register" && <input name="name" placeholder="Full name" required />}<input name="email" type="email" placeholder="Email address" required /><input name="password" type="password" placeholder="Password" minLength="8" required />{mode === "register" && <input name="password2" type="password" placeholder="Confirm password" minLength="8" required />}<Button type="submit" disabled={busy}>{busy ? "Please wait..." : mode === "login" ? "Login" : "Create account"}</Button></form><button className="textButton" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>{mode === "login" ? "Need an account? Register" : "Already have an account? Login"}</button></div></section>;
}
