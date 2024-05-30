// "use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { teams } from "@/lib/data/buttonValue";
import { amita, nunito, pacifico, ruslan_display } from "@/utils/fonts";

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
    <div className=" flex flex-col gap-6 items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="mt-8 mb-3 w-full h-[40px]">
        <Header header="WELCOME TO JEOPARDY GAME" />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-16 justify-between px-16">
          <h2
            className={`${nunito} text-2xl font-extrabold uppercase text-red-400`}
          >
            TCIC YYC FATHER&apos;S DAY EDITION
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              className="bg-blue-800 p-2 rounded-lg"
              onClick={addTeam}
            >
              +Add Team
            </button>
            <button
              type="button"
              className="bg-red-400 p-2 w-32 rounded-lg"
              onClick={resetTeam}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {team.map((team) => (
            <div
              key={team.id}
              className="flex gap-4 items-center justify-center"
            >
              <label
                htmlFor={`text-${team.id}`}
                className={`${nunito} text-lg`}
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
            className={`ml-[238px] p-2 w-32 rounded-lg ${
              allNamesAdded ? "bg-green-500" : "bg-gray-500"
            }`}
            onClick={handleStartClick}
            disabled={!allNamesAdded}
          >
            Start
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StartPage;
