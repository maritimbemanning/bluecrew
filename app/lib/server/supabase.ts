// lib/server/supabase.ts

const SUPABASE_ERROR_MESSAGE = "Missing Supabase configuration";

type SupabaseError = { message: string } | null;

type SupabaseResult = { error: SupabaseError };

type SupabaseSelectOptions = {
  head?: boolean;
  count?: "exact" | "planned" | "estimated";
};

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(SUPABASE_ERROR_MESSAGE);
  }

  return { url, serviceRoleKey };
}

async function extractErrorMessage(response: Response) {
  let message = response.statusText;
  try {
    const data = await response.json();
    if (typeof data?.message === "string") {
      message = data.message;
    } else if (typeof data?.error_description === "string") {
      message = data.error_description;
    }
  } catch {
    const text = await response.text().catch(() => "");
    if (text) {
      message = text;
    }
  }

  return message || "Supabase request failed";
}

async function handleResponse(response: Response): Promise<SupabaseResult> {
  if (response.ok) {
    return { error: null };
  }

  const message = await extractErrorMessage(response);

  return { error: { message } };
}

function buildHeaders(serviceRoleKey: string): HeadersInit {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

function createTableClient(baseUrl: string, serviceRoleKey: string, table: string) {
  const headers = buildHeaders(serviceRoleKey);

  return {
    async insert(payload: Record<string, unknown>): Promise<SupabaseResult> {
      const response = await fetch(`${baseUrl}/rest/v1/${table}`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify(payload),
      });

      return handleResponse(response);
    },

    async select(_columns: string, options?: SupabaseSelectOptions): Promise<SupabaseResult> {
      const url = new URL(`${baseUrl}/rest/v1/${table}`);
      url.searchParams.set("select", "id");
      url.searchParams.set("limit", "1");

      // Use a plain Record<string,string> so we can set custom Supabase
      // Prefer headers without TypeScript complaints about HeadersInit.
      const requestHeaders: Record<string, string> = { ...headers } as Record<string, string>;
      if (options?.count || options?.head) {
        const countPreference = options?.count ?? "exact";
        requestHeaders.Prefer = `count=${countPreference}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: requestHeaders,
        cache: "no-store",
      });

      return handleResponse(response);
    },
  };
}

export function supabaseServer() {
  const { url, serviceRoleKey } = getConfig();

  return {
    from(table: string) {
      return createTableClient(url, serviceRoleKey, table);
    },
  };
}

export async function insertSupabaseRow<T extends Record<string, unknown>>(opts: {
  table: string;
  payload: T;
}) {
  const sb = supabaseServer();
  const { error } = await sb.from(opts.table).insert(opts.payload);
  if (error) throw new Error(error.message);
}

export async function selectSupabaseRows<T>(options: {
  table: string;
  columns: string | string[];
  limit?: number;
  order?: { column: string; ascending?: boolean };
}): Promise<T[]> {
  const { url, serviceRoleKey } = getConfig();
  const columns = Array.isArray(options.columns) ? options.columns.join(",") : options.columns;
  const requestUrl = new URL(`${url}/rest/v1/${options.table}`);
  requestUrl.searchParams.set("select", columns || "*");

  if (typeof options.limit === "number") {
    requestUrl.searchParams.set("limit", String(options.limit));
  }

  if (options.order) {
    const direction = options.order.ascending === false ? "desc" : "asc";
    requestUrl.searchParams.set("order", `${options.order.column}.${direction}`);
  }

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: buildHeaders(serviceRoleKey),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(message);
  }

  return (await response.json()) as T[];
}

function encodeStoragePath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export async function uploadSupabaseObject(options: {
  bucket: string;
  object: string;
  body: ArrayBuffer | Uint8Array;
  contentType?: string;
}) {
  const { url, serviceRoleKey } = getConfig();
  const target = `${url}/storage/v1/object/${options.bucket}/${encodeStoragePath(options.object)}`;
  const payload = options.body instanceof ArrayBuffer ? new Uint8Array(options.body) : options.body;

  // Normalize to Node Buffer which is accepted by fetch as a body on the server.
  // Cast to any for the body to avoid library-specific BodyInit typing issues.
  const bodyPayload: any = payload instanceof Uint8Array ? Buffer.from(payload) : payload;

  const response = await fetch(target, {
    method: "PUT",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": options.contentType || "application/octet-stream",
      "Cache-Control": "max-age=31536000",
    },
    body: bodyPayload,
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(message);
  }
}

export async function createSupabaseSignedUrl(options: {
  bucket: string;
  object: string;
  expiresInSeconds: number;
}): Promise<string> {
  const { url, serviceRoleKey } = getConfig();
  const target = `${url}/storage/v1/object/sign/${options.bucket}/${encodeStoragePath(options.object)}`;

  const response = await fetch(target, {
    method: "POST",
    headers: buildHeaders(serviceRoleKey),
    body: JSON.stringify({ expiresIn: options.expiresInSeconds }),
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(message);
  }

  const data = await response.json().catch(() => null);
  const signedPath = typeof data?.signedURL === "string" ? data.signedURL : data?.signedUrl;

  if (typeof signedPath !== "string") {
    throw new Error("Supabase did not return a signed URL");
  }

  return signedPath.startsWith("http") ? signedPath : `${url}${signedPath}`;
}

export async function listSupabaseObjects(options: {
  bucket: string;
  prefix: string;
  limit?: number;
}): Promise<string[]> {
  const { url, serviceRoleKey } = getConfig();
  const target = `${url}/storage/v1/object/list/${options.bucket}`;

  const response = await fetch(target, {
    method: "POST",
    headers: buildHeaders(serviceRoleKey),
    body: JSON.stringify({ prefix: options.prefix, limit: options.limit ?? 20 }),
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(message);
  }

  const payload = await response.json().catch(() => null);
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .map((item) => (typeof item?.name === "string" ? item.name : null))
    .filter((name): name is string => !!name);
}
