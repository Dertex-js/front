import {useWS} from "../hooks"

const ConnectButton = () => {
  const {ws, isWs} = useWS()

  const handleClick = () => {
    ws?.connect()
  }

  return <button onClick={handleClick} disabled={!!isWs}>Connect</button>
}

export default ConnectButton;