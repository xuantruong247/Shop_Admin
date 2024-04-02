import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
    </div>
  );
}
