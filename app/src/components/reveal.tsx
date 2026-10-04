import { useEffect, useRef, type ReactNode } from "react";

/* Gentle reveal on scroll.
 *
 * The markup ships fully visible, so the content reads with no script, in a
 * full-page capture, and for anyone who prefers reduced motion. The dimmed
 * starting state is only ever applied by script, and only to a row that is
 * still below the fold when the page mounts, so nothing that is already on
 * screen ever flashes or waits to become visible. */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Already on screen at mount: leave it alone.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    node.classList.add("wa-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("wa-reveal-in");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
