import React, { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import Lottie from "react-lottie";
import animationDataTomte from "./Lotties/tomte";
import animationDataKula from "./Lotties/kulor";
import { ImMusic, ImVolumeMute2 } from "react-icons/im";
import jul from "./Music/Jul1.mp3";
import jul2 from "./Music/Jul2.mp3";

const cardsImg = [
  { src: "./images/1.jpg", matched: false },
  { src: "./images/2.jpg", matched: false },
  { src: "./images/3.jpg", matched: false },
  { src: "./images/4.jpg", matched: false },
  { src: "./images/5.jpg", matched: false },
  { src: "./images/6.jpg", matched: false }
];

const useAudio = (jul) => {
  const [audio] = useState(new Audio(jul));
  audio.mute = false;
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.currentTime = 0;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const [pair, setPair] = useState(0);

  const [song, setsong] = useState(jul);

  const [playing, toggle] = useAudio(song);

  const animationdefault = {
    loop: true,
    autoplay: true,
    animationData: animationDataTomte,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const animationdefaultKula = {
    loop: true,
    autoplay: true,
    animationData: animationDataKula,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const shuffleCards = () => {
    const shuffleCards = [...cardsImg, ...cardsImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
    setPair(0);
    setsong(jul);
  };

  const HandelCoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceTwo.src === choiceOne.src) {
        setPair((prevpair) => prevpair + 1);
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setChoiceTwo(null);
    setChoiceOne(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisable(false);
    setsong("");
  };

  if (pair === 6) {
    let arrsound = new Audio(jul2);

    const SoundPlay = () => {
      arrsound.play();
    };

    SoundPlay();

    return (
      <div className="App">
        <div className="LottieKula">
          <Lottie
            options={animationdefaultKula}
            style={{ width: "100vw", height: "20vh", position: "absolute" }}
          />
        </div>
        <div>
          <p className="text">GOD JUL</p>
        </div>
        <div className="tomte">
          <Lottie
            options={animationdefault}
            style={{ height: "55vh", width: "55vh" }}
          />
        </div>
        <div></div>
        <div className="btnContainer">
          <button onClick={shuffleCards}>Nytt spel</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="dragOchBtn">
          <p>Antal drag: {turns} </p>
          <p className="Ikon" onClick={toggle}>
            {" "}
            {playing ? <ImMusic /> : <ImVolumeMute2 />}{" "}
          </p>
          <div className="btnContainerSpel">
            <button onClick={shuffleCards}>Nytt spel</button>
          </div>
        </div>

        <div className="cardsContainer">
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              HandelCoice={HandelCoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
