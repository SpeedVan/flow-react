import { React, connect, /*dispatchWapper*/ } from '@/common/react/Prelude';

const changeColor = state => ({type: "NODE_CLICK",payload: state})

const mouseDown = state => ({type:"NODE_MOUSE_DOWN",payload:state})

const mouseMove = ({id, e, width, height}) => ({
    type: "NODE_MOUSE_MOVE_AFTER_DOWN",
    payload: {id: id, x: e.nativeEvent.offsetX-width/2, y: e.nativeEvent.offsetY-height/2}
})

const mouseUp = state => ({type: "NODE_MOUSE_UP", payload:state})

const Node = ({id, width=100, height=80, text, x, y, fill="#ffffff", changeColor, mouseDown, mouseUp, isOnMouseDown=false, mouseMove}) => {
    return <g id="ProcessOnG1005"  transform={"matrix(1.0,0.0,0.0,1.0," + x + "," + y + ")"} opacity="1.0" onMouseDown={()=>mouseDown({id:id})} onMouseUp={()=>mouseUp({id:id})} onClick={()=>changeColor({id:id})} onMouseMove={isOnMouseDown?e=>mouseMove({id:id,e:e,width:width,height:height}):undefined}>
        <path id="ProcessOnPath1006"
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="#000000" stroke-width="2.0" stroke-dasharray="none" opacity="1.0" fill={fill}/>
        <g id="ProcessOnG1007" transform="matrix(1.0,0.0,0.0,1.0,0,5)">
            <text id="ProcessOnText1008" fill="#000000" font-size="13" x={width/2} y={height/2} font-family="微软雅黑" font-weight="normal" font-style="normal" text-decoration="none" family="微软雅黑" text-anchor="middle" size="13">{text+(mouseMove?"Y":"N")}</text></g>
    </g>
}
// const mapStateToProps = (state) => (state)
// export const reducer = (state={fill:"#ffffff"}, action) =>{
//     switch (action.type) {
//         case "DONE": return {...state, fill:"green"}
//         default: return state
//     }
// }

// const dispatchChangeColor = dispatch => state => dispatch({
//     type: "NODE_CLICK",
//     payload: state
// })
// export default connect()(dispatchWapper({changeColor:dispatchChangeColor})(Node))
export default connect(s=>s,{changeColor:changeColor, mouseDown:mouseDown, mouseMove:mouseMove, mouseUp:mouseUp, dispatch:d=>d})(Node)