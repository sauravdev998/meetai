"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col p-4 gap-3">
      <p>{session.user.name}</p>
      <Button
        onClick={() => {
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/") },
          });
        }}
      >
        log out
      </Button>
    </div>
  );
};
