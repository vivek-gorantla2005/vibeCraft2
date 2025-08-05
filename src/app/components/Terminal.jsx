import React from 'react';

const Terminal = ({onClick}) => {
  return (
    <div className={`bg-[#161716] absolute w-full h-full`} onClick={onClick}>
      <div className="absolute z-10 m-2 text-white font-bold flex items-center font-mono">
        $ <span className="ml-1 terminal-cursor animate-pulse">_</span>
      </div>
    </div>
  );
};

export default Terminal;