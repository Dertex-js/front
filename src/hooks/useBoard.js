import { useWS } from "./index"
import {useCallback, useEffect, useState} from "react";

const useBoard = () => {
  const { ws, isWs } = useWS()

  const [map, setMap] = useState(null)
  const [steps, setSteps] = useState(null)

  useEffect(() => {
    let unsubscribe

    const listenMessage = (ev) => {
      try {
        const parsedData = JSON.parse(ev.data)

        if (parsedData.payload?.map) {
          setMap(() => parsedData.payload.map)
        }

        if (parsedData.payload?.steps) {
          setSteps(() => parsedData.payload.steps)
        }
      } catch (e) {
        console.log(e)
      }
    }

    if (ws && isWs) {
      unsubscribe = ws.subscribeMessage(listenMessage)
      ws.send(JSON.stringify({ type: 'getBoardState' }))
    }

    return unsubscribe
  }, [ws, isWs, setSteps, setMap])

  const handleClear = useCallback(() => {
    if (ws && isWs) {
      ws.clear()
    }
  }, [ws, isWs])

  return {map, steps, handleClear}
}

export default useBoard