"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useAuth } from "./AuthProvider";

export default function UserMenu() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  if (!user)
    return (
      <Button href="/authentication" variant="secondary">
        Login
      </Button>
    );
  function handleLogout() {
    logOut();
    router.push("/authentication");
  }
  return (
    <div className="userMenu">
      <span>Hello, {user.name}</span>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
