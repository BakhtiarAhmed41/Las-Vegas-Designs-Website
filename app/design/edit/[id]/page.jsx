"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditDesignRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (id) router.replace(`/design/add?edit=${id}`);
  }, [id, router]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center text-gray-500">
      Redirecting to edit form…
    </div>
  );
}
