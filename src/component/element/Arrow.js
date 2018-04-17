import {React,connect} from 'src/common/react/Prelude';

const Arrow = props=><path id="ProcessOnPath1010" d={"M"+props.start.x+" "+props.start.y+"L"+props.end.x+" "+props.end.y} stroke={props.stroke} stroke-width="2.0" stroke-dasharray="none" fill="none" marker-end="url(#ProcessOnMarker1011)"/>

Arrow.defaultProps = {
    stroke: "#000000"
}

const mapStateToProps = (state) => (state)
export const reducer = (state={stroke:"#000000"}, action) =>{
    switch (action.type) {
        case "DONE": return {...state, stroke:"green"}
        default: return state
    }
}

export default connect(
    mapStateToProps
)(Arrow)