import { useRef } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const headerNavRef = useRef<HTMLDivElement>(null);
  const headerMenuToggler = useRef<HTMLDivElement>(null);

  const onHeaderMenuTogglerClick = () => {
    if (headerNavRef && headerNavRef.current && headerMenuToggler && headerMenuToggler.current) {
      if (headerNavRef.current.classList.contains("active") || headerMenuToggler.current.classList.contains("active")) {
        headerNavRef.current.classList.remove("active");
        headerMenuToggler.current.classList.remove("active");
        document.body.classList.remove("lock");
      } else {
        headerNavRef.current.classList.add("active");
        headerMenuToggler.current.classList.add("active");
        document.body.classList.add("lock");
      }
    }
  };

  const onNavLinkClick = () => {
    if (headerNavRef && headerNavRef.current && headerMenuToggler && headerMenuToggler.current) {
      headerNavRef.current.classList.remove("active");
      headerMenuToggler.current.classList.remove("active");
      document.body.classList.remove("lock");
    }
  };

  return (
    <section className="header">
      <div className="container">
        <div className="header__body">
          <div className="header__title">Marvel Explorer</div>
          <nav className="header__nav" ref={headerNavRef}>
            <ul>
              <li>
                <Link className="header__link" to="/characters" onClick={onNavLinkClick}>
                  characters
                </Link>
              </li>
              <li>
                <Link className="header__link" to="/comics" onClick={onNavLinkClick}>
                  comics
                </Link>
              </li>
              <li>
                <Link className="header__link" to="/creators" onClick={onNavLinkClick}>
                  creators
                </Link>
              </li>
              <li>
                <Link className="header__link" to="/events" onClick={onNavLinkClick}>
                  events
                </Link>
              </li>
              <li>
                <Link className="header__link" to="/series" onClick={onNavLinkClick}>
                  series
                </Link>
              </li>
              <li>
                <Link className="header__link" to="/stories" onClick={onNavLinkClick}>
                  stories
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__menu-toggler" ref={headerMenuToggler} onClick={onHeaderMenuTogglerClick}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
};
