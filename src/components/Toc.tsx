import type { MarkdownHeading } from "astro";
import classNames from "classnames";
import { useEffect, useState } from "react";

type Props = {
  headings: MarkdownHeading[];
};

const GAP = 10;

const Toc = ({ headings }: Props) => {
  const [activeHeading, setActiveHeading] = useState<string>();

  useEffect(() => {
    const $headings = [
      ...headings
        .map((heading) => document.querySelector(`#${heading.slug}`))
        .filter((v): v is HTMLHeadingElement => !!v),
    ];

    document.addEventListener("scroll", () => {
      const activeIdx = $headings.findIndex(
        ($heading) => $heading.getBoundingClientRect().top > GAP
      );

      if (activeIdx === 0) {
        setActiveHeading(undefined);
        return;
      }

      if (activeIdx > 0) {
        setActiveHeading($headings[activeIdx - 1]?.id);
      } else {
        setActiveHeading($headings.slice(-1)[0]?.id);
      }
    });
  }, []);

  return (
    <div className="absolute left-full h-full hidden xl:block">
      <nav className="sticky top-24 left-0">
        <ul className="m-0 ml-10 p-0 list-none w-60">
          {headings.map((heading) => (
            <li
              key={heading.slug}
              className={classNames(
                "p-0 mt-2 first:mt-0 ",
                activeHeading === heading.slug
                  ? ["text-primary", "font-bold"]
                  : ["text-gray-500"]
              )}
              style={{
                paddingLeft: `${(heading.depth - 1) * 1}rem`,
              }}
            >
              <a
                className="p-0"
                href={`#${heading.slug}`}
                onClick={() => window.scrollBy({ top: -200 })}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Toc;
