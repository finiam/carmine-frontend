"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { UserInputQuestion } from "./utils";

export default function InputQuestion({
  question,
  saveAnswer,
  ethInUsd,
}: {
  question: UserInputQuestion;
  saveAnswer: (answer: string) => void;
  ethInUsd: number;
}) {
  const [input, setInput] = useState<string>();

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (input) saveAnswer(input);
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) =>
    setInput(ev.target.value);

  return (
    <>
      <p className="mb-0">
        {question.data.question({
          ethPrice: ethInUsd,
          ...question.data,
        })}
      </p>
      {question.status !== "answered" ? (
        <form className="w-fit mx-auto flex gap-8" onSubmit={handleSubmit}>
          <input
            disabled={question.correct}
            className="rounded-md border border-light-gray px-4 disabled:bg-white"
            onChange={handleChange}
            type="number"
            step="0.001"
          />
          <button type="submit" disabled={!input || question.correct}>
            Submit
          </button>
        </form>
      ) : (
        <p
          className={`w-fit text-20 ${
            question.correct ? "text-green" : "text-red"
          }`}
        >
          {question.correct
            ? "Good Job!"
            : "Incorrect. Don't worry, you can try again soon."}
        </p>
      )}
    </>
  );
}
