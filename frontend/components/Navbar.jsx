import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" href="/">
        Auth Portal
      </Link>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/authentication">Authentication</Link>
      </nav>
      <UserMenu />
    </header>
  );
}
