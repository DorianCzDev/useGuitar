import MainNavigation from "./MainNavigation";

import dynamic from "next/dynamic";

const DynamicMenu = dynamic(() => import("@/app/_components/Menu"), {
  ssr: false,
});

function Header() {
  return (
    <header className="w-full py-2 grid grid-rows-[1fr_min-content] h-64">
      <div className="w-3/4 mx-auto">
        <DynamicMenu />
      </div>
      <div className="w-full border-t border-t-primary-700">
        <MainNavigation />
      </div>
    </header>
  );
}

export default Header;
