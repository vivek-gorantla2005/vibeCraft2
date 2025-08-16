"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate("span", {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
      }, {
        duration: 0.3,
        delay: stagger(0.1),
        ease: "easeInOut",
      });
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div
            key={`word-${idx}`}
            className={cn(
              "inline-block mr-2", // spacing between words
              idx === wordsArray.length - 1 ? "mr-0" : ""
            )}
          >
            {word.text.map((char, index) => (
              <motion.span
                initial={{}}
                key={`char-${index}`}
                className={cn(
                  "text-white text-7xl font-extrabold opacity-0 hidden", // font size 7xl
                  word.className
                )}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-center font-bold",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-10 bg-blue-500", // cursor height adjusted
          cursorClassName
        )}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => (
          <div
            key={`word-${idx}`}
            className={cn(
              "inline-block mr-2",
              idx === wordsArray.length - 1 ? "mr-0" : ""
            )}
          >
            {word.text.map((char, index) => (
              <span
                key={`char-${index}`}
                className={cn(
                  "text-white text-7xl",
                  word.className
                )}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 1 }}
      >
        <div
          className="text-7xl font-bold"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity}}
        className={cn(
          "block rounded-sm w-[4px] h-20 bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};
