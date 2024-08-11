import MainNavLink from "./MainNavLink";

export const dynamic = "force-static";

async function MainNavigation() {
  return (
    <nav>
      <ul className="mx-auto w-full flex h-full justify-center list-none py-5 md:h-fit md:flex-col md:items-center sm:py-2 md:bg-black ">
        <li className=" md:flex md:justify-start">
          <MainNavLink href="/products/guitars">Guitars</MainNavLink>
        </li>
        <li className="  md:flex md:justify-start">
          <MainNavLink href="/products/amplifiers">Amplifiers</MainNavLink>
        </li>
        <li className="  md:flex md:justify-start">
          <MainNavLink href="/products/pickups">Pickups</MainNavLink>
        </li>
        <li className="  md:flex md:justify-start">
          <MainNavLink href="/products/multiEffects">Multi Effects</MainNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
