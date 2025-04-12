import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title}-Boundless Reads`;
    window.scrollTo(0, 0);
  }, [title]);
};
