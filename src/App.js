import {useRef} from "react"
import SockJsClient from 'sockjs-client'

const SOCKET_SERVER = 'http://localhost:5000'

function App() {
  const wsConn = useRef(new SockJsClient(SOCKET_SERVER))
  const handleClick = () => {
    if (wsConn.current && wsConn.current.readyState === 1) {
      wsConn.current.send(JSON.stringify({ type: 'ping' }))
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Ping</button>
    </div>
  );
}

export default App;
