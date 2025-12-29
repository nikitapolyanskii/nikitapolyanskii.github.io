"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function PeopleRedirectContent() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#people");
  }, [router]);

  return null;
}

export default function PeopleRedirect() {
  return (
    <Suspense fallback={null}>
      <PeopleRedirectContent />
    </Suspense>
  );
}
