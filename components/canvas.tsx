import { useRef, useEffect } from "react";

export default function Scramble() {
  const canvasRef = useRef<any>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create an array to hold the TV static data
    const staticData: any = [];

    // Generate initial static dots
    function generateStatic() {
      const numDots = 50; // Adjust the number of dots as desired

      for (let i = 0; i < numDots; i++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        const size = Math.floor(Math.random() * 2) + 1; // Adjust the size range for dot sizes

        const dot = {
          x: x,
          y: y,
          size: size,
          opacity: 1, // Initial opacity
          fadeSpeed: 0.9, // Random fade speed
        };

        staticData.push(dot);
      }
    }

    // Render the static effect on the canvas
    function renderStatic() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < staticData.length; i++) {
        const dot = staticData[i];

        dot.opacity -= dot.fadeSpeed; // Reduce opacity based on fade speed

        if (dot.opacity <= 0) {
          // If dot becomes fully transparent, reset its properties
          dot.x = Math.floor(Math.random() * canvas.width);
          dot.y = Math.floor(Math.random() * canvas.height);
          dot.size = Math.floor(Math.random() * 2) + 1;
          dot.opacity = 1;
          dot.fadeSpeed = 0.9;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();
      }
    }

    // Animation loop to continuously update the static effect
    function animate() {
      renderStatic();
      requestAnimationFrame(animate);
    }

    // Start the animation
    generateStatic();
    animate();
  }, []);

  return (
    <div className="relative">
      <canvas className="bg-black" height={800} width={800} ref={canvasRef} />
      <div className="absolute top-0">this is an ovelaying div</div>
    </div>
  );
}
