import Masthead from "./Masthead";
import PrimaryNavigation from "./PrimaryNavigation";

export default function Header() {
  return (
    <header className="bg-newsprint" role="banner">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Masthead />
      <PrimaryNavigation />
    </header>
  );
}