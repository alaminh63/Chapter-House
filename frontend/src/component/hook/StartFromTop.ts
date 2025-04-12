import { useEffect } from "react";

export const StartFromTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};
