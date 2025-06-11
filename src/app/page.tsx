"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = authClient.useSession();
  const onSignUp = () => {
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: () => {
          window.alert("something went wrong");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      }
    );
  };
  const onlogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("something went wrong");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      }
    );
  };
  if (session) {
    return (
      <div className="flex flex-col p-4 gap-3">
        <p>{session.user.name}</p>
        <Button
          onClick={() => {
            authClient.signOut();
          }}
        >
          log out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-4 gap-3">
      <Input
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button onClick={onSignUp}>Sign Up</Button>

      <div className="mt-8">
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={onlogin}>log in</Button>
      </div>
    </div>
  );
}
