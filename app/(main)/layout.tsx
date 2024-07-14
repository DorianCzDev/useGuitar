import Header from "@/app/_components/Header";
import { ChildrenOnlyProps } from "@/app/_types/types";

function Layout({ children }: ChildrenOnlyProps) {
  return (
    <>
      <Header />
      <main className="w-3/4 mx-auto">{children}</main>
    </>
  );
}

export default Layout;
