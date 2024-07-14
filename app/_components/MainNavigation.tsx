import MainNavLink from "./MainNavLink";

function MainNavigation() {
  return (
    <nav>
      <ul className="mx-auto w-full flex h-full justify-center list-none py-5">
        <li>
          <MainNavLink href="/products/guitars">Guitars</MainNavLink>
        </li>
        <li>
          <MainNavLink href="/products/amplifiers">Amplifiers</MainNavLink>
        </li>
        <li>
          <MainNavLink href="/products/pickups">Pickups</MainNavLink>
        </li>
        <li>
          <MainNavLink href="/products/multiEffects">Multi Effects</MainNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
