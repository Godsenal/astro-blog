import type { MarkdownHeading } from "astro";
import classNames from "classnames";
import { createSignal, onMount } from "solid-js";

type Props = {
  headings: MarkdownHeading[];
};

const GAP = 10;

const Toc = ({ headings }: Props) => {
  const [activeHeading, setActiveHeading] = createSignal<string>();

  onMount(() => {
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
  });

  return (
    <div class="absolute left-full h-full hidden xl:block">
      <nav class="sticky top-20 left-0">
        <ul class="m-0 ml-10 p-0 list-none w-60">
          {headings.map((heading) => (
            <li
              class={classNames(
                "p-0 mt-2 first:mt-0 ",
                activeHeading() === heading.slug
                  ? ["text-primary", "font-bold"]
                  : ["text-gray-500"]
              )}
              style={{
                "padding-left": `${(heading.depth - 1) * 1}rem`,
              }}
            >
              <a
                class="p-0"
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
