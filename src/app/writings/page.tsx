"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function WritingsRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const author = searchParams.get("author");
    const category = searchParams.get("category");

    let targetUrl = "/#writings";
    const params = new URLSearchParams();

    if (author) params.set("author", author);
    if (category) params.set("category", category);

    if (params.toString()) {
      targetUrl = `/?${params.toString()}#writings`;
    }

    router.replace(targetUrl);
  }, [router, searchParams]);

  return null;
}

export default function WritingsRedirect() {
  return (
    <Suspense fallback={null}>
      <WritingsRedirectContent />
    </Suspense>
  );
}
