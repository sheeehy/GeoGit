import React, { useState, useEffect } from "react";

const TypingAnimation = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const cities = ["Dublin", "Berlin", "Austin", "Taipei", "Seattle"];

  useEffect(() => {
    if (isPaused) return;

    if (subIndex === cities[index].length + 1 && !reverse) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setReverse(true);
      }, 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prevIndex) => (prevIndex + 1) % cities.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prevSubIndex) => prevSubIndex + (reverse ? -1 : 1));
      },
      reverse ? 100 : 150
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, isPaused]);

  useEffect(() => {
    setText(cities[index].substring(0, subIndex));
  }, [index, subIndex]);

  return (
    <span
      style={{
        minWidth: "13rem",
        display: "inline-block",
        textAlign: "left",
        color: "white",
        textShadow: "0 0 15px lightskyblue, 0 0 20px lightskyblue",
      }}
    >
      {text}
    </span>
  );
};

export default TypingAnimation;
