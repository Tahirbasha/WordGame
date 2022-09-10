import "./index.css";
import { Component } from "react";
import Modal from "react-modal";

type GameOverState = { GoodScore: boolean; CloseModal: boolean };
type GameOverProps = {};

class GameOver extends Component<GameOverProps, GameOverState> {
  state: GameOverState = {
    GoodScore: false,
    CloseModal: true,
  };

  componentDidMount() {
    this.ModalCard();
  }

  ModalCard = () => {
    let score: string | null | number = localStorage.getItem("UserScore");

    console.log(score, "gameOver");
    if (score) {
      score = parseInt(score);
      if (score >= 10) {
        this.setState({ GoodScore: true });
      }
    }
  };

  CloseGameOverModel = () => {
    this.setState({ CloseModal: false });
  };

  render() {
    const { GoodScore, CloseModal } = this.state;
    return (
      <Modal
        isOpen={CloseModal}
        style={{
          overlay: {},
          content: {
            position: "fixed",
            top: 270,
            left: 500,
            right: 500,
            bottom: 270,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            border: "0px",
          },
        }}
      >
        {GoodScore ? <h4>You Rocked Champ!!</h4> : <h4>You did great !!!</h4>}
        <button>Start Again</button>
        <button onClick={this.CloseGameOverModel}>Go Back</button>
      </Modal>
    );
  }
}

export default GameOver;
