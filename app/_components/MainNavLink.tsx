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
          ? "text-fontPrimary-500 border-b border-fontPrimary-500"
          : "text-fontPrimary-700"
      } visited:link:active:no-underline uppercase tracking-[4px] px-8 text-2xl py-5 hover:text-fontPrimary-500 font-normal md:text-4xl md:text-neutral-200 md:border-none transition-colors`}
    >
      {children}
    </Link>
  );
}

export default MainNavLink;
