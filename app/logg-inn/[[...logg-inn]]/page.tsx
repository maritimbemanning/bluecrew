import { redirect } from "next/navigation";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  // Clerk Account Portal handles sign-in
  const params = searchParams as unknown as { redirect_url?: string };
  const redirectUrl = params?.redirect_url
    ? `?redirect_url=${encodeURIComponent(params.redirect_url)}`
    : "";
  redirect(`https://accounts.bluecrew.no/sign-in${redirectUrl}`);
}
