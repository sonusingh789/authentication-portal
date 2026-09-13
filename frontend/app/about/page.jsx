import Card from "../../components/Card";

export const metadata = { title: "About | Auth Portal" };

export default function AboutPage() {
  return (
    <>
      <section className="pageIntro">
        <p className="eyebrow">About this project</p>
        <h1>A clear, beginner-friendly authentication frontend.</h1>
        <p>
          This app is split into small reusable pieces so each page stays easy
          to understand.
        </p>
      </section>
      <section className="section cardGrid">
        <Card title="Reusable components">
          The navbar, footer, buttons, cards, and hero are shared instead of
          copied.
        </Card>
        <Card title="Django API">
          Login and registration use your existing Django REST endpoints.
        </Card>
        <Card title="Simple state">
          A small React context remembers the signed-in user across every page.
        </Card>
      </section>
    </>
  );
}
