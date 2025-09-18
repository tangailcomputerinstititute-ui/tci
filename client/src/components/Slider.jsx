import React, { useEffect, useMemo, useRef, useState } from "react";

function Slider({
  slides = [],
  autoPlay = true,
  interval = 3500,
  loop = true,
  showArrows = true,
  showDots = true,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);
  const focusRef = useRef(false);

  const count = slides.length;

  const goTo = (i) => {
    if (count === 0) return;
    if (loop) {
      setIndex((i + count) % count);
    } else {
      setIndex(Math.max(0, Math.min(i, count - 1)));
    }
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const startTimer = () => {
    if (!autoPlay || count <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (loop ? (i + 1) % count : Math.min(i + 1, count - 1)));
    }, interval);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!autoPlay || count <= 1) {
      stopTimer();
      return;
    }
    if (hoveringRef.current || focusRef.current) {
      stopTimer();
      return;
    }
    startTimer();
    return () => stopTimer();
  }, [autoPlay, interval, count, loop]);

  const onMouseEnter = () => {
    hoveringRef.current = true;
    stopTimer();
  };
  const onMouseLeave = () => {
    hoveringRef.current = false;
    if (!focusRef.current) startTimer();
  };
  const onFocus = () => {
    focusRef.current = true;
    stopTimer();
  };
  const onBlur = () => {
    focusRef.current = false;
    if (!hoveringRef.current) startTimer();
  };

  // Touch / Swipe
  const startX = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);

  const onTouchStart = (e) => {
    dragging.current = true;
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };
  const onTouchMove = (e) => {
    if (!dragging.current) return;
    currentX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!dragging.current) return;
    const delta = currentX.current - startX.current;
    const threshold = 40;
    if (delta > threshold) prev();
    if (delta < -threshold) next();
    dragging.current = false;
  };

  const trackStyle = useMemo(() => {
    return { transform: `translateX(-${index * 100}%)` };
  }, [index]);

  if (count === 0) {
    return (
      <div className="w-full h-64 grid place-items-center bg-gray-50 rounded-2xl border">
        <p className="text-gray-500">No slides provided</p>
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`relative w-full overflow-hidden rounded-2xl shadow-lg ${className}`}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={trackStyle}
      >
        {slides.map((slide, i) => (
          <div
            key={slide._id || i}
            className="min-w-full relative aspect-[16/9] bg-black"
          >
            <img
              src={slide.slideImageUrl}
              alt={slide.alt || `Slide ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

            {/* Caption */}
            {(slide.caption || slide.tag) && (
              <div className="absolute bottom-6 left-6 max-w-lg">
                {slide.tag && (
                  <span className="inline-block mb-2 text-xs sm:text-sm md:text-base font-medium uppercase bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                    {slide.tag}
                  </span>
                )}
                {slide.caption && (
                  <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl drop-shadow-md">
                    {slide.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-white shadow"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-white shadow"
          >
            ▶
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index
                  ? "bg-white scale-125"
                  : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
