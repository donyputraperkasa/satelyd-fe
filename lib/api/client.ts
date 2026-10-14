export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // Jika diakses dari HP (IP LAN seperti 192.168.x.x) tetapi envUrl masih default ke localhost
    if (
      (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) &&
      hostname &&
      hostname !== "localhost" &&
      hostname !== "127.0.0.1"
    ) {
      const protocol = window.location.protocol;
      return `${protocol}//${hostname}:4000`;
    }
  }
  return envUrl ?? "http://localhost:4000";
}

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

  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("satelyd.access-token");
      localStorage.removeItem("satelyd_token");
      localStorage.removeItem("satelyd.user");
      localStorage.removeItem("satelyd_user");
      window.dispatchEvent(new Event("storage"));
    }

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
