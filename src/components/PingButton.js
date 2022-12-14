import {useWS} from "../hooks"

const PingButton = () => {
  const {ws, isWs} = useWS()

  const handleClick = () => {
    ws?.send(JSON.stringify({ type: 'ping' }))
  }

  return <button onClick={handleClick} disabled={!isWs}>Ping</button>
}

export default PingButton