import { useState, useEffect } from "react";

export function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    function downHandler({ key }: any) {
      if (!keyPressed && key === targetKey) {
        setKeyPressed(true);
        // rather than rely on keyup to unpress, use a timeout to workaround the fact that
        // keyup events are unreliable when the meta key is down. See Issue #3:
        // http://web.archive.org/web/20160304022453/http://bitspushedaround.com/on-a-few-things-you-may-not-know-about-the-hellish-command-key-and-javascript-events/
        setTimeout(() => {
          setKeyPressed(false);
        }, 100);
      }
    }

    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}