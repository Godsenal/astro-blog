import { Menus } from "@components/Header";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

const MoreMenu = () => {
  const ul = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const $ul = ul.current;
    if (isOpen && $ul) {
      disableBodyScroll($ul);

      return () => enableBodyScroll($ul);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={handleToggle}
          className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-10 backdrop-blur-sm bg-black bg-opacity-75"
        />
      )}
      <div className="relative z-50 px-0">
        <label
          className={classNames(
            "btn btn-ghost h-full btn-xs swap swap-rotate",
            isOpen && "text-neutral-content"
          )}
        >
          <input type="checkbox" checked={isOpen} onChange={handleToggle} />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        {isOpen && (
          <ul
            ref={ul}
            className="absolute top-10 right-0 p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            {Menus.map((menu) => (
              <li>
                <a className="w-full text-lg" href={`/${menu}`}>
                  {menu.toLocaleUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MoreMenu;
