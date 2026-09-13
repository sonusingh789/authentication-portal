export default function Card({ title, children }) {
  return <article className="card">{title && <h3>{title}</h3>}<p>{children}</p></article>;
}
