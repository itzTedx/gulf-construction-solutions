"use client";

import { memo, useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

const CheckIcon = memo(({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
});

const CheckFilled = memo(({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
});

// Add display names for debugging
CheckIcon.displayName = "CheckIcon";
CheckFilled.displayName = "CheckFilled";

type Steps = {
  title: string;
  description: string;
};

const LoaderCore = memo(
  ({ data, value = 0 }: { data: Steps[]; value?: number }) => {
    return (
      <ul
        className="relative mx-auto flex max-w-xl flex-col justify-start"
        role="list"
      >
        {data.map((step, index) => {
          const distance = Math.abs(index - value);
          const opacity = Math.max(1 - distance * 0.2, 0);

          return (
            <motion.li
              key={index}
              className={cn("mb-4 flex gap-2 text-left")}
              initial={{
                opacity: 0,
                transform: `translateY(${-(value * 40)}px)`,
              }}
              animate={{
                opacity: opacity,
                transform: `translateY(${-(value * 40)}px)`,
              }}
              transition={{ duration: 0.5 }}
              role="listitem"
              aria-current={value === index ? "step" : undefined}
            >
              <div>
                {index > value && (
                  <CheckIcon className="text-black dark:text-white" />
                )}
                {index <= value && (
                  <CheckFilled
                    className={cn(
                      "text-sky-700/50",
                      value === index && "text-sky-600 opacity-100"
                    )}
                  />
                )}
              </div>
              <div>
                <h3
                  className={cn(
                    "text-lg font-medium text-black dark:text-white",
                    value === index &&
                      "text-black opacity-100 dark:text-sky-500"
                  )}
                >
                  {index + 1} {step.title}
                </h3>

                <p className="text-lg font-light text-gray-600">
                  {step.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    );
  }
);

LoaderCore.displayName = "LoaderCore";

export const MultiStepLoader = ({
  data,
  loading = true,
  duration = 2000,
  loop = true,
}: {
  data: Steps[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);

  const updateState = useCallback(() => {
    setCurrentState((prevState) =>
      loop
        ? prevState === data.length - 1
          ? 0
          : prevState + 1
        : Math.min(prevState + 1, data.length - 1)
    );
  }, [loop, data.length]);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(updateState, duration);
    return () => clearTimeout(timeout);
  }, [currentState, loading, updateState, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative flex h-full w-full items-center justify-center"
          role="status"
          aria-label="Loading progress steps"
        >
          <div className="from-background via-background absolute -top-9 z-10 h-20 w-full bg-gradient-to-b to-transparent" />
          <div className="relative h-96">
            <LoaderCore value={currentState} data={data} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
