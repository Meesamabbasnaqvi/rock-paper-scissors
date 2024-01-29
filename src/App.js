import { createElement, useState } from "react";
import "./App.css";

function App() {
  const [modal, setModal] = useState(true);
  const [blankPad, setBlankPad] = useState(true);
  const [game, setGame] = useState(true);
  const [youPicked, setYouPicked] = useState(4)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [houseChoice, setHouseChoice] = useState([])
  const [houseWin, setHouseWin] = useState(true)
  const [youWin, setYouWin] = useState(true)
  let computerChoices = [
    <div className="image paper-image">
      <img src="./images/icon-paper.svg" alt="" />
    </div>,
    <div className="image scissor-image">
      <img src="./images/icon-scissors.svg" alt="" />
    </div>,
    <div className="image rock-image">
      <img src="./images/icon-rock.svg" alt="" />
    </div>
  ];
  const viewRule = () => {
    setModal(!modal);
  };
  const userChoice = (e) => {
    setYouPicked(e)
    setGame(false)
    let randomChoices = Math.floor(Math.random() * computerChoices.length);
    setHouseChoice(computerChoices[randomChoices])
    setTimeout(() => {
      if (e === 1 && randomChoices === 0 || e === 2 && randomChoices === 1 || e === 0 && randomChoices === 2) {
        setScore(score + 1)
        setResult("You Win")
        setYouWin(false)
        setTimeout(() => {
        }, 500);
      } else if (e === 0 && randomChoices === 1 || e === 1 && randomChoices === 2 || e === 2 && randomChoices === 0) {
        setHouseWin(false)
        setResult("You Lose !")
        if (score > 0) {
          setScore(score - 1)
        }
      } else {
        setResult("Draw !")
      }
    }, 1500)
    setTimeout(() => {
      setBlankPad(false)
    }, 1000);
  }
  const playAgain = () => {
    setGame(true)
    setYouPicked(0)
    setYouWin(true)
    setHouseWin(true)
    setResult("")
    setHouseChoice([])
    setBlankPad(true)
  }
  return (
    <div className="App">
      <div className={modal ? "modal-container" : "modal-container transform"}>
        <div className="modal">
          <h2>RULES</h2>
          <img src="./images/image-rules.svg" alt="" />
        </div>
      </div>
      <div className="header-container">
        <header className="d-flex">
          <div>
            <h3>
              Rock <br /> Paper <br /> Scissors
            </h3>
          </div>
          <div className="score">
            <span>SCORE</span>
            <h3>
              {score}
            </h3>
          </div>
        </header>
      </div>
      <main>
        <div className={game ? "home-screen" : "d-none"}>
          <div className="d-flex images-container">

            <div onClick={() => userChoice(0)} className="image paper-image">
              <img src="./images/icon-paper.svg" alt="" />
            </div>
            <div onClick={() => userChoice(1)} className="image scissor-image">
              <img src="./images/icon-scissors.svg" alt="" />
            </div>
          </div>
          <div id="rock" onClick={() => userChoice(2)} className="image rock-image">
            <img src="./images/icon-rock.svg" alt="" />
          </div>
        </div>
        <button className="rules-btn" onClick={viewRule}>Rules</button>
        <div className={game ? "d-none" : "d-flex game-play"}>
          <div className="start-mode d-flex">
            <div className={houseWin ? "" : "opponent-win"}>
            <div className={houseWin ? "" : "opponent-win-para"}>
              <p className={youWin ? "" : "you-win-with-para"}>You Picked</p>
            </div>
              <div className={youWin ? "" : "winner-border-1"}>
                <div className="winner-border-2">
                  <div className="winner-border-3">
                    <div className={youPicked === 0 ? "image paper-image" : "d-none"}>
                      <img src="./images/icon-paper.svg" alt="" />
                    </div>
                    <div className={youPicked === 1 ? "image scissor-image" : "d-none"}>
                      <img src="./images/icon-scissors.svg" alt="" />
                    </div>
                    <div className={youPicked === 2 ? "image rock-image" : "d-none"}>
                      <img src="./images/icon-rock.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={youWin ? "winner-play-div d-flex" : "d-flex you-play-div"}>
            <div className={houseWin ? "winner-play-div d-flex" : "d-flex house-play-div"}>
              <h1 id="win-lose">{result}</h1>
              <button className="play-btn" id="play-btn" onClick={playAgain}>Play Again</button>
            </div>
          </div>
          <div className={game ? "d-none home-choice" : "home-choice"}>
            <div className={youWin ? "" : "opponent-lose-para"}>
              <p className={houseWin ? "" : "winner-with-para"}>THe House Picked</p>
            </div>
            <div className={blankPad ? "house-choice" : ``}></div>
            {blankPad ? `` :
              <div className={youWin ? "" : "opponent-lose"}>
                <div className={houseWin ? "" : "house-winner-border-1"} >
                  <div className="house-winner-border-2">
                    <div className="house-winner-border-3">
                      {houseChoice}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
