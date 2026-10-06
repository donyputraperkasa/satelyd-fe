const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface RequestOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers, ...rest } = options;

  let authToken = token;
  if (!authToken && typeof window !== "undefined") {
    authToken =
      localStorage.getItem("satelyd.access-token") ??
      localStorage.getItem("satelyd_token") ??
      undefined;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    let msg = `Request failed with status ${res.status}`;
    if (errorBody) {
      if (typeof errorBody.message === "string") {
        msg = errorBody.message;
      } else if (Array.isArray(errorBody.message)) {
        msg = errorBody.message.join(", ");
      } else if (typeof errorBody.error === "string") {
        msg = errorBody.error;
      }
    }
    throw new Error(msg);
  }

  return res.json();
}
