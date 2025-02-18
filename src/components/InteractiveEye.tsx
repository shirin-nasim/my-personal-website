import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  size?: number;
  trackingSpeed?: number;
  primaryColor?: string;
}

const InteractiveEye = ({
  size = 400,
  trackingSpeed = 0.1,
  primaryColor = "#0A2647",
}: Props) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const angleX = (e.clientX - eyeCenterX) * trackingSpeed;
      const angleY = (e.clientY - eyeCenterY) * trackingSpeed;

      setRotation({ x: angleY, y: angleX });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [trackingSpeed]);

  return (
    <div
      className="relative bg-white rounded-full overflow-hidden shadow-lg"
      style={{ width: size, height: size }}
      ref={eyeRef}
    >
      {/* Outer iris ring */}
      <motion.div
        className="absolute inset-0 m-auto rounded-full"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          background: `linear-gradient(135deg, ${primaryColor}, #1B4B7A)`,
          transformOrigin: "center",
        }}
        animate={{
          x: rotation.y * 2,
          y: rotation.x * 2,
        }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Inner iris details */}
        <div
          className="absolute inset-0 m-auto rounded-full"
          style={{
            width: "80%",
            height: "80%",
            background: `radial-gradient(circle, ${primaryColor} 0%, #051A30 100%)`,
            border: `4px solid ${primaryColor}`,
          }}
        >
          {/* Pupil */}
          <motion.div
            className="absolute inset-0 m-auto rounded-full bg-black"
            style={{ width: "40%", height: "40%" }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* Light reflection */}
            <div
              className="absolute rounded-full bg-white opacity-70"
              style={{
                width: "30%",
                height: "30%",
                top: "20%",
                left: "20%",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveEye;
