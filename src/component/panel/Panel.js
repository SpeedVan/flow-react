import FlowPanel from './FlowPanel';
const {React, connect} = require('src/common/react/Prelude');
//meaning flows



const mapStateToProps = state => ({data:state.flowsData})

export default connect(
    mapStateToProps,
)((props)=>props.data.map(i=><FlowPanel key={i.id} data={i}/>))