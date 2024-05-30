"use client";

import Game from "@/components/Game";
import StartPage from "@/components/StartPage";
import { teams } from "@/lib/data/buttonValue";
import { useState } from "react";

const HomePage = () => {
  const [team, setTeam] = useState<typeof teams>(teams);
  const [teamNamesAdded, setTeamNamesAdded] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  //function to add team
  const addTeam = () => {
    const newTeamId = team.length + 1;
    const newTeams = {
      id: newTeamId,
      name: "",
      score: 0,
    };
    setTeam([...team, newTeams]);
    // setNumberOfTeam((prev) => prev + 1);
  };

  const resetTeam = () => {
    setTeam(teams);
    setTeamNamesAdded(false);
    setGameStart(false);
  };

  const changeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    setTeam(
      team.map((team) =>
        team.id === parseInt(id) ? { ...team, name: value } : team
      )
    );
  };

  return (
    <>
      {!teamNamesAdded && !gameStart ? (
        <StartPage
          changeTeamName={changeTeamName}
          addTeam={addTeam}
          team={team}
          resetTeam={resetTeam}
          setTeamNamesAdded={setTeamNamesAdded}
          setGameStart={setGameStart}
        />
      ) : (
        <Game team={team} setTeam={setTeam} />
      )}
    </>
  );
};

export default HomePage;
