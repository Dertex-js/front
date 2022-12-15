import ConnectButton from "../UI/ConnectButton"
import PingButton from "../UI/PingButton"
import CloseButton from "../UI/CloseButton"
import Board from "./Board/Board"

function App() {

  return (
    <div>
      <div>
        <ConnectButton />
        <PingButton />
        <CloseButton />
      </div>
      <div>
        <Board />
      </div>
    </div>
  );
}

export default App;
