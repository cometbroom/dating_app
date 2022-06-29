import { useEffect } from "react";

export default function useKeyEvents(key, callBack) {
  const enterHandler = (e) => {
    if (e.key === key) {
      callBack();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", enterHandler);
    return () => {
      window.removeEventListener("keyup", enterHandler);
    };
  }, [key]);
}
