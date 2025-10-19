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

async function handleResponse(response: Response): Promise<SupabaseResult> {
  if (response.ok) {
    return { error: null };
  }

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

      const requestHeaders: HeadersInit = { ...headers };
      if (options?.count || options?.head) {
        const countPreference = options?.count ?? "exact";
        requestHeaders.Prefer = `count=${countPreference}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: requestHeaders,
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
