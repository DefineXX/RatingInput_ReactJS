import { useState } from 'react';

const RatingInput = () => {
  const TOTAL_RATING = 5;

  const [rating, setRating] = useState(0); // Hover와 Current Rating을 모두 반영할 State
  const [hoveredRating, setHoveredRating] = useState(0);

  const getClipPathPercent = (starIndex, value) => {
    if (starIndex <= value) return 0;
    return starIndex - value === 0.5 ? 50 : 100;
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const boxWidth = rect.width;
    const fillWidth = e.clientX - rect.left;

    const value = Math.ceil((fillWidth / boxWidth) * TOTAL_RATING * 2) / 2;
    const hoveredRating = Math.min(Math.max(value, 0.5), TOTAL_RATING);

    setHoveredRating(hoveredRating);
  };

  const fixRating = () => {
    if (hoveredRating === 0) return;

    setRating(hoveredRating);
  };

  const resetRating = () => {
    setHoveredRating(0);
  };

  return (
    <div
      className="rating"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRating}
      onClick={fixRating}
    >
      {Array.from({ length: TOTAL_RATING }).map((_, index) => {
        const fillPercentage = getClipPathPercent(
          index + 1,
          hoveredRating || rating
        );

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
