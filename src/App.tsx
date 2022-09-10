import "./App.css";
import React, { Component } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { BsController } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
type AppState = {
  SysWord: string;
  isGameOver: boolean;
  score: number;
  time: number;

  words: { key: string; word: string }[];
  ResetModal: boolean;
  GameOverModal: boolean;
};

type AppProps = {};

Modal.setAppElement("#root");
class App extends Component<AppProps, AppState> {
  timerId: number = 0;
  state: AppState = {
    SysWord: "",
    isGameOver: false,
    score: 0,
    time: 59,
    words: [],
    ResetModal: false,
    GameOverModal: true,
  };

  componentDidMount() {
    this.getWord();
    Cookies.set("TopScore", JSON.stringify(0));
    this.timerId = window.setInterval(() => this.timer(), 1000);
  }

  timer = () => {
    const { time } = this.state;

    if (time !== 0) {
      const dereasedTime = time - 1;
      this.setState({ time: dereasedTime });
    } else {
      let { score } = this.state;
      window.clearInterval(this.timerId);
      let previousScore: string | number | undefined = Cookies.get("TopScore");
      if (previousScore !== undefined) {
        if (score > parseInt(previousScore)) {
          let NewScore = JSON.stringify(score);
          Cookies.set("TopScore", NewScore);
        }
      }

      this.setState({ isGameOver: true, GameOverModal: true });
    }
  };

  getWord = async () => {
    const url = "https://random-word-api.herokuapp.com/word";
    const reponse = await fetch(url);
    const FetchResult = await reponse.json();
    const Word = FetchResult[0];
    const ShuffledWords = [
      { key: "a", word: Word },
      {
        key: "b",
        word: Word.split("")
          .sort(function () {
            return 0.5 - Math.random();
          })
          .join(""),
      },
      {
        key: "c",
        word: Word.split("")
          .sort(function () {
            return 0.5 - Math.random();
          })
          .join(""),
      },
      {
        key: "d",
        word: Word.split("")
          .sort(function () {
            return 0.5 - Math.random();
          })
          .join(""),
      },
      {
        key: "e",
        word: Word.split("")
          .sort(function () {
            return 0.5 - Math.random();
          })
          .join(""),
      },
    ];
    const ShuffledArrayWords = ShuffledWords.sort(() => Math.random() - 0.5);

    await this.setState({ SysWord: Word, words: ShuffledArrayWords });

    console.log(this.state.SysWord);
  };

  CheckWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { SysWord } = this.state;
    const UserOption = e.currentTarget.id;
    if (SysWord === UserOption && this.state.time > 0) {
      await this.setState((prevState) => ({ score: prevState.score + 1 }));
      this.getWord();
    } else {
      this.getWord();
    }
    // console.log(UserOption);
  };

  ResetModalFunction = () => {
    this.setState({ ResetModal: true });
  };

  ResetModalFunctionClose = () => {
    this.setState({ ResetModal: false });
  };

  ResetGame = () => {
    this.getWord();
    this.setState({ score: 0, time: 59 });
    this.ResetModalFunctionClose();
  };

  closeGameOverModal = () => {
    this.getWord();
    this.setState({ GameOverModal: false, score: 0, time: 59 });
  };

  render() {
    const { score, time, SysWord, words, isGameOver, GameOverModal } =
      this.state;
    let TScore: number | string | undefined = Cookies.get("TopScore");

    return (
      <div className="Main_background">
        <header className="Header_container">
          <div className="IconContainer">
            <h1>WordGame</h1>
            <BsController
              size={40}
              style={{ color: "white", marginLeft: "5px" }}
            />
          </div>

          <div className="Score_Time_container">
            <h4>Top Score: {TScore ? TScore : 0}</h4>
            <h4>Score : {score}</h4>
            <h4>Time left : {time}</h4>
          </div>
        </header>
        <div className="Bottom_container">
          <div className="Word_container">
            <button className="Sys_Word">{SysWord}</button>
          </div>
          <div className="Options_container">
            <div className="Button_container">
              {words.map((each) => {
                return (
                  <button
                    className="Option_button"
                    key={each.key}
                    id={each.word}
                    onClick={this.CheckWord}
                  >
                    {each.word}
                  </button>
                );
              })}
            </div>
            <button className="Reset_button" onClick={this.ResetModalFunction}>
              Reset
            </button>
          </div>
        </div>
        <Modal
          isOpen={this.state.ResetModal}
          onRequestClose={() => this.ResetModalFunctionClose()}
          className="ResetModal"
          style={{
            overlay: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
            },
            content: {
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "25px",
              paddingBottom: "25px",
              height: "30vh",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              border: "0px",
              backgroundColor: "gold",
            },
          }}
          // className="Modal_box"
          // overlayClassName="Modal_box"
        >
          <h4 className="RModalText">Reset do not record your current score</h4>
          <h4 className="RModalText">Are you sure to Reset ?</h4>
          <div className="ResetModal_buttons">
            <button onClick={this.ResetGame} className="Modal_buttons">
              YES
            </button>
            <button
              onClick={this.ResetModalFunctionClose}
              className="Modal_buttons"
            >
              NO
            </button>
          </div>
        </Modal>
        {/* {isGameOver ? <GameOver /> : null} */}
        {isGameOver && (
          <Modal
            isOpen={GameOverModal}
            onRequestClose={() => this.closeGameOverModal()}
            className="ResetModal"
            style={{
              overlay: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
              },
              content: {
                paddingLeft: "80px",
                paddingRight: "80px",
                // paddingTop: "25px",
                // paddingBottom: "25px",
                height: "20vh",

                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                border: "0px",
                backgroundColor: "gold",
              },
            }}
          >
            <div className="Restart">
              <h4 className="RModalText">Time's Up</h4>
              <IoTimeOutline
                size={17}
                style={{ color: "#050528", fontWeight: "bold" }}
              />
            </div>

            <button
              onClick={this.closeGameOverModal}
              className="StartAgainModalbuttons"
            >
              Start Again
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
