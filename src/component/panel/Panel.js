import FlowPanel from './FlowPanel';
const {React} = require('@/common/react/Prelude');

export default (props)=>props.data.map(i=><FlowPanel data={i}/>)