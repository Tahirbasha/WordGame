import "./App.css";
import React, { Component } from "react";

type AppState = {
  SysWord: string;
  isGameOver: boolean;
  score: number;
  time: number;
  HighScore: boolean;
  LowScore: boolean;
  words: { key: string; word: string }[];
};

type AppProps = {};

class App extends Component<AppProps, AppState> {
  timerId: number = 0;
  state: AppState = {
    SysWord: "",
    isGameOver: false,
    score: 0,
    time: 59,
    HighScore: false,
    LowScore: false,
    words: [],
  };

  componentDidMount() {
    this.getWord();
    this.timerId = window.setInterval(() => this.timer, 1000);
  }

  timer = () => {
    const { time } = this.state;
    // console.log("timer Fun 1", time);

    if (time > 0) {
      // console.log("timer Fun 2", time);
      const dereasedTime = time - 1;
      this.setState({ time: dereasedTime });
    } else {
      window.clearInterval(this.timerId);
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
    if (SysWord === UserOption) {
      await this.setState((prevState) => ({ score: prevState.score + 1 }));
      this.getWord();
    } else {
      this.getWord();
    }
    // console.log(UserOption);
  };

  render() {
    const { score, time, SysWord, words } = this.state;

    return (
      <div className="Main_background">
        <header className="Header_container">
          <h1>WordGame</h1>
          <div className="Score_Time_container">
            <h4>Score : {score}</h4>
            <h4>Time left : {time}</h4>
          </div>
        </header>
        <div className="Bottom_container">
          <div className="Word_container">
            <h1>{SysWord}</h1>
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
