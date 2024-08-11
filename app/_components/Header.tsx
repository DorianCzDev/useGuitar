import MainNavigation from "./MainNavigation";

import dynamic from "next/dynamic";

const DynamicMenu = dynamic(() => import("@/app/_components/Menu"), {
  ssr: false,
});

const DynamicMainNavigation = dynamic(
  () => import("@/app/_components/MainNavigation"),
  {
    ssr: false,
  }
);

function Header() {
  return (
    <header className="w-full py-2 grid grid-rows-[1fr_auto] h-64 xl:w-full  sm:grid-rows-[100px_auto] md:h-auto ">
      <div className="w-3/4 mx-auto xl:w-full ">
        <DynamicMenu />
      </div>
      <div className="w-full border-t border-t-primary-700">
        <DynamicMainNavigation />
      </div>
    </header>
  );
}

export default Header;
