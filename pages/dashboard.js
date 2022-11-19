import Head from "next/head";
import React, { useEffect } from "react";
import Student from "../components/Student";
import Admin from "../components/Admin";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const { status, data: session } = useSession();

  //secure dashboard route
  useEffect(() => {
    const securePage = async () => {
      if (!session) {
        router.push("/");
      }
    };
    securePage();
  }, [session, router]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      {status === "authenticated" ? (
        session.user.isAdmin ? (
          <Admin />
        ) : (
          <Student />
        )
      ) : null}
    </>
  );
}