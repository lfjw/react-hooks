
let lastState ;

function useState(state) {
  lastState = state

  function setState(newState) {
    lastState = newState
  }
  return [lastState, setState]
}

function Counter() {
  let [state, setState] = useState(0)

  
}