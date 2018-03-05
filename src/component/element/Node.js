import { React,connect } from '@/common/react/Prelude';

const changeColor = (dispatch, getState) =>{
    dispatch({
        type: "DONE"
    })
}

const Node = ({width, height, text, x, y, fill, changeColor}) => {
    return <g id="ProcessOnG1005" transform={"matrix(1.0,0.0,0.0,1.0," + x + "," + y + ")"} opacity="1.0" onClick={changeColor}>
        <path id="ProcessOnPath1006"
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="#000000" stroke-width="2.0" stroke-dasharray="none" opacity="1.0" fill={fill}/>
        <g id="ProcessOnG1007" transform="matrix(1.0,0.0,0.0,1.0,0,5)">
            <text id="ProcessOnText1008" fill="#000000" font-size="13" x={width/2} y={height/2} font-family="微软雅黑" font-weight="normal" font-style="normal" text-decoration="none" family="微软雅黑" text-anchor="middle" size="13">{text}</text></g>
    </g>
}

Node.defaultProps = {
    width: 100,
    height: 80,
    fill: "#ffffff"
}
const mapStateToProps = (state) => (state)
export const reducer = (state={fill:"#ffffff"}, action) =>{
    switch (action.type) {
        case "DONE": return {...state, fill:"green"}
        default: return state
    }
}



export default connect(
    mapStateToProps,
    { changeColor:()=>changeColor }
)(Node)