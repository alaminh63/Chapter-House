import { useEffect } from "react";

export const useGoTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};
