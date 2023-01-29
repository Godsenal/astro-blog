import { Menus } from "@components/Header";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";

const MoreMenu = () => {
  const [ulRef, setRef] = createSignal<HTMLUListElement>();
  const [isOpen, setIsOpen] = createSignal(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  createEffect(() => {
    const $ul = ulRef();
    if (!$ul) {
      return;
    }
    if (isOpen()) {
      disableBodyScroll($ul);

      onCleanup(() => {
        enableBodyScroll($ul);
      });
    }
  });

  return (
    <>
      <Show when={isOpen()}>
        <div
          onClick={handleToggle}
          class="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-10 backdrop-blur-sm bg-black bg-opacity-75"
        />
      </Show>
      <li class="dropdown dropdown-end z-50">
        <label class="btn btn-ghost h-full btn-xs swap swap-rotate">
          <input type="checkbox" checked={isOpen()} onChange={handleToggle} />
          <svg
            class="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            class="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        <Show when={isOpen()}>
          <ul
            ref={setRef}
            class="dropdown-content menu block p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            {Menus.map((menu) => (
              <li>
                <a class="w-full" href={`/${menu}`}>
                  {menu.toLocaleUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </Show>
      </li>
    </>
  );
};

export default MoreMenu;
