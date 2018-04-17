import React from 'react';
import { createStore , combineReducers } from 'redux';
import { connect } from 'react-redux'
import { jsonKeyValMap } from 'src/common/json'
import { jsonReduce, jsonExtend } from 'src/common/json/index';

const elem = React.createElement;
// const clazz = React.createClass;

const dispatchWapper = dispatchFunc => component => ({dispatch, ...p}) => component({...p, ...jsonKeyValMap((key,f)=>({key:key,val:f(dispatch)}))(dispatchFunc)})

const myconnect = (mstp, events, mp)=>(component) => {
    const mdtp = jsonReduce((r,{key,val})=>jsonExtend(r,val.dispatch))(events);
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
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export { React, elem}

export { createStore,combineReducers }

export { dispatchWapper, connect, myconnect, generateUUID }

