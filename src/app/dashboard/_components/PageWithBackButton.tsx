import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";
import { FaCaretLeft } from "react-icons/fa";

type Props = {
  backButtonHref: string;
  pageTitle: string;
  children: ReactNode;
};

export default function PageWithBackButton({
  backButtonHref,
  pageTitle,
  children,
}: Props) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-8">
      <Button size="icon" variant="outline" className="rounded-full" asChild>
        <Link href={backButtonHref}>
          <div className="sr-only">Back</div>
          <FaCaretLeft className="size-8" />
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold self-center">{pageTitle}</h1>
      <div className="col-sart-2">{children}</div>
    </div>
  );
}
