import { useWS } from "./index"
import {useCallback, useEffect, useState} from "react";

const useBoard = () => {
  const { ws, isWs } = useWS()

  const [map, setMap] = useState(null)
  const [steps, setSteps] = useState([])
  const [status, setStatus] = useState(null)

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

        if (parsedData.payload?.status) {
          setStatus(() => parsedData.payload.status)
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
  }, [ws, isWs, setSteps, setMap, setStatus])

  const handleClear = useCallback(() => {
    if (ws && isWs) {
      ws.send(JSON.stringify({ type: 'clearBoard' }))
    }
  }, [ws, isWs])

  const handleStep = useCallback((field) => {
    if (ws && isWs) {
      if (steps.length === 0) {
        ws.send(JSON.stringify({ type: 'firstStep', payload: {field} }))
      } else {
        ws.send(JSON.stringify({
          type: 'step', payload: {field, prevStepId: steps.slice(-1)[0]?.id}
        }))
      }
    }
  }, [ws, isWs, steps])

  return {map, steps, status, handleClear, handleStep}
}

export default useBoard