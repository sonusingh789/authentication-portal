import Button from "./Button";

export default function Hero() {
  return (
    <section className="hero">
      <p className="eyebrow">Django authentication</p>
      <h1>A simple place for your account.</h1>
      <p>Sign in or create an account to access your profile across the site.</p>
      <div className="buttonRow">
        <Button href="/authentication">Get started</Button>
        <Button href="/about" variant="secondary">About</Button>
      </div>
    </section>
  );
}
