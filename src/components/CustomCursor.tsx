import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  accentColor?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  accentColor = '#dfb776'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position references for physics-based lerp trailing
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is touch-primary
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Inspect target to see if it has special cursor text or is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor]');
        if (interactiveEl) {
          setIsHovered(true);
          const customText = interactiveEl.getAttribute('data-cursor');
          setCursorText(customText || null);
        } else {
          setIsHovered(false);
          setCursorText(null);
        }
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp trailing loop for outer ring
    const renderLoop = () => {
      const ease = 0.16; // Smooth magnetic trail
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      // Position inner precision dot immediately at cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Position follower ring with smooth lerp
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  // If touch device or mouse outside viewport, do not render
  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Precise Inner Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none transition-transform duration-150 ${
          isHovered ? 'scale-0 opacity-0' : isPressed ? 'scale-125' : 'scale-100 opacity-100'
        }`}
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 10px ${accentColor}80, 0 0 2px #ffffff`
        }}
      />

      {/* 2. Magnetic Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-200 ease-out ${
          cursorText
            ? '-ml-8 -mt-8 w-16 h-16 rounded-full border border-[#dfb776] bg-[#0b0c0e]/85 backdrop-blur-xs shadow-lg'
            : isHovered
            ? '-ml-6 -mt-6 w-12 h-12 rounded-full border border-[#dfb776]/90 bg-[#dfb776]/10 scale-110 shadow-[0_0_20px_rgba(223,183,118,0.2)]'
            : isPressed
            ? '-ml-4 -mt-4 w-8 h-8 rounded-full border border-[#dfb776] bg-[#dfb776]/25 scale-90'
            : '-ml-4 -mt-4 w-8 h-8 rounded-full border border-white/35 bg-transparent scale-100'
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[9px] font-mono tracking-widest uppercase font-semibold text-[#dfb776] select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
