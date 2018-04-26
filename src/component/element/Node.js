import { React, myconnect, identity } from 'src/common/react/Prelude';
import { tuple2json, jsonExtend, jsonMap } from 'src/common/json';
import Schedule from 'src/component/icon/Schedule'


const Node = ({id, width=100, height=80, text, x, y, fill="#ffffff", mouseDown, schedule, selected}) => {
    const dd = 5;
    const dw = 1;
    return <g id={"node_"+id}  transform={"translate(" + x + "," + y + ")"} opacity="1.0">
        <path id={"node_bottom_"+id}
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="#e3e3e3" strokeWidth="2.0" strokeDasharray="none" opacity="1.0" fill={fill}/>
        <path id={"node_schedule_"+id}
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="#858585" strokeWidth="2.0" strokeDasharray={"40%"} strokeDashoffset={(40*(1-(schedule||0)))+"%"} opacity="1.0" fill={fill}/>
        <Schedule x={75} y={5} schedule={schedule} />
        <text id="ProcessOnText1008" className="noselect" fill="#000000" fontSize="13" x={width/2} y={height/2} fontFamily="微软雅黑" fontWeight="normal" fontStyle="normal" textDecoration="none" family="微软雅黑" textAnchor="middle" size="13">{text}</text>
        <path id={"node_active_select_"+id}
              d={"M-"+dd+".0 "+dd+".0Q-"+dd+".0 -"+dd+".0 "+dd+".0 -"+dd+".0L"+(width-dd)+" -"+dd+".0Q"+(width+dd)+" -"+dd+".0 "+(width+dd)+" "+dd+".0L"+(width+dd)+" "+(height-dd)+"Q"+(width+dd)+" "+(height+dd)+" "+(width-dd)+" "+(height+dd)+"L"+dd+".0 "+(height+dd)+"Q-"+dd+".0 "+(height+dd)+" -"+dd+".0 "+(height-dd)+"L-"+dd+".0 "+dd+".0Z"}
              stroke="#858585" strokeWidth={dw} fill={"none"} opacity={selected?1:0}/>
        <path id={"node_active_layer_"+id}
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="none" opacity="0" onMouseDown={e=>mouseDown({id:id, e:e})}/>
    </g>
}

const mountFollowMouse = (state, {id, e}) => {
    e.stopPropagation();
    const {select, nodes, ...p} = state.flowsData[0];
    //通过排序（越后图层越高），实现提顶
    const nodesData = Array.from(nodes)
    const newNodesData = nodesData.sort((a,b)=>{
        if(id === b[0]){
            return -1;
        }else if(id ===a[0]){
            return 1;
        }else{
            return 0;
        }
    });
    const newNodes = new Map(newNodesData);

    //为了实现在node上的点击位置跟随鼠标（非中点跟随），做位置记录准备
    const {offsetX, offsetY, target} = e.nativeEvent;
    const matrix = target.parentElement.transform.baseVal.consolidate().matrix;
    //ox和oy为相对于node所在xy的点击位置
    const ox = offsetX-matrix.e;
    const oy = offsetY-matrix.f;

    // const onlyOne = Object.keys(select).length === 1;
    const newSelect = jsonMap(({key,val})=>({key:key,val:{ox:offsetX-newNodes.get(key).x, oy:offsetY-newNodes.get(key).y}}))(select);
    const shiftSelect = jsonExtend(e.nativeEvent.shiftKey||Object.keys(select).indexOf(id)!==-1?newSelect:{},tuple2json(id,{ox:ox, oy:oy}));


    return {flowsData:[{...p, nodes:newNodes, select:shiftSelect}]};
}

const mstp = state => {
    return state;
}

export const events = {
    "NODE_MOUSE_DOWN": {
        reducer:mountFollowMouse,
        dispatch:{mouseDown:identity}
    }
}

export default myconnect(mstp,events)(Node);