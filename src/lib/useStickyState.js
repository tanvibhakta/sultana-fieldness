import React from "react";

export const useStickyState = (defaultValue, key) => {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    try {
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (exception) {
      return stickyValue !== null ? stickyValue : defaultValue;
    }
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
