"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type MainNavLinkProps = {
  href: string;
  children: ReactNode;
};

function MainNavLink({ children, href }: MainNavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`visited:link ${
        pathname === href
          ? "text-neutral-200 border-b border-neutral-300"
          : "text-neutral-500"
      } visited:link:active:no-underline uppercase tracking-[4px] px-8 text-2xl py-5 hover:text-neutral-200 font-normal md:text-4xl md:text-neutral-200 md:border-none transition-colors`}
    >
      {children}
    </Link>
  );
}

export default MainNavLink;
