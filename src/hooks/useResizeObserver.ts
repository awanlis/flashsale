import { useEffect, useState, RefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = (ref: RefObject<HTMLElement | SVGElement | null>) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};

export default useResizeObserver;