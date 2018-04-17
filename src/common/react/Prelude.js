import React from 'react';
import { createStore , combineReducers } from 'redux';
import { connect } from 'react-redux'
import { jsonReduce, jsonExtend, jsonMap } from 'src/common/json'

const elem = React.createElement;


// const dispatchChangeColor = dispatch => state => dispatch({
//     type: "NODE_CLICK",
//     payload: state
// })
// export default connect()(dispatchWapper({changeColor:dispatchChangeColor})(Node))
const dispatchWapper = dispatchFunc => component => ({dispatch, ...p}) => component({...p, ...jsonMap((key,f)=>({key:key,val:f(dispatch)}))(dispatchFunc)})

const myconnect2 = (mstp, events, mp)=>(component) => {
    const mdtp = jsonReduce((r,{key,val})=>jsonExtend(r,val.dispatch))(events);
    return connect(mstp, mdtp, mp)(component);
}
//state=> {type:,payload:state}
const myconnect = (mstp, events, mp)=>(component) => {
    const mdtp = jsonReduce((r,{key,val})=>jsonExtend(r,jsonMap(kv=>({key:kv.key,val:s=>({type:key,payload:kv.val(s)})}))(val.dispatch)))(events);
    return connect(mstp, mdtp, mp)(component);
}

const generateUUID = () => { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
}

//同一性
const identity = x=>x

export { React, elem}

export { createStore,combineReducers }

export { dispatchWapper, connect, myconnect, myconnect2, generateUUID, identity }

