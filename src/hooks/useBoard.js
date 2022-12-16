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
  const handleStep = useCallback(({fieldIndex: x, rowIndex: y}) => {
    // const startLeftX = x >= 4 ? x - 4 : 0
    // const startRightX = x >= 15 ? 19 : x + 4
    // const startTopY = y >= 4 ? y - 4 : 0
    // const startBottomY = y >= 15 ? 19 : y + 4
    // const winMatrix = []
    // const arrY = []
    // const arrX = []
    // const arrLeftDiag = []
    // const arrRightDiag = []
    //
    // for (let i = startTopY; i <= startBottomY; i++) {
    //   arrY.push(map[i][x])
    // }
    // for (let j = startLeftX; j <= startRightX; j++) {
    //   arrX.push(map[y][j])
    // }
    // for (let i = -4; i <= 4; i++) {
    //   if (map[y + i]) {
    //     if (map[y + i][x + i]) {
    //       arrLeftDiag.push(map[y + i][x + i])
    //     }
    //   }
    // }
    // for (let i = -4; i <= 4; i++) {
    //   if (map[y + i]) {
    //     if (map[y + i][x - i]) {
    //       arrRightDiag.push(map[y + i][x - i])
    //     }
    //   }
    // }


    if (ws && isWs) {
      if (steps.length === 0) {
        ws.send(JSON.stringify({ type: 'firstStep', payload: {x, y} }))
      } else {
        ws.send(JSON.stringify({
          type: 'step', payload: {x, y, prevStepId: steps.slice(-1)[0]?.id}
        }))
      }
    }
  }, [ws, isWs, steps])

  return {map, steps, status, handleClear, handleStep}
}

export default useBoard