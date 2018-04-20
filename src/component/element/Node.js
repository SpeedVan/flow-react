import { React, myconnect, identity } from 'src/common/react/Prelude';
import { jsonMap } from 'src/common/json/index';

const Node = ({id, width=100, height=80, text, x, y, fill="#ffffff", mouseDown, mouseUp, isOnMouseDown=false, mouseMove, doPercent=0}) => {
    return <g id="ProcessOnG1005"  transform={"matrix(1.0,0.0,0.0,1.0," + x + "," + y + ")"} opacity="1.0" onMouseDown={()=>mouseDown({id:id})} onMouseUp={()=>mouseUp({id:id})} onMouseMove={isOnMouseDown?e=>mouseMove({id:id,e:e,width:width,height:height}):undefined}>
        <path id="ProcessOnPath1006"
              d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
              stroke="#e3e3e3" strokeWidth="2.0" strokeDasharray="none" opacity="1.0" fill={fill}/>
        <g id="animate">
            <path id="ProcessOnPath1008"
                  d={"M0.0 5.0Q0.0 0.0 5.0 0.0L"+(width-5)+" 0.0Q"+width+" 0.0 "+width+" 5.0L"+width+" "+(height-5)+"Q"+width+" "+height+" "+(width-5)+" "+height+"L5.0 "+height+"Q0.0 "+height+" 0.0 "+(height-5)+"L0.0 5.0Z"}
                  stroke="#858585" strokeWidth="2.0" strokeDasharray={"40%"} strokeDashoffset={(40*(1-doPercent))+"%"} opacity="1.0" fill={fill}>
                <animate attributeName="stroke-dashoffset" from="40%" to="0%" begin="0s" dur="5s" repeatCount="indefinite" />
            </path>
        </g>
        <g id="ProcessOnG1007" transform="matrix(1.0,0.0,0.0,1.0,0,5)">
            <text id="ProcessOnText1008" fill="#000000" fontSize="13" x={width/2} y={height/2} fontFamily="微软雅黑" fontWeight="normal" fontStyle="normal" textDecoration="none" family="微软雅黑" textAnchor="middle" size="13">{text}</text></g>
    </g>
}

const unmountFollowMouse = (state, {id}) => {
    const {nodes, ...p} = state.flowsData[0];
    return {flowsData:[{...p, nodes:jsonMap(kv=>kv.key === id?({key:kv.key,val:{...kv.val, isOnMouseDown: false}}):kv)(nodes)}]};
}

const mountFollowMouse = (state, {id}) => {
    const {nodes, ...p} = state.flowsData[0];
    return {flowsData:[{...p, nodes:jsonMap(kv=>kv.key === id?({key:kv.key,val:{...kv.val, isOnMouseDown: true}}):kv)(nodes)}]};
}

const followMouse = (state, {id, x, y}) => {
    const {nodes, arrows, ...p} = state.flowsData[0];

    let willChangeArrowsIds = new Set();
    const addIds_SE = json => {//side_effect
        if(json.from)json.from.forEach(i=>willChangeArrowsIds.add(i));
        if(json.to)json.to.forEach(i=>willChangeArrowsIds.add(i));
        return json;
    }
    const nsData = jsonMap((kv)=>kv.key === id?({key:kv.key,val:addIds_SE({...kv.val, x:x, y:y})}):kv)(nodes);

    let asData ={}
    willChangeArrowsIds.forEach(id=>{
        const arrow = arrows[id];
        const fromNode = nsData[arrow.from];
        const toNode = nsData[arrow.next];
        asData[id]={...arrow, start:{x:fromNode.x+100,y:fromNode.y+40}, end:{x:toNode.x,y:toNode.y+40}};
    })

    return {flowsData:[{...p, nodes:nsData, arrows:{...arrows, ...asData}}]};
}

export const events = {
    "NODE_MOUSE_DOWN": {
        reducer:mountFollowMouse,
        dispatch:{mouseDown:identity}
    },
    "NODE_MOUSE_UP": {
        reducer:unmountFollowMouse,
        dispatch:{mouseUp:identity}
    },
    "NODE_MOUSE_MOVE_AFTER_DOWN": {
        reducer:followMouse,
        dispatch:{mouseMove:({id, e, width, height})=>({id: id, x: e.nativeEvent.offsetX-width/2, y: e.nativeEvent.offsetY-height/2})}
    }
}


export default myconnect(identity,events)(Node);