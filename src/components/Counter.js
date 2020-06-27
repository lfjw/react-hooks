import React, {useState, useRef} from 'react';

class Counter1 extends React.Component{
  // setState 合并
  state = {number: 0}
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => this.setState({number: this.state.number + 1})}>增加</button>
      </div>
    )
  }
}


function Counter2() {
  // useState 返回一个数组，第一个元素是当前状态， 第二个元素是设置状态的方法
  // 1 方法可以修改状态
  // 2 修改完组件会刷新

  // useState 会覆盖 没写name 会被覆盖掉
  let [state, setState] = useState({name: 'jw', age: 0})
  return (
    <div>
      <p>{state.name}:{state.age}</p>
      <button onClick={() => setState({age: state.age + 1})}>增加</button>
    </div>
  )
}


/**
 * 1 每次渲染都会有自己的state 和 props 
 * 2 每次渲染都有自己的事件处理函数
 * 3 alert 会捕获点击按钮时的状态，不会获取最新的
 */
let lastAdd;
function Counter3(params) {

  let numberRef = useRef() // useRef 和 React.createRef() 返回一个{current: null}
  // 区别在于React.createRef() 返回新的对象
  // useRef 返回同一个对象，指针指向同一个
  // use 核心作用就是多次渲染时候，返回同一个对象，同一块内存地址

  console.log(numberRef);
  

  const [state, setState] = useState({number: 0})
  const add = () => {
    setState({ number: state.number + 1})
    // 给ref.current 赋值 组件不会刷新
    numberRef.current = state.number + 1

  }

  console.log(lastAdd === add,'--1-'); // false  说明了每次都是新的函数，引用地址变了
  lastAdd = add;  

  function showState() {
    setTimeout(() => {
      // alert(state) // 3
      alert(numberRef.current)  //  最新的值
    }, 3000);
  }
  function asyncAdd() {
    setTimeout(() => {
      // 有问题， 同时点击showState asyncAdd 会错乱

      //setState({number: state.number + 1})

      // setState 参数为函数，那么就可以基于最新的状态修改，而不是旧的
      setState((lastState) => ({ number: lastState.number + 1 }))
    }, 1000);
  }


  return (
    <div>
      <p>{state.number}</p>
      <button onClick={add}>++++</button>
      <button onClick={showState}>showState</button>
      <button onClick={asyncAdd}>asyncAdd</button>
    </div>
  )
}


// 惰性初始化
function Counter4(params) {
  // 初始化函数只会在第一次渲染的时候，执行一次，以后将不再执行
  const [state, setState] = useState(() => {
    console.log('useState');
    
    return {
      number: 0
    }
  })



  const add = () => {
    setState((prevState) => ({ number: prevState.number + 1 }))
  }
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={add}>++++</button>
    </div>
  )
}





/**
 * useState 性能优化
 * Object.js
 */ 
function Counter5() {
  const [state, setState] = useState({name: '计数器', number: 0})
  console.log('Counter5');

  const add = () => {
    setState({...state, number: state.number + 1})
  }
  return (
    <div>
      <p>{state.name}: {state.number}</p>
      <button onClick={add}>+</button>
    </div>
  )

}

/** 
 *  减少对象和函数创建
 * 
 * 更新组件，每次都会创建新的函数
 *   const add = () => { setState({...state, number: state.number + 1})}
 * 如何避免呢
 *const add =  useCallback( () => { setState({...state, number: state.number + 1})} )
  useCallback 本意是对函数进行缓存 不销毁，将指针实时指向之前创建的内存地址
 */



export default Counter5