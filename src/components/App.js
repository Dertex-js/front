import ConnectButton from "../UI/ConnectButton"
import PingButton from "../UI/PingButton"
import CloseButton from "../UI/CloseButton"
import Board from "./Board/Board"
import cl from './stule.module.scss'

function App() {

  return (
    <div className={cl.app}>
      {/*<div className={cl.btnGroup}>*/}
      {/*  <ConnectButton />*/}
      {/*  <PingButton />*/}
      {/*  <CloseButton />*/}
      {/*</div>*/}
        <Board />
    </div>
  );
}

export default App;
