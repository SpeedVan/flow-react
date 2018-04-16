import R from 'react';
import { createStore as createStore_, combineReducers as combineReducers_ } from 'redux';
import { connect as connect_ } from 'react-redux'
import { jsonKeyValMap } from '@/common/json'

export const elem = R.createElement

export const React = R

export const createStore = createStore_

export const combineReducers = combineReducers_

export const clazz = R.createClass

export const connect = connect_

export const dispatchWapper = dispatchFunc => component => ({dispatch, ...p}) => component({...p, ...jsonKeyValMap((key,f)=>({key:key,val:f(dispatch)}))(dispatchFunc)})