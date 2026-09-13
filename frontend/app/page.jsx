"use client";

import Card from "../components/Card";
import Hero from "../components/Hero";
import Button from "../components/Button";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";

const features = [
  ["Simple sign in", "Use the Django account you already have."],
  ["Your account", "See your signed-in name anywhere in the site."],
  ["Easy logout", "End your session whenever you are finished."],
];

export default function HomePage() {
  const { user, isLoading, logOut } = useAuth();
  const router = useRouter();
  function handleLogout() { logOut(); router.push("/authentication"); }
  return <>
    <Hero />
    <section className="section">
      <div className="sectionHeading">
        <p className="eyebrow">Built for clarity</p>
        <h2>Only the essentials.</h2>
      </div>
      <div className="cardGrid">
        {features.map(([title, text]) => <Card key={title} title={title}>{text}</Card>)}
      </div>
    </section>
    <section className="accountPanel">
      <div>
        <p className="eyebrow">Your account</p>
        <h2>{isLoading ? "Checking your session..." : user ? `Welcome back, ${user.name}.` : "Ready when you are."}</h2>
        <p>{user ? "You are signed in and your account is active." : "Sign in to see your account details here."}</p>
      </div>
      {user ? <Button variant="secondary" onClick={handleLogout}>Logout</Button> : !isLoading && <Button href="/authentication">Sign in</Button>}
    </section>
  </>;
}
