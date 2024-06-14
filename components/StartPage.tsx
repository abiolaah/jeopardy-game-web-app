// "use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { teams } from "@/lib/data/buttonValue";
import { adlam, nunito, pacifico, ruslan_display } from "@/utils/fonts";
import { ModeToggle } from "./ThemeChanger";

const StartPage = ({
  addTeam,
  resetTeam,
  changeTeamName,
  setTeamNamesAdded,
  setGameStart,
  team,
}: {
  addTeam: () => void;
  resetTeam: () => void;
  changeTeamName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTeamNamesAdded: (e: boolean) => void;
  setGameStart: (e: boolean) => void;
  team: typeof teams;
}) => {
  const allNamesAdded = team.every((t) => t.name.trim() !== "");

  const handleStartClick = () => {
    if (allNamesAdded) {
      setTeamNamesAdded(true);
      setGameStart(true);
    } else {
      alert("Please enter names for all teams");
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col gap-6 items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="absolute top-0 w-full">
        <Header header="WELCOME TO JEOPARDY GAME" />
      </div>

      {!allNamesAdded && (
        <div
          className="p-4 mb-4 text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-bold">Info alert!</span> Add team names to begin
          the game.
        </div>
      )}

      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex-1 flex flex-col gap-5 w-full">
          <div className="flex gap-16 justify-between px-8 w-full">
            <h2
              className={`${adlam} text-4xl font-black uppercase text-red-500`}
            >
              TCIC YYC FATHER&apos;S DAY EDITION
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-blue-800 p-2 rounded-lg text-xl"
                onClick={addTeam}
              >
                +Add Team
              </button>
              <button
                type="button"
                className="bg-red-400 p-2 w-32 rounded-lg text-xl"
                onClick={resetTeam}
              >
                Reset
              </button>

              <ModeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-8 justify-center items-center">
            {team.map((team) => (
              <div
                key={team.id}
                className="flex gap-4 items-center justify-center"
              >
                <label
                  htmlFor={`text-${team.id}`}
                  className={`${nunito} text-2xl font-black`}
                >
                  Enter Team Name
                </label>
                <input
                  type="text"
                  id={`${team.id}`}
                  name={`Team-${team.id}`}
                  value={team.name}
                  placeholder={`Team ${team.id}`}
                  onChange={changeTeamName}
                  className="w-[224px] px-2 h-8 rounded-md bg-transparent ring-1 ring-pink-300"
                />
              </div>
            ))}
            <button
              type="button"
              className={`p-2 w-full rounded-lg text-2xl ${
                allNamesAdded ? "bg-green-500" : "bg-gray-500"
              }`}
              onClick={handleStartClick}
              disabled={!allNamesAdded}
            >
              Start
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StartPage;
