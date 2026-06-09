import React from "react";

const TV_COLORS = ['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff0000', '#3366ff'];

function tvLetterStyle(index: number): React.CSSProperties {
  const c = TV_COLORS[index % TV_COLORS.length];
  return {
    color: '#ffffff',
    textShadow: `-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 1px 1px 0 ${c}bb, 2px 2px 0 ${c}99, 3px 3px 0 ${c}77, 4px 4px 0 ${c}55, 5px 5px 0 ${c}33, 6px 6px 8px ${c}44`,
  };
}

export default function RainbowText({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  let idx = startIndex;
  return (
    <>
      {text.split('').map((char, i) => {
        if (char === ' ') return <span key={i}>&nbsp;</span>;
        const style = tvLetterStyle(idx++);
        return <span key={i} style={style}>{char}</span>;
      })}
    </>
  );
}
