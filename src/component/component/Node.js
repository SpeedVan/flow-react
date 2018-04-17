import { React, myconnect } from '@/common/react/Prelude';
import logo from './logo.svg';

const nodeTemplate = (id,x,y) => ({
    id:id,
    code:"",
    type:"node",
    desc:"new element",
    x:x,
    y:y
})

const Node = () => {
    return <img src={logo} className="App-logo" alt="logo" draggable={true} onDragStart={e=>{
        e.dataTransfer.setData("text","asdf")
    }}/>
}


export default Node