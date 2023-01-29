import { useCallback, useEffect, useRef, useState } from "react";
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import { Algolia } from "@constants/config";
import { createPortal } from "react-dom";

// https://github.com/withastro/docs/blob/main/src/components/Header/DocSearch.tsx
const DocSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchButtonRef = useRef(
    document.getElementById("docsearch-search-button") as HTMLButtonElement
  );

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (e: KeyboardEvent) => {
      setIsOpen(true);
    },
    [setIsOpen]
  );

  useEffect(() => {
    searchButtonRef.current?.addEventListener("click", onOpen);
    return () => searchButtonRef.current?.removeEventListener("click", onOpen);
  }, [searchButtonRef.current, onOpen]);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    // @ts-ignore
    <DocSearchModal
      initialScrollY={window.scrollY}
      onClose={onClose}
      {...Algolia}
    />,
    document.body
  );
};

export default DocSearch;
