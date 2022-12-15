import {useWS} from "../hooks"

const CloseButton = () => {
  const {ws, isWs} = useWS()

  const handleClick = () => {
    ws?.close()
  }

  return <button onClick={handleClick} disabled={!isWs}>Close</button>
}

export default CloseButton