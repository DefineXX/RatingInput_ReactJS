import { useRef, useState } from 'react';

const RatingInput = () => {
  const TOTAL_RATING = 5;

  const ratingRef = useRef(null);

  let hoveredRating = 0;
  let currentRating = 0;

  const [rating, setRating] = useState(0); // Hover와 Current Rating을 모두 반영할 State

  const getClipPathPercent = (starIndex, value) => {
    if (starIndex <= value) return 0;
    return starIndex - value === 0.5 ? 50 : 100;
  };

  const updateStars = (value) => {
    const stars = ratingRef.current.children;

    for (let i = 0; i < TOTAL_RATING; i++) {
      const fillPercentage = getClipPathPercent(i + 1, value);

      stars[i].querySelector(
        '.star-filled'
      ).style.clipPath = `inset (0 ${fillPercentage}% 0 0)`;

      if (fillPercentage < 100) {
        stars[i].classList.add('filled');
      } else {
        stars[i].classList.remove('filled');
      }
    }
  };

  const handleMouseMove = (e) => {
    if (ratingRef.current) {
      const rect = ratingRef.current.getBoundingClientRect();
      const boxWidth = rect.width;
      const fillWidth = e.clientX - rect.left;

      const value = Math.ceil((fillWidth / boxWidth) * TOTAL_RATING * 2) / 2;
      hoveredRating = Math.min(Math.max(value, 0.5), TOTAL_RATING);

      updateStars(hoveredRating);
      setRating(hoveredRating);
    }
  };

  const fixRating = () => {
    if (hoveredRating === 0) return;

    currentRating = hoveredRating;
    updateStars(currentRating);
    setRating(currentRating);
  };

  const resetRating = () => {
    hoveredRating = 0;
    updateStars(currentRating);
    setRating(currentRating);
  };

  return (
    <div
      className="rating"
      ref={ratingRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRating}
      onClick={fixRating}
    >
      {Array.from({ length: TOTAL_RATING }).map((_, index) => {
        const fillPercentage = getClipPathPercent(index + 1, rating);

        return (
          <div
            key={index}
            className={`star ${fillPercentage < 100 ? 'filled' : ''}`}
          >
            <div className="star-empty"></div>
            <div
              className="star-filled"
              style={{
                clipPath: `inset(0 ${fillPercentage}% 0 0)`,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingInput;
