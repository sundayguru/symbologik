
import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import WelcomeScreen from './components/WelcomeScreen';
import ChallengeMap from './components/ChallengeMap';
import GameInterface from './components/GameInterface';
import SuccessModal from './components/SuccessModal';
import Leaderboard from './components/Leaderboard';
import PuzzleLibrary from './components/PuzzleLibrary';
import PuzzleCreator from './components/PuzzleCreator';

type SymbologikProps = {
  creator?: boolean;
}
const Symbologik: React.FC<SymbologikProps> = ({ creator }) => {
  const { state, globalStats, customPuzzles, handlers } = useGameLogic(creator);

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-hourglass-start text-indigo-400 text-2xl animate-pulse"></i>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-outfit text-white uppercase tracking-tighter">Syncing Logical Core</h2>
        </div>
      </div>
    );
  }

  switch (state.status) {
    case 'welcome':
      return (
        <WelcomeScreen
          onOpenChallenges={handlers.handleOpenChallenges}
          onOpenCreator={handlers.handleOpenCreator}
          onOpenLibrary={handlers.handleOpenLibrary}
          onOpenLeaderboard={handlers.handleOpenLeaderboard}
        />
      );

    case 'config':
      return (
        <PuzzleCreator
          onCreate={handlers.handleCreatePuzzle}
        />
      );

    case 'challenges':
      return (
        <ChallengeMap
          solvedLevels={state.solvedLevels}
          globalStats={globalStats}
          customPuzzles={customPuzzles}
          onLoadLevel={handlers.loadLevel}
          onPlayCustomPuzzle={handlers.handlePlayCustomPuzzle}
          onBack={handlers.resetGame}
        />
      );

    case 'library':
      return <PuzzleLibrary onPlay={handlers.handlePlayCustomPuzzle} onBack={handlers.resetGame} />;

    case 'leaderboard':
      return <Leaderboard onBack={handlers.resetGame} />;

    case 'playing':
    case 'wrong':
    case 'correct':
      if (!state.puzzle) return null;
      return (
        <>
          <GameInterface
            puzzle={state.puzzle}
            currentLevel={state.currentLevel}
            score={state.score}
            userInput={state.userInput}
            attempts={state.attempts}
            status={state.status}
            globalStats={globalStats}
            onInput={handlers.handleInput}

            onClear={handlers.handleClear}
            onDelete={handlers.handleDelete}
            onSubmit={handlers.handleSubmit}
            onBack={handlers.backToChallenges}
          />
          {state.status === 'correct' && (
            <SuccessModal
              pointsEarned={state.lastPointsEarned}
              explanation={state.puzzle.explanation}
              onClose={handlers.backToChallenges}
            />
          )}
        </>
      );

    default:
      return null;
  }
};

export default Symbologik;
