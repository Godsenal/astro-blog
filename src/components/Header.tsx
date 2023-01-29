import { createSignal, onMount } from "solid-js";
import MoreMenu from "@components/MoreMenu";

export const Menus = ["blog", "categories", "tags"];

const Header = () => {
  const [scrolled, setScrolled] = createSignal(false);
  let themeSwitch: HTMLLabelElement | undefined;

  const handleToggleClick = () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    localStorage.setItem("theme", nextTheme);
    themeSwitch?.classList.toggle("swap-active");
  };

  onMount(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
  });

  return (
    <nav
      class="z-50 sticky top-0 backdrop-blur-md"
      style={{
        background: "hsla(var(--b3), 0.5)",
        ...(scrolled() && {
          "box-shadow": "var(--header-border-bottom)",
        }),
      }}
    >
      <div class="navbar px-5  sm:px-0 max-w-screen-sm mx-auto">
        <div class="flex-1 ">
          <a
            href="/"
            class="btn btn-ghost normal-case text-2xl px-0 animate-none"
          >
            GODSENAL
          </a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <div class="hidden menu sm:menu-horizontal">
              {Menus.map((menu) => (
                <li>
                  <a href={`/${menu}`}>{menu.toLocaleUpperCase()}</a>
                </li>
              ))}
            </div>
            <li>
              <label
                ref={themeSwitch}
                class="theme-switch btn btn-ghost swap swap-rotate"
                onClick={handleToggleClick}
              >
                <svg
                  width={18}
                  class="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    fill="currentColor"
                    d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"
                  ></path>
                </svg>
                <svg
                  width={18}
                  class="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"
                  ></path>
                </svg>
              </label>
            </li>
            <div class="sm:hidden">
              <MoreMenu />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
