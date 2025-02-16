"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { teams } from "@/lib/data/buttonValue";
import { columnData } from "@/lib/data/columns";
import { amita, pacifico } from "@/utils/fonts";
import { Ban, BellIcon, CheckCheck, CornerDownLeftIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import Parser from "html-react-parser";
import Confetti from "react-confetti";
import { tcicColumnData } from "@/lib/data/tcicColumns";
import { allQuestion, fathersQuestionData } from "@/lib/data/tcicquestions";

const clickedButton: string[] = [];

export default function Game({
  team,
  setTeam,
}: {
  team: typeof teams;
  setTeam: (t: typeof teams) => void;
}) {
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [flip, setFlip] = useState(false);
  const [noPoint, setNoPoint] = useState(false);
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
      const updateTeam = () => {
        const newTeams = team.map((t) =>
          t.name === currentTeam ? { ...t, score: t.score + currentScore } : t
        );
        setTeam(newTeams);
      };

      updateTeam();
    }
  }, [error, flip]);

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
      {flip && (
        <Confetti
          width={2000}
          height={1000}
          numberOfPieces={1000}
          tweenDuration={100}
        />
      )}
      <div className="absolute top-0 mb-16 w-full">
        <Header
          header={Parser(`JEOPARDY <br />
            <span className="text-5xl">TCIC YYC FAMILY&apos;S DAY EDITION</span>`)}
        />
      </div>

      {/* SCORE BOARD */}
      <div
        className={`w-screen flex gap-8 items-center justify-between mt-12 bg-slate-100 p-16 rounded-lg`}
      >
        {team.map((t) => (
          <div key={t.name} className="flex flex-row items-center gap-1">
            <span
              className={`${
                t.id % 2 !== 0 ? "bg-blue-300" : "bg-pink-300"
              } w-max p-3 rounded-lg font-black uppercase text-6xl cursor-pointer ${
                t.name === currentTeam && "ring-4 ring-orange-800"
              }`}
              onClick={() => setCurrentTeam(t.name)}
            >
              {t.name}
            </span>
            <span className="bg-gray-200 p-3 rounded-lg text-6xl font-extrabold text-gray-900 hover:text-8xl hover:text-red-600">
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
            {tcicColumnData.map((column, i) => (
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
                  className={`flex justify-center items-center rounded-lg w-full h-full text-center p-1 bg-emerald-800 text-4xl font-black ${pacifico} text-slate-300`}
                >
                  {column.name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex-[80%] grid grid-cols-6">
            {fathersQuestionData.map(({ id, name, cat }, ind) => {
              return (
                <div
                  key={`${name}`}
                  className={`px-1 col-span-1 flex flex-col items-center justify-evenly`}
                >
                  {cat.map((val, i) => (
                    <button
                      type="button"
                      key={`${name}-${val.id}-${ind}`}
                      disabled={
                        clickedButton.includes(
                          `${val.category}-${val.point}`
                        ) || !currentTeam
                      }
                      onClick={() => {
                        const question = allQuestion.find(
                          (q) =>
                            q.category === val.category && q.point === val.point
                        );
                        if (question) {
                          handleQuestion(question);
                          setCurrentScore(parseInt(val.point));
                          clickedButton.push(`${val.category}-${val.point}`);
                        }
                      }}
                      className={`${
                        i !== 0 ? "my-1" : "mb-1"
                      } relative flex-1 w-full rounded-lg text-5xl font-bold font-serif ${
                        clickedButton.includes(
                          `${val.category}-${val.point}`
                        ) || !currentTeam
                          ? "bg-gray-600"
                          : "bg-emerald-800 text-amber-300 hover:bg-gray-400"
                      }`}
                    >
                      {val.point}
                      <Ban
                        className={`absolute top-0 w-full h-full ${
                          clickedButton.includes(`${val.category}-${val.point}`)
                            ? "z-10"
                            : "hidden"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              );
            })}
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
                setEndGame(false);
                setNoPoint(false);
              }}
              className={`font-[Nunito] font-bold uppercase text-3xl p-2 bg-emerald-400 rounded-md ${
                endGame ? "hidden" : "flex"
              } gap-2 items-center`}
            >
              <CornerDownLeftIcon className="text-xs" />
              Board
            </button>
            {endGame ? (
              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className={`font-[Nunito] font-bold uppercase text-3xl p-2 bg-red-600 rounded-md gap-2 items-center flex`}
              >
                Restart Game
              </button>
            ) : (
              (noPoint || flip) && (
                <button
                  type="button"
                  onClick={() => {
                    checkWinner(team);
                    setEndGame(true);
                  }}
                  className={`font-[Nunito] font-bold uppercase text-3xl p-2 bg-red-600 rounded-md gap-2 items-center flex`}
                >
                  End Game
                </button>
              )
            )}
          </div>

          <div
            // onClick={() => {
            //   setFlip(true);
            //   setError("");
            // }}
            className={`relative flex flex-[85%] h-full items-center justify-center rounded-lg shadow-md bg-white card ${
              flip || noPoint ? "flip" : ""
            }`}
          >
            <div className="absolute flex items-center justify-center p-4 h-full card-fb">
              <div className="flex flex-col items-center justify-center space-y-20">
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
                    <div className="w-full flex items-center justify-between gap-4">
                      <button
                        onClick={() => {
                          setFlip(false);
                          setNumberOfTries((prev) => prev + 1);
                          numberOfTries === 1
                            ? setError(
                                "You don't get the point this time! Better Luck Next Time!"
                              )
                            : setError("Try again! One more try!");
                        }}
                        type="button"
                        className="text-red-500 text-xl font-bold flex gap-2 items-center justify-center ring-1 ring-black rounded-xl hover:text-white hover:bg-red-500 p-2"
                      >
                        <X /> Wrong
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTeam("");
                          setNoPoint(true);
                          setError("");
                        }}
                        type="button"
                        className="text-gray-600 text-xl font-bold flex gap-2 items-center justify-center ring-1 ring-black rounded-xl hover:text-white hover:bg-blue-500 p-2"
                      >
                        <BellIcon /> Better Luck Next Time
                      </button>

                      <button
                        onClick={() => {
                          setFlip(true);
                          setError("");
                        }}
                        type="button"
                        className="text-blue-500 text-xl font-bold flex gap-2 items-center justify-center ring-1 ring-black rounded-xl hover:text-white hover:bg-blue-500 p-2"
                      >
                        <CheckCheck /> Correct
                      </button>
                    </div>
                    {/* <div className="flex flex-col gap-2 mt-8 text-2xl items-start font-semibold text-gray-300">
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
                    </div> */}
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
                {!winningTeam && !endGame && currentQuestion?.answer}
                {winningTeam?.length === 1 &&
                  endGame &&
                  Parser(`The Winner is <br />
                    <span className="uppercase text-black">
                      ${winningTeam[0].name}
                    </span>`)}
                {winningTeam &&
                  winningTeam?.length > 1 &&
                  endGame &&
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
