import { useEffect, useRef, useState } from "react";
import MoreMenu from "@components/MoreMenu";
import classNames from "classnames";

export const Menus = ["blog", "categories", "tags", "about"];

type Props = {
  pathname: string;
};

const Header = ({ pathname }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const themeSwitch = useRef<HTMLLabelElement>(null);

  const handleToggleClick = () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    localStorage.setItem("theme", nextTheme);
    themeSwitch.current?.classList.toggle("swap-active");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={classNames(
        "z-50 sticky top-0",
        scrolled && "backdrop-blur-sm"
      )}
      style={{
        ...(scrolled && {
          boxShadow: "var(--header-border-bottom)",
        }),
      }}
    >
      <div className="navbar px-5  sm:px-0 max-w-screen-sm mx-auto">
        <div className="flex-1 ">
          <a href="/" className="normal-case text-2xl font-bold">
            GODSENAL
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <div className="hidden menu sm:menu-horizontal">
              {Menus.map((menu) => {
                const path = `/${menu}`;
                const isActivePath = pathname.startsWith(path);

                return (
                  <li key={menu}>
                    <a
                      href={path}
                      className={classNames(
                        isActivePath && "text-secondary font-bold"
                      )}
                    >
                      {menu.toLocaleUpperCase()}
                    </a>
                  </li>
                );
              })}
            </div>
            <li id="docsearch-search-button">
              <button className="btn btn-ghost btn-xs h-full flex">
                <div className="h-full flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                  >
                    <path d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z"></path>
                  </svg>
                </div>
              </button>
            </li>
            <li>
              <label
                ref={themeSwitch}
                className="theme-switch h-full btn btn-ghost btn-xs swap swap-rotate"
                onClick={handleToggleClick}
              >
                <svg
                  width={18}
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    fill="currentColor"
                    d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"
                  ></path>
                </svg>
                <svg
                  width={18}
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"
                  ></path>
                </svg>
              </label>
            </li>
            <li className="sm:hidden">
              <MoreMenu />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
