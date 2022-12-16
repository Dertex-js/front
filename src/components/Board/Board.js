import cl from './style.module.scss'
import {useBoard} from "../../hooks"
import cn from 'classnames'

const Board = () => {
  const { map: matrix, status, handleClear, handleStep } = useBoard()

  return (
    <div className={cl.container}>
      <button
        className={cl.clearBtn}
        onClick={handleClear}
      >
        Новая игра
      </button>
      <div className={cl.board}>
        <ul className={cl.map}>
          {matrix && matrix.map((row, rowIndex) => (
            row.map((field, fieldIndex) => (
              <li
                className={cl.cell}
                key={fieldIndex}
              >
                <button
                  className={cn([
                    cl.button,
                    {[cl.disabled]: field !== ''},
                    {[cl.finished]: status === 'finished' && field === ''}
                  ])}
                  onClick={() => handleStep({fieldIndex, rowIndex})}
                  disabled={(field !== '' || status === 'finished')}
                >{field}</button>
              </li>
            ))
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;