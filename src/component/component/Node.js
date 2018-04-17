import { React, myconnect } from '@/common/react/Prelude';
import logo from './logo.svg';

const nodeTemplate = {
    code:"",
    type:"node",
    desc:"new element",
    width:100,
    height:80
}

const Node = () => {
    return <img src={logo} className="App-logo" alt="logo" draggable={true} onDragStart={e=>{
        e.dataTransfer.setData("Text",JSON.stringify(nodeTemplate))
    }}/>
}


export default Node