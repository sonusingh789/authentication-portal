const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/user";

function getMessage(data, fallback) {
  if (data && typeof data === "object") {
    if (typeof data.msg === "string") return data.msg;
    const errors = data.errors || data;
    const firstError = Object.values(errors)[0];
    if (Array.isArray(firstError)) return firstError[0];
    if (typeof firstError === "string") return firstError;
  }
  return fallback;
}

export async function apiRequest(path, body, accessToken) {
  const response = await fetch(`${API_URL}/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(getMessage(data, "Something went wrong."));
  return data;
}
