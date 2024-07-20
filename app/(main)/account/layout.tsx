import AccountSidebar from "@/app/_components/AccountSidebar";
import { ChildrenOnlyProps } from "@/app/_types/types";

function Layout({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[300px_3fr]">
      <aside className="flex mt-40 flex-col h-fit">
        <AccountSidebar />
      </aside>
      <article className="mt-24 w-full mx-auto px-8">{children}</article>
    </div>
  );
}

export default Layout;
