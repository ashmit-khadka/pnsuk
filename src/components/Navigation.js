import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import logo from "../assets/images/logo.png";
import LoginContext from "../LoginContext";
import Cookies from "js-cookie";

const mainLinks = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/projects", label: "Projects" },
  { path: "/committee", label: "Committee" },
  { path: "/minutes", label: "Minutes" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About us" },
];

const adminLinks = [
  { path: "/admin/dashboard/articles", label: "Projects" },
  { path: "/admin/dashboard/events", label: "Events" },
  { path: "/admin/dashboard/committee", label: "Committee" },
  { path: "/admin/dashboard/minutes", label: "Minutes" },
];

const NavItem = ({ to, children, onNavigate, isActive, isMobile = false }) => {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(to);
      }}
      className={`no-underline text-sm font-medium rounded-md
        ${isMobile ? "block w-full text-left px-3 py-3" : "px-3 py-2"}
        ${isActive ? "text-white bg-themeDark" : "text-white bg-themePrimary hover:bg-themeDark"}`}
      role="menuitem"
    >
      {children}
    </a>
  );
};

const Navigation = () => {
  const { loginState, setLoginState } = useContext(LoginContext);
  const [navOpen, setNavOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setNavLinks(loginState ? adminLinks : mainLinks);
  }, [loginState]);

  // Close mobile menu on route change
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  const onNavigate = (to) => {
    navigate(to);
  };

  const logOut = () => {
    Cookies.remove("login");
    setLoginState(false);
    navigate("/admin");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-themePrimary shadow">
      <nav className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between"> {/* increased height on md+ */}
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              className="flex items-center gap-2 no-underline"
            >
              <img
                src={logo}
                alt="PNS UK"
                className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-md"  // larger on desktop
              />
              <span className="sr-only">Peterborough Nepalese Society</span>
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {navLinks.map((link) => (
              <NavItem
                key={link.path}
                to={link.path}
                onNavigate={onNavigate}
                isActive={location.pathname === link.path || location.pathname.startsWith(link.path + "/")}
              >
                {link.label}
              </NavItem>
            ))}
            {loginState && (
              <button
                type="button"
                onClick={logOut}
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-themePrimary hover:bg-themeDark"
              >
                Log Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-themeDark hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-themeDark"
              aria-controls="mobile-menu"
              aria-expanded={navOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger / X */}
              <svg
                className={`${navOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${navOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${navOpen ? "block" : "hidden"} bg-themePrimary border-t border-themeDark`}
        role="menu"
        aria-label="Main menu"
      >
        <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <NavItem
              key={link.path}
              to={link.path}
              onNavigate={onNavigate}
              isActive={location.pathname === link.path || location.pathname.startsWith(link.path + "/")}
              isMobile
            >
              {link.label}
            </NavItem>
          ))}
          {loginState && (
            <button
              type="button"
              onClick={logOut}
              className="w-full text-left px-3 py-3 rounded-md text-sm font-medium text-white bg-themePrimary hover:bg-themeDark"
            >
              Log Out
            </button>
          )}
        </div>
      </div>


    </header>
  );
};

export default Navigation;