import Link from "next/link";

export default function Button({ children, href, type = "button", variant = "primary", ...props }) {
  const className = `button button--${variant}`;
  if (href) return <Link className={className} href={href}>{children}</Link>;
  return <button className={className} type={type} {...props}>{children}</button>;
}
