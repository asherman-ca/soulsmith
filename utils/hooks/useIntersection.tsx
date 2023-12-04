import { useEffect, useRef, useState } from "react";

const useIntersection = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // use the viewport as the root
      rootMargin: "0px", // no margin
      threshold: 0.5, // 50% of the target element must be visible
    };

    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        setIsIntersecting(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []); // Empty dependency array means the effect runs once after the initial render

  return { targetRef, isIntersecting };
};

export default useIntersection;
