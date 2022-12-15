import cl from './style.module.scss'
import {useBoard} from "../../hooks";

const Board = () => {
  const { map, handleClear, handleStep } = useBoard()

  return (
    <div className={cl.container}>
      <div className={cl.control}>
        <button
          className={cl.clear}
          onClick={handleClear}
        >
          Clear board
        </button>
      </div>
      <div className={cl.board}>
        <ul className={cl.map}>
          {map && map.map((field, index) => (
            <li
              className={cl.cell}
              key={index}
            >
              {field === 'None'
                ? <button onClick={() => handleStep(index)}>{field}</button>
                : <>{field}</>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;