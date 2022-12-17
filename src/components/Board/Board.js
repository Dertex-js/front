import cl from './style.module.scss'
import {useBoard} from "../../hooks"
import cn from 'classnames'
import Modal from "../../UI/Modal/Modal"
import {useEffect, useState} from "react"

const Board = () => {
  const { map: matrix, status, handleClear, handleStep, steps } = useBoard()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    status === 'finished'
      ? setIsModalOpen(true)
      : setIsModalOpen(false)
  }, [status])

  const winner = () => {
    return steps.at(-1)?.id % 2 === 1 ? 'X' : 'O'
  }

  return (
    <>
      <div className={cn(cl.container, {[cl.blur]: isModalOpen})}>
        <button
          className={cl.clearBtn}
          onClick={handleClear}
        >
          Новая игра
        </button>
        <ul className={cl.map}>
          {matrix && matrix.map((row, rowIndex) => (
            row.map((field, fieldIndex) => (
              <li
                className={cl.cell}
                key={fieldIndex}
              >
                <button
                  className={cn([
                    {[cl.disabled]: field !== ''},
                    {[cl.finished]: status === 'finished' && field === ''},
                    {[cl.player1]: field === 'X'},
                    {[cl.player2]: field === 'O'},
                    cl.button
                  ])}
                  onClick={() => handleStep({fieldIndex, rowIndex})}
                  disabled={(field !== '' || status === 'finished')}
                >{field}</button>
              </li>
            ))
          ))}
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        winner={winner()}
      >
        <button
          className={cl.clearBtn}
          onClick={handleClear}
        >
          Новая игра
        </button>
      </Modal>
    </>
  )
}

export default Board;