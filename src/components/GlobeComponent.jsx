import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

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
        mapSamples: 12000,
        mapBrightness: 2,
        baseColor: [0.5, 0.5, 0.5],
        markerColor: [0.815, 0.904, 0.99],
        glowColor: [0.63, 0.808, 0.98],
        offset: [0, 0],
        markers: [
          { location: [34.0522, -118.2437], size: 0.1 }, // Los Angeles
          { location: [41.8781, -87.6298], size: 0.1 }, // Chicago
          { location: [34.6937, 135.5023], size: 0.1 }, // Osaka
          { location: [31.2304, 121.4737], size: 0.1 }, // Shanghai
          { location: [48.8566, 2.3522], size: 0.1 }, // Paris
          { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
          { location: [40.4168, -3.7038], size: 0.1 }, // Madrid
          { location: [52.3676, 4.9041], size: 0.1 }, // Amsterdam
          { location: [59.3293, 18.0686], size: 0.1 }, // Stockholm
          { location: [55.7558, 37.6176], size: 0.1 }, // Moscow
          { location: [28.6139, 77.209], size: 0.1 }, // New Delhi
          { location: [37.7595, -122.4367], size: 0.1 }, // San Francisco
          { location: [40.7128, -74.006], size: 0.1 }, // New York
          { location: [47.6062, -122.3321], size: 0.1 }, // Seattle
          { location: [30.2672, -97.7431], size: 0.1 }, // Austin
          { location: [52.52, 13.405], size: 0.1 }, // Berlin
          { location: [43.6532, -79.3832], size: 0.1 }, // Toronto
          { location: [39.9042, 116.4074], size: 0.1 }, // Beijing
          { location: [35.6895, 139.6917], size: 0.1 }, // Tokyo
          { location: [37.5665, 126.978], size: 0.1 }, // Seoul
          { location: [53.3498, -6.2603], size: 0.1 }, // Dublin
        ],
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
