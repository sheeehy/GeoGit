import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const defaultCoordinates = [40.7128, -74.006];

function Cobe({ coordinates = defaultCoordinates }) {
  const canvasRef = useRef();
  const locationToAngles = (lat, long) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };
  const focusRef = useRef(locationToAngles(...coordinates));

  useEffect(() => {
    focusRef.current = locationToAngles(...coordinates);
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 1,
      theta: 0,
      dark: 1,
      diffuse: 1,
      mapSamples: 6000,
      mapBrightness: 2,
      baseColor: [0.5, 0.5, 0.5],
      markerColor: [0.815, 0.904, 0.99],
      glowColor: [0.63, 0.808, 0.98],
      markers: [{ location: coordinates, size: 0.1 }],
      onRender: (state) => {
        state.phi = currentPhi;
        state.theta = currentTheta;
        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => globe.destroy();
  }, [coordinates]);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        position: "fixed",
        right: 0,
        zIndex: 0,
        marginTop: "5rem",
        marginRight: "8rem",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
      <div
        className="flex flex-col md:flex-row justify-center items-center control-buttons"
        style={{ gap: ".5rem" }}
      ></div>
    </div>
  );
}
export default Cobe;
