"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function BioRedirectContent() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#background");
  }, [router]);

  return null;
}

export default function BioRedirect() {
  return (
    <Suspense fallback={null}>
      <BioRedirectContent />
    </Suspense>
  );
}
