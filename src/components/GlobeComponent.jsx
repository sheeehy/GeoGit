import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";


//Home page globe component - stil taking up too much memory
function GlobeComponent() {
  const canvasRef = useRef(null);
  let globe;
  let phi = 0;

  useEffect(() => {
    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 1,
        width: 650,
        height: 650,
        phi: 1,
        theta: 0,
        dark: 1,
        diffuse: 1,
        scale: 1,
        mapSamples: 6000,
        mapBrightness: 2,
        baseColor: [0.5, 0.5, 0.5],
        markerColor: [0.815, 0.904, 0.99],
        glowColor: [0.63, 0.808, 0.98],
        offset: [0, 0],
        markers: [],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.0075;
        },
      });

      return () => {
        if (globe && globe.destroy) {
          globe.destroy();
        }
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cobe"
      className="z-0"
      style={{ width: "1000px", height: "1000px" }}
      width="750px"
      height="750px"
    />
  );
}

export default GlobeComponent;
