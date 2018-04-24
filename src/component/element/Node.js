import { React, myconnect, identity } from 'src/common/react/Prelude';
import { tuple2json, jsonExtend } from 'src/common/json';
import Schedule from 'src/component/icon/Schedule'

const Node = ({id, width=100, height=80, text, x, y, fill="#ffffff", mouseDown, schedule}) => {
    return <g id={"node_"+id}  transform={"translate(" + x + "," + y + ")"} opacity="1.0" onMouseDown={e=>mouseDown({id:id, e:e})}>
        <path id={"node_bottom_"+id}
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="#e3e3e3" strokeWidth="2.0" strokeDasharray="none" opacity="1.0" fill={fill}/>
        <path id={"node_schedule_"+id}
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="#858585" strokeWidth="2.0" strokeDasharray={"40%"} strokeDashoffset={(40*(1-(schedule||0)))+"%"} opacity="1.0" fill={fill}/>
        <Schedule x={75} y={5} schedule={schedule} />
        <g id="ProcessOnG1007" transform="matrix(1.0,0.0,0.0,1.0,0,5)">
            <text id="ProcessOnText1008" className="noselect" fill="#000000" fontSize="13" x={width/2} y={height/2} fontFamily="微软雅黑" fontWeight="normal" fontStyle="normal" textDecoration="none" family="微软雅黑" textAnchor="middle" size="13">{text}</text></g>
    </g>
}

const mountFollowMouse = (state, {id, e}) => {
    const {select, ...p} = state.flowsData[0];
    const {offsetX, offsetY, target} = e.nativeEvent;
    const matrix = target.parentElement.transform.baseVal.consolidate().matrix;
    const ox = offsetX-matrix.e;
    const oy = offsetY-matrix.f;
    return {flowsData:[{...p, select:jsonExtend(select,tuple2json(id,{ox:ox, oy:oy}))}]};
}

export const events = {
    "NODE_MOUSE_DOWN": {
        reducer:mountFollowMouse,
        dispatch:{mouseDown:identity}
    }
}


export default myconnect(identity,events)(Node);