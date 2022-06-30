import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: CallableFunction) => {
  useEffect(() => {
    const ClickOutside = (evt: Event) => {
      if (!!ref.current && !ref.current.contains(evt.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", ClickOutside);
    return () => {
      document.removeEventListener("mousedown", ClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
