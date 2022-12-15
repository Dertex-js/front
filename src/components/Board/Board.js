import cl from './style.module.scss'
import {useBoard} from "../../hooks"
import cn from 'classnames'

const Board = () => {
  const { map, status, handleClear, handleStep } = useBoard()

  return (
    <div className={cl.container}>
      <button
        className={cl.clear}
        onClick={handleClear}
      >
        Новая игра
      </button>
      <div className={cl.board}>
        <ul className={cl.map}>
          {map && map.map((field, index) => (
            <li
              className={cl.cell}
              key={index}
            >
              <button
                className={cn([
                  cl.button,
                  {[cl.disabled]: field !== ''},
                  {[cl.finished]: status === 'finished'}
                ])}
                onClick={() => handleStep(index)}
                disabled={(field !== '')}
              >{field}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;