"use client";

import { ruslan_display } from "@/utils/fonts";
import { useEffect, useState } from "react";

const gradients = [
  "bg-gradient-to-r from-blue-400 to-purple-300",
  "bg-gradient-to-r from-cyan-500 to-blue-500",
  "bg-gradient-to-r from-sky-500 to-indigo-500",
  "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  "bg-gradient-to-r from-purple-500 to-pink-500",
];

const Header = ({ header }: { header: string | React.ReactNode }) => {
  const [current, setCurrent] = useState(gradients[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % gradients.length;
        setCurrent(gradients[newIndex]);
        return newIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <h1
      className={`${current} mb-0 p-2 font-bold ${ruslan_display} text-center text-3xl tracking-wider rounded-lg`}
    >
      {header}
    </h1>
  );
};

export default Header;
