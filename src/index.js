import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const defaultState = [{
    traceId:0,
    id:1,
    code:"WF001",
    version:1,
    desc:"desc xxxxxxxx",
    elems:[{
        id:0,
        code:"start",
        type:"node",
        x:0,
        y:100
    },{
        id:11,
        code:"arrow003",
        type:"arrow",
        from:0,
        next:2
    },{
        id:2,
        code:"R001",
        type:"node",
        version:1,
        desc:"desc R001",
        func:{
            input:["P001","P002"],
            body:"{'RULE0039':P001>1&&3>2,'RULE0089':P002>4}",
            output:"R001"
        },
        x:150,
        y:100
    },{
        id:21,
        code:"arrow001",
        type:"arrow",
        func:{
            input:["R001"],
            body:"R001.RULE0039==true",
            output:"arrow001"
        },
        from:2,
        next:3
    },{
        id:22,
        code:"arrow002",
        type:"arrow",
        func:{
            input:["R001"],
            body:"R001.RULE0039!=true",
            output:"arrow002"
        },
        from:2,
        next:4
    },{
        id:3,
        code:"T001",
        type:"node",
        version:3,
        desc:"desc T001",
        func:{
            input:["R001"],
            body:"R001.RULE0039!=true?0:1",
            output:"T001"
        },
        x:300,
        y:100
    },{
        id:4,
        code:"T002",
        type:"node",
        version:10,
        desc:"desc T002",
        func:{
            input:["R001"],
            body:"R001.RULE0039!=true?0:1",
            output:"T002"
        },
        x:300,
        y:300
    },{
        id:51,
        code:"arrow003",
        type:"arrow",
        from:3,
        next:5
    },{
        id:61,
        code:"arrow004",
        type:"arrow",
        from:4,
        next:6
    },{
        id:5,
        code:"call002",
        type:"node",
        version:1,
        desc:"desc call002",
        func:{
            input:["R001","T002"],
            body:"syncAjax('http://xx/',{R001:R001,T002:T002})",
            output:"call002"
        },
        x:450,
        y:100
    },{
        id:56,
        code:"arrow005",
        type:"arrow",
        from:5,
        next:6
    },{
        id:6,
        code:"reduce001",
        type:"node",
        desc:"how to reduce",
        func:{
            input:["T002","call002"],
            body:"{T002:T002,call002:call002}",
            output:"reduce001"
        },
        x:600,
        y:100
    },{
        id:12,
        code:"arrow998",
        type:"arrow",
        from:6,
        next:998
    },{
        id:998,
        code:"end",
        type:"node",
        x:750,
        y:100
    }]
}]

const reducer = (state=defaultState, action) =>{
    switch (action.type) {
        case "DONE": return {...state, fill:"green"}
        default: return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
