import { useEffect, useId, useState } from "react";

export function AnimatedMcoreLogo() {
  const id = useId().replace(/:/g, "");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const graphiteKnot = `${id}-graphite-knot`;
  const graphiteSide = `${id}-graphite-side`;
  const blueRibbon = `${id}-blue-ribbon`;
  const blueSide = `${id}-blue-side`;

  const paths = {
    graphiteLower: "M149.99,135.4c-9.11-9.11-18.22-18.22-27.33-27.33,0,0-28.78,28.78-28.78,28.78,0,28.61,30.77,23.89,41.09,13.57,5.01-5.01,10.02-10.02,15.03-15.03,0,0,0,0,0,0Z",
    graphiteUpper: "M150,80.8l27.33,27.33s28.78-28.78,28.78-28.78c0-28.61-30.77-23.89-41.09-13.57l-15.03,15.03",
    graphiteSide: "M134.98,150.38s-13.03,14.72-41.09,14.72-35.89-22.19-35.89-32.19l-.02-49.05c.02-17.49,25.45-15.07,35.91-4.61v57.56c0,28.61,30.77,23.89,41.09,13.57Z",
    blueRibbon: "M133.45,64.25h0s-13.43-15.65-39.56-15.65c-19.93,0-35.61,13.7-35.91,35.26.02-17.49,25.45-15.07,35.91-4.61l28.78,28.78,43.87,43.87s13.43,15.65,39.56,15.65c19.93,0,35.61-13.7,35.91-35.26-.02,17.49-25.45,15.07-35.91,4.61-24.22-24.22-48.44-48.44-72.66-72.66Z",
    blueSide: "M165.02,65.77s13.03-14.72,41.09-14.72,35.89,22.19,35.89,32.19l.02,49.05c-.02,17.49-25.45,15.07-35.91,4.61,0,0,0-57.56,0-57.56,0-28.61-30.77-23.89-41.09-13.57Z",
  };

  return (
    <svg
      className="hero-mark"
      viewBox="0 0 300 220"
      role="img"
      aria-label="Monogramma MCORE"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={graphiteKnot} x1="-80" y1="250" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#17191d" />
          <stop offset=".46" stopColor="#69717d" />
          <stop offset="1" stopColor="#17191d" />
          {!reducedMotion && (
            <animateTransform attributeName="gradientTransform" type="translate" values="0 0; 220 -220; 0 0" keyTimes="0; .68; 1" dur="9s" calcMode="spline" keySplines=".45 0 .2 1; .7 0 .3 1" repeatCount="indefinite" />
          )}
        </linearGradient>
        <linearGradient id={graphiteSide} x1="71.48" y1="238" x2="71.48" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#464d57" />
          <stop offset=".55" stopColor="#17191d" />
          <stop offset="1" stopColor="#717985" />
          {!reducedMotion && (
            <animateTransform attributeName="gradientTransform" type="translate" values="0 0; 0 -170; 0 0" keyTimes="0; .68; 1" dur="9s" calcMode="spline" keySplines=".45 0 .2 1; .7 0 .3 1" repeatCount="indefinite" />
          )}
        </linearGradient>
        <linearGradient id={blueRibbon} x1="-30" y1="-35" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#004da5" />
          <stop offset=".42" stopColor="#0076fd" />
          <stop offset=".63" stopColor="#37a4ff" />
          <stop offset="1" stopColor="#004da5" />
          {!reducedMotion && (
            <animateTransform attributeName="gradientTransform" type="translate" values="0 0; 210 215; 0 0" keyTimes="0; .68; 1" dur="9s" calcMode="spline" keySplines=".45 0 .2 1; .7 0 .3 1" repeatCount="indefinite" />
          )}
        </linearGradient>
        <linearGradient id={blueSide} x1="178.52" y1="225" x2="178.52" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#002b5c" />
          <stop offset=".48" stopColor="#0076fd" />
          <stop offset="1" stopColor="#54b2ff" />
          {!reducedMotion && (
            <animateTransform attributeName="gradientTransform" type="translate" values="0 0; 0 -170; 0 0" keyTimes="0; .68; 1" dur="9s" calcMode="spline" keySplines=".45 0 .2 1; .7 0 .3 1" repeatCount="indefinite" />
          )}
        </linearGradient>
      </defs>
      <g className="hero-mark-ribbon">
        <path d={paths.graphiteLower} fill={`url(#${graphiteKnot})`} />
        <path d={paths.graphiteUpper} fill={`url(#${graphiteKnot})`} />
        <path d={paths.graphiteSide} fill={`url(#${graphiteSide})`} stroke="var(--mark-outline)" strokeWidth=".25" />
        <path d={paths.blueRibbon} fill={`url(#${blueRibbon})`} />
        <path d={paths.blueSide} fill={`url(#${blueSide})`} />
        {!reducedMotion && (
          <g className="hero-mark-contours" aria-hidden="true">
            {Object.values(paths).map((path, index) => (
              <path key={path} d={path} pathLength="1" className={`contour contour-${index + 1}`} />
            ))}
          </g>
        )}
      </g>
    </svg>
  );
}