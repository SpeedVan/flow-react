import React from 'react';
import { createStore , combineReducers } from 'redux';
import { connect } from 'react-redux'
import { jsonKeyValMap } from '@/common/json'
import { jsonReduce, jsonExtend } from '@/common/json/index';

const elem = React.createElement;
// const clazz = React.createClass;

const dispatchWapper = dispatchFunc => component => ({dispatch, ...p}) => component({...p, ...jsonKeyValMap((key,f)=>({key:key,val:f(dispatch)}))(dispatchFunc)})

const myconnect = (mstp, events, mp)=>(component) => {
    const mdtp = jsonReduce((r,{key,val})=>jsonExtend(r,val.dispatch))(events);
    return connect(mstp, mdtp, mp)(component);
}


export { React, elem}

export { createStore,combineReducers }

export { dispatchWapper, connect, myconnect }

