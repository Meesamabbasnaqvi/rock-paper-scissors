import React, { useState, useEffect } from "react";
import "./App.css";

const BEATS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

const CHOICES = {
  scissors: { name: "scissors", icon: "/images/icon-scissors.svg", class: "scissors" },
  spock: { name: "spock", icon: "/images/icon-spock.svg", class: "spock" },
  paper: { name: "paper", icon: "/images/icon-paper.svg", class: "paper" },
  lizard: { name: "lizard", icon: "/images/icon-lizard.svg", class: "lizard" },
  rock: { name: "rock", icon: "/images/icon-rock.svg", class: "rock" },
};

const CLASSIC_CHOICES = ["paper", "scissors", "rock"];
const BONUS_CHOICES = ["scissors", "spock", "paper", "lizard", "rock"];

function App() {
  const [gameMode, setGameMode] = useState(() => {
    return localStorage.getItem("gameMode") || "classic";
  });

  const [scoreClassic, setScoreClassic] = useState(() => {
    const saved = localStorage.getItem("scoreClassic");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [scoreBonus, setScoreBonus] = useState(() => {
    const saved = localStorage.getItem("scoreBonus");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [gameState, setGameState] = useState("selection"); // 'selection' | 'playing'
  const [userPick, setUserPick] = useState(null);
  const [housePick, setHousePick] = useState(null);
  const [result, setResult] = useState(""); // 'win' | 'lose' | 'draw' | ''
  const [showRules, setShowRules] = useState(false);
  const [houseRevealed, setHouseRevealed] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("gameMode", gameMode);
  }, [gameMode]);

  useEffect(() => {
    localStorage.setItem("scoreClassic", scoreClassic);
  }, [scoreClassic]);

  useEffect(() => {
    localStorage.setItem("scoreBonus", scoreBonus);
  }, [scoreBonus]);

  const activeChoices = gameMode === "classic" ? CLASSIC_CHOICES : BONUS_CHOICES;
  const currentScore = gameMode === "classic" ? scoreClassic : scoreBonus;

  const handleUserPick = (pick) => {
    setGameState("playing");
    setUserPick(pick);
    setHousePick(null);
    setHouseRevealed(false);
    setResult("");

    // Simulate computer picking with delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * activeChoices.length);
      const computerChoice = activeChoices[randomIndex];
      setHousePick(computerChoice);

      setTimeout(() => {
        setHouseRevealed(true);
        if (pick === computerChoice) {
          setResult("draw");
        } else if (BEATS[pick].includes(computerChoice)) {
          setResult("win");
          if (gameMode === "classic") {
            setScoreClassic((prev) => prev + 1);
          } else {
            setScoreBonus((prev) => prev + 1);
          }
        } else {
          setResult("lose");
          if (gameMode === "classic") {
            setScoreClassic((prev) => (prev > 0 ? prev - 1 : 0));
          } else {
            setScoreBonus((prev) => (prev > 0 ? prev - 1 : 0));
          }
        }
      }, 500);
    }, 1000);
  };

  const handlePlayAgain = () => {
    setGameState("selection");
    setUserPick(null);
    setHousePick(null);
    setHouseRevealed(false);
    setResult("");
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
    setGameState("selection");
    setUserPick(null);
    setHousePick(null);
    setHouseRevealed(false);
    setResult("");
  };

  const handleResetScore = () => {
    if (gameMode === "classic") {
      setScoreClassic(0);
    } else {
      setScoreBonus(0);
    }
  };

  const toggleRules = () => {
    setShowRules((prev) => !prev);
  };

  return (
    <div className="App">
      {/* Header Area */}
      <div className="header-container">
        <header>
          <div className="logo-box">
            {gameMode === "classic" ? (
              <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="Rock Paper Scissors Logo" className="logo-img" />
            ) : (
              <img src={`${process.env.PUBLIC_URL}/images/logo-bonus.svg`} alt="Rock Paper Scissors Lizard Spock Logo" className="logo-img-bonus" />
            )}
          </div>
          <div className="score-box">
            <span className="score-label">SCORE</span>
            <span className="score-number">{currentScore}</span>
          </div>
        </header>
      </div>

      {/* Main Game Screen */}
      <main>
        {gameState === "selection" ? (
          <div className={`gameboard-wrapper ${gameMode}`}>
            <div className="gameboard-bg">
              {gameMode === "classic" ? (
                <img src={`${process.env.PUBLIC_URL}/images/bg-triangle.svg`} alt="" className="bg-svg" />
              ) : (
                <img src={`${process.env.PUBLIC_URL}/images/bg-pentagon.svg`} alt="" className="bg-svg" />
              )}
            </div>

            {activeChoices.map((choice) => {
              const info = CHOICES[choice];
              return (
                <button
                  key={choice}
                  className={`token-btn ${info.class}`}
                  onClick={() => handleUserPick(choice)}
                  aria-label={`Pick ${choice}`}
                >
                  <div className="token-inner">
                    <img src={`${process.env.PUBLIC_URL}${info.icon}`} alt="" />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="gameplay-container">
            <div className={`player-pick-column ${result === "win" && houseRevealed ? "winner-glow" : ""}`}>
              <span className="pick-title">YOU PICKED</span>
              <div className={`token-placeholder`}>
                <div className={`token-btn static ${CHOICES[userPick].class}`}>
                  <div className="token-inner">
                    <img src={`${process.env.PUBLIC_URL}${CHOICES[userPick].icon}`} alt="" />
                  </div>
                </div>
              </div>
            </div>

            {houseRevealed && (
              <div className="result-middle-column desktop-only">
                <span className="result-text">
                  {result === "win" && "YOU WIN"}
                  {result === "lose" && "YOU LOSE"}
                  {result === "draw" && "DRAW"}
                </span>
                <button className="play-again-btn" onClick={handlePlayAgain}>
                  PLAY AGAIN
                </button>
              </div>
            )}

            <div className={`player-pick-column ${result === "lose" && houseRevealed ? "winner-glow" : ""}`}>
              <span className="pick-title">THE HOUSE PICKED</span>
              <div className="token-placeholder">
                {housePick ? (
                  <div
                    className={`token-btn static ${CHOICES[housePick].class} ${
                      houseRevealed ? "reveal" : "hidden"
                    }`}
                  >
                    <div className="token-inner">
                      <img src={`${process.env.PUBLIC_URL}${CHOICES[housePick].icon}`} alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="empty-placeholder-glow" />
                )}
              </div>
            </div>

            {houseRevealed && (
              <div className="result-middle-column mobile-only">
                <span className="result-text">
                  {result === "win" && "YOU WIN"}
                  {result === "lose" && "YOU LOSE"}
                  {result === "draw" && "DRAW"}
                </span>
                <button className="play-again-btn" onClick={handlePlayAgain}>
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Area with Buttons */}
      <footer className="footer-actions">
        <div className="footer-left">
          <div className="mode-toggle">
            <button
              className={`mode-btn ${gameMode === "classic" ? "active" : ""}`}
              onClick={() => handleModeChange("classic")}
            >
              Classic
            </button>
            <button
              className={`mode-btn ${gameMode === "bonus" ? "active" : ""}`}
              onClick={() => handleModeChange("bonus")}
            >
              Bonus
            </button>
          </div>
        </div>
        <div className="footer-right">
          {currentScore > 0 && (
            <button className="reset-btn" onClick={handleResetScore}>
              Reset Score
            </button>
          )}
          <button className="rules-btn" onClick={toggleRules}>
            Rules
          </button>
        </div>
      </footer>

      {/* Rules Modal */}
      {showRules && (
        <div className="modal-overlay" onClick={toggleRules}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>RULES</h2>
              <button className="close-btn-desktop" onClick={toggleRules} aria-label="Close rules">
                <img src={`${process.env.PUBLIC_URL}/images/icon-close.svg`} alt="" />
              </button>
            </div>
            <div className="modal-body">
              {gameMode === "classic" ? (
                <img src={`${process.env.PUBLIC_URL}/images/image-rules.svg`} alt="Classic Rules" className="rules-img" />
              ) : (
                <img src={`${process.env.PUBLIC_URL}/images/image-rules-bonus.svg`} alt="Bonus Rules" className="rules-img" />
              )}
            </div>
            <button className="close-btn-mobile" onClick={toggleRules} aria-label="Close rules">
              <img src={`${process.env.PUBLIC_URL}/images/icon-close.svg`} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

