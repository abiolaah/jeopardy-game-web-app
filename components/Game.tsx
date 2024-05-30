"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { dollarValue, teams } from "@/lib/data/buttonValue";
import { columnData } from "@/lib/data/columns";
import { questionData } from "@/lib/data/questions";
import { amita, pacifico, ruslan_display } from "@/utils/fonts";
import { Ban, CornerDownLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Parser from "html-react-parser";
import Confetti from "react-confetti";

const clickedButton: string[] = [];

// Define the Team type
type Team = {
  id: string;
  name: string;
  score: number;
};

type Question = {
  category: string;
  point: string;
  question: string;
  options: { id: number; option: string }[];
  answer: string;
};

export default function Game({
  team,
  setTeam,
}: {
  team: typeof teams;
  setTeam: (t: typeof teams) => void;
}) {
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [flip, setFlip] = useState(false);
  const [error, setError] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");
  const [winningTeam, setWinningTeam] = useState<Team[] | null>(null);

  useEffect(() => {
    const winAudio = new Audio("./sounds/win.wav");
    const lossAudio = new Audio("./sounds/buzzer.wav");

    if (error) {
      lossAudio.play();
    } else if (flip) {
      winAudio.play();

      // Update the teams info only when flip is true
      setTeam((prevTeams) =>
        prevTeams.map((team) =>
          team.name === currentTeam
            ? { ...team, score: team.score + currentScore }
            : team
        )
      );
    }
  }, [error, flip, currentScore, currentTeam, setTeam]);

  const handleQuestion = (q: Question) => {
    setCurrentQuestion(q);
  };

  //logic for checking winner
  const checkWinner = (array: typeof team) => {
    const winner = array.filter(
      (team) => team.score === Math.max(...array.map((team) => team.score))
    );

    setWinningTeam(winner);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {flip && <Confetti width={2000} height={1000} numberOfPieces={1000} />}
      <Header
        header={Parser(`JEOPARDY <br />
            <span className="text-4xl">TCIC YYC FATHER&apos;S DAY EDITION</span>`)}
      />

      {/* SCORE BOARD */}
      <div className={`w-full flex gap-16 items-center justify-evenly my-4`}>
        {team.map((t) => (
          <div key={t.name} className="flex flex-row items-center gap-1">
            <span
              className={`${
                t.id % 2 !== 0 ? "bg-blue-300" : "bg-pink-300"
              } w-24 p-3 rounded-lg font-bold uppercase text-xl cursor-pointer ${
                t.name === currentTeam && "ring-4 ring-orange-800"
              }`}
              onClick={() => setCurrentTeam(t.name)}
            >
              {t.name}
            </span>
            <span className="bg-gray-300 p-3 rounded-lg text-xl font-semibold">
              {t.score}
            </span>
          </div>
        ))}
      </div>

      {/* THE GAME */}
      <div className=" w-screen flex">
        <div
          className={`${currentQuestion ? "w-0 hidden" : "w-full block"}
         h-[720px] flex flex-col p-2`}
        >
          <div className="flex-[5%] grid grid-cols-6 pb-1">
            {columnData.map((column, i) => (
              <div
                key={column.id}
                className={`${
                  i === 0
                    ? "mr-1 pl-1"
                    : i === columnData.length - 1
                    ? "ml-1 pr-1"
                    : "mx-1"
                } col-span-1 rounded-md flex flex-col items-center justify-center`}
              >
                <p
                  className={`flex justify-center items-center rounded-lg w-full h-full text-center p-1 bg-emerald-800 text-2xl font-extrabold ${amita} text-slate-300`}
                >
                  {column.name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex-[80%] grid grid-cols-6">
            {columnData.map((column, i) => (
              <div
                key={i}
                className="px-1 col-span-1 flex flex-col items-center justify-evenly"
              >
                {dollarValue.map((val, i) => (
                  <>
                    <button
                      type="button"
                      key={`${val.id}${i}`}
                      disabled={
                        clickedButton.includes(`${column.name}-${val.value}`) ||
                        !currentTeam
                      }
                      onClick={() => {
                        const question = questionData.find(
                          (q) =>
                            q.category === column.name && q.point === val.value
                        );
                        if (question) {
                          handleQuestion(question);
                          setCurrentScore(parseInt(val.value));
                          clickedButton.push(`${column.name}-${val.value}`);
                        }
                      }}
                      className={`${
                        i !== 0 ? "my-1" : "mb-1"
                      } relative flex-1 w-full rounded-lg text-5xl font-bold font-serif ${
                        clickedButton.includes(`${column.name}-${val.value}`) ||
                        !currentTeam
                          ? "bg-gray-600"
                          : "bg-emerald-800 text-amber-300 hover:bg-gray-400"
                      }`}
                    >
                      {val.value}
                      <Ban
                        className={`absolute top-0 w-full h-full ${
                          clickedButton.includes(`${column.name}-${val.value}`)
                            ? "z-10"
                            : "hidden"
                        }`}
                      />
                    </button>
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${currentQuestion ? "w-full flex flex-col" : "w-0 hidden"}
         h-[720px] border border-blue-600 bg-yellow-600 rounded-lg p-2`}
        >
          {/* BOARD AND END GAME BUTTON */}
          <div className="flex flex-row flex-[5%] justify-between mb-2">
            <button
              type="button"
              onClick={() => {
                setCurrentQuestion(null);
                setFlip(false);
                setError("");
                setSelectedOption(null);
                setNumberOfTries(0);
                setCurrentScore(0);
                setCurrentTeam("");
              }}
              className="font-[Nunito] font-bold uppercase text-3xl p-2 bg-emerald-400 rounded-md flex gap-2 items-center"
            >
              <CornerDownLeftIcon className="text-xs" />
              Board
            </button>
            <button
              type="button"
              onClick={() => checkWinner(team)}
              className={`font-[Nunito] font-bold uppercase text-3xl p-2 bg-red-600 rounded-md gap-2 items-center 
              ${
                clickedButton.length === questionData.length ? "flex" : "hidden"
              }
                  `}
            >
              End Game
            </button>
          </div>

          <div
            className={`relative flex flex-[85%] h-full items-center justify-center rounded-lg shadow-md bg-white card ${
              flip ? "flip" : ""
            }`}
          >
            <div className="absolute flex items-center justify-center p-4 h-full card-fb">
              <div className="flex flex-col items-center justify-center">
                <span
                  className={`${
                    error ? "block" : "hidden"
                  } text-red-500 mb-12 font-bold text-4xl border border-red-200 p-2 rounded-lg`}
                >
                  {error}
                </span>
                {/* {questionData.map((q) => ( */}
                {currentQuestion && (
                  <>
                    {/* QUESTION */}
                    <div
                      // key={`${q.category}-${q.point}`}
                      className="text-3xl font-bold font-serif text-blue-600"
                    >
                      {currentQuestion.question}
                    </div>

                    {/* QUESTION OPTIONS */}
                    <div className="flex flex-col gap-2 mt-8 text-2xl items-start font-semibold text-gray-300">
                      {currentQuestion.options.map((option) => (
                        <div
                          key={`${option.id}`}
                          className="flex gap-2 text-4xl text-black font-serif items-center"
                        >
                          <input
                            type="radio"
                            name="option"
                            id="option"
                            className="rounded w-6 h-6"
                            value={option.option}
                            disabled={numberOfTries === 2}
                            checked={selectedOption === option.option} // Set checked based on selectedOption state
                            onClick={(e) => {
                              setSelectedOption(e.currentTarget.value); // Update selectedOption state
                              if (
                                e.currentTarget.value === currentQuestion.answer
                              ) {
                                setFlip(true);
                                setError("");
                              } else {
                                setFlip(false);
                                setNumberOfTries((prev) => prev + 1);
                                numberOfTries === 1
                                  ? setError(
                                      "You don't get the point this time! Better Luck Next Time!"
                                    )
                                  : setError("Try again! One more try!");
                              }
                            }}
                          />
                          <label
                            htmlFor="option"
                            className="bg-gray-400 p-1 rounded-full sr-only"
                          >
                            {option.id}
                          </label>
                          {option.option}{" "}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* ))} */}
              </div>
            </div>

            {/* IF NO WINNER SHOW ANSWER ELSE SHOW WINNER */}
            <>
              <div
                // key={q.id}
                className={`absolute font-bold font-[Nunito] text-8xl flex flex-col gap-2 items-center justify-center text-orange-400 p-4 h-full rotate-y-180 card-fb`}
              >
                {winningTeam == null && currentQuestion?.answer}
                {winningTeam?.length === 1 &&
                  Parser(`The Winner is <br />
                    <span className="uppercase text-black">
                      ${winningTeam[0].name}
                    </span>`)}
                {winningTeam?.length > 1 &&
                  Parser(`The Game ended in a <br />
                    <span className="uppercase text-black">Draw</span>`)}
              </div>
              {/* THE WINNER ANNOUCEMENT CARD */}
            </>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
