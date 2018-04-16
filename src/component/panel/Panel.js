import FlowPanel from './FlowPanel';
const {React, connect} = require('@/common/react/Prelude');
//meaning flows



const mapStateToProps = state => ({data:state.flowsData})

export default connect(
    mapStateToProps,
)((props)=>props.data.map(i=><FlowPanel data={i}/>))