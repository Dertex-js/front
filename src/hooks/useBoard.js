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
  const handleStep = useCallback(({ rowIndex, fieldIndex }, matrix) => {

    const x = fieldIndex
    const y = rowIndex
    const startLeftX = x >= 4 ? x - 4 : 0
    const startRightX = x >= 15 ? 19 : x + 4
    const startTopY = y >= 4 ? y - 4 : 0
    const startBottomY = y >= 15 ? 19 : y + 4
    const winMatrix = []

    // matrix.forEach((row, inxRow) => {
    //   winMatrix[inxRow] = []
    //   row.forEach((col, inxCol) => {
    //
    //   })
    // })

    let counter = 0
    for (let i = startTopY; i <= startBottomY; i++) {
      winMatrix[counter] = []
      let counter2 = 0
      for (let j = startLeftX; j <= startRightX; j++) {
        winMatrix[counter][counter2] = matrix[i][j]
        counter2++
      }
      counter++
    }
    console.log(winMatrix)



    // const normalise = (n, positive) => {
    //   for (let i = 0; i < 4; i++) {
    //
    //   }
    //    return positive
    //      ? (n + 4 <= 19 ? n + 4 : n)
    //      : (n - 4 >= 0 ? n - 4 : n)
    // }
    //
    // const winMatrix = []
    // let row = 0
    // let col = 0
    //
    // for (let i = rowIndex - 4; i <= rowIndex + 4; i++) {
    //   for (let j = normalise(fieldIndex, false); j <= normalise(fieldIndex, true); j++) {
    //     if (fieldIndex - 4 >= 0 && fieldIndex + 4 <= 19) {
    //       col = 9
    //     } else {
    //       col = 5
    //     }
    //     winMatrix[row] = new Array(col).fill(matrix[i][j])
    //   }
    //   row++
    // }
    // console.log(winMatrix)

    if (ws && isWs) {
      if (steps.length === 0) {
        ws.send(JSON.stringify({ type: 'firstStep', payload: {winMatrix} }))
      } else {
        ws.send(JSON.stringify({
          type: 'step', payload: {winMatrix, prevStepId: steps.slice(-1)[0]?.id}
        }))
      }
    }
  }, [ws, isWs, steps])

  return {map, steps, status, handleClear, handleStep}
}

export default useBoard