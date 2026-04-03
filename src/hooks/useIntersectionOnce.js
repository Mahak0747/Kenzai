import { useEffect, useRef, useState } from "react";

export default function useIntersectionOnce(options) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isIntersecting) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options, isIntersecting]);

  return { ref, isIntersecting };
}

