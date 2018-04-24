import {React, myconnect, generateUUID, identity} from 'src/common/react/Prelude';
import Node from 'src/component/element/Node';
import Arrow from 'src/component/element/Arrow';
import { jsonArrayMap, jsonExtend, parseJson, jsonMap } from 'src/common/json';

const Flow = ({id, traceId, data, dragEnterComponent, componentDrop, componentDragEnter, componentDragLeave, mouseUp, mouseMove})=>{
    const {nodes, arrows} = data
    return <div>
        <svg onDragOver={e=>{e.preventDefault();}} onDrop={componentDrop}  onDragEnter={e=>componentDragEnter} onDragLeave={componentDragLeave} onMouseUp={mouseUp} onMouseMove={mouseMove}
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id={id+"#"+traceId} viewBox="-5.0 -5.0 1200.0 400.0" width="1200.0" height="400.0">
            <defs id="ProcessOnDefs1001">
                <marker id="arrowHeadWill" markerUnits="userSpaceOnUse" orient="auto" markerWidth="16.23606797749979" markerHeight="10.550836550532098" viewBox="-1.0 -1.3763819204711736 16.23606797749979 10.550836550532098" refX="14" refY="3.8990363547948754">
                    <path id="ProcessOnPath1012" d="M12.0 3.8990363547948754L0.0 7.798072709589751V0.0Z" stroke="#e3e3e3" strokeWidth="2.0" fill="#e3e3e3" transform="matrix(1.0,0.0,0.0,1.0,0.0,0.0)"/>
                </marker>
                <marker id="arrowHeadGreen" markerUnits="userSpaceOnUse" orient="auto" markerWidth="16.23606797749979" markerHeight="10.550836550532098" viewBox="-1.0 -1.3763819204711736 16.23606797749979 10.550836550532098" refX="14" refY="3.8990363547948754">
                    <path id="ProcessOnPath1013" d="M12.0 3.8990363547948754L0.0 7.798072709589751V0.0Z" stroke="#bed742" strokeWidth="2.0" fill="#bed742" transform="matrix(1.0,0.0,0.0,1.0,0.0,0.0)"/>
                </marker>
                <marker id="arrowHeadRed" markerUnits="userSpaceOnUse" orient="auto" markerWidth="16.23606797749979" markerHeight="10.550836550532098" viewBox="-1.0 -1.3763819204711736 16.23606797749979 10.550836550532098" refX="14" refY="3.8990363547948754">
                    <path id="ProcessOnPath1014" d="M12.0 3.8990363547948754L0.0 7.798072709589751V0.0Z" stroke="red" strokeWidth="2.0" fill="red" transform="matrix(1.0,0.0,0.0,1.0,0.0,0.0)"/>
                </marker>
            </defs>
            <g id="ProcessOnG1002" x={0} y={0}>
                <g id="ProcessOnG1004">
                    {
                        jsonArrayMap(({key,val})=><Node id={key} key={key} {...val}/>)(nodes)
                    }
                </g>
                <g id="ProcessOnG1009">
                    {
                        jsonArrayMap(({key,val})=><Arrow id={key} key={key} {...val}/>)(arrows)
                    }
                </g>
            </g>
        </svg>
    </div>
}


const componentDragEnterReducer = (state, {e,component})=>{
    const {select, ...p} = state.flowsData[0];
    //todo 根据事件把拖动组件放进容数据

    // console.log(e.dataTransfer.getData("Text"));
    // console.log(component);
    return {flowsData: [{...p, select: []}]};
}
const componentDragLeaveReducer = (state, e) =>{
    //todo 根据事件把指定容器中拖动数据全部清除
    return state;
}


const componentDropReducer = (state, e)=>{
    const componentData = parseJson(e.dataTransfer.getData("Text"));
    if(componentData!==false) {
        const uuid = generateUUID();
        const result = {}
        result[uuid] = jsonExtend(componentData, {
            id: uuid,
            x: e.nativeEvent.offsetX - componentData.width / 2,
            y: e.nativeEvent.offsetY - componentData.height / 2
        });
        console.log(result);

        const {nodes, ...p} = state.flowsData[0];
        return {flowsData: [{...p, nodes: jsonExtend(nodes, result)}]};
    }else{
        return state;
    }
}

const unmountFollowMouse = (state, e)=>{
    const {select, ...p} = state.flowsData[0];
    return {flowsData:[{...p, select:{}}]};
}

const followMouse = (state, {x, y}) => {
    const {select, nodes, arrows, ...p} = state.flowsData[0];

    if(Object.keys(select).length>0) {
        let willChangeArrowsIds = new Set();
        const addIds_SE = json => {//side_effect
            if (json.from) json.from.forEach(i => willChangeArrowsIds.add(i));
            if (json.to) json.to.forEach(i => willChangeArrowsIds.add(i));
            return json;
        }
        const nsData = jsonMap((kv) => Object.keys(select).indexOf(kv.key) !== -1 ?
            ({key: kv.key, val: addIds_SE({...kv.val, x: x - select[kv.key].ox, y: y - select[kv.key].oy})})
            : kv)(nodes);

        let asData = {}
        willChangeArrowsIds.forEach(id => {
            const arrow = arrows[id];
            const fromNode = nsData[arrow.from];
            const toNode = nsData[arrow.next];
            asData[id] = {
                ...arrow,
                start: {x: fromNode.x + 100, y: fromNode.y + 40},
                end: {x: toNode.x, y: toNode.y + 40}
            };
        })

        return {flowsData: [{...p, nodes: nsData, arrows: {...arrows, ...asData}, select: select}]};
    } else {
        return state
    }
}

export const events = {
    "COMPONENT_DRAG_ENTER": {
        reducer:componentDragEnterReducer,
        dispatch:{componentDragEnter:e => ({e:e, component:"node"})}
    },
    "COMPONENT_DRAG_LEAVE": {
        reducer:componentDragLeaveReducer,
        dispatch:{componentDragLeave:identity}
    },
    "COMPONENT_DROP":{
        reducer:componentDropReducer,
        dispatch:{componentDrop:identity}
    },
    "FLOW_MOUSE_UP": {
        reducer:unmountFollowMouse,
        dispatch:{mouseUp:identity}
    },
    "FLOW_NODE_MOUSE_MOVE_AFTER_DOWN": {
        reducer:followMouse,
        dispatch:{mouseMove:(e)=>({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})}
    }
}

export default myconnect(identity,events)(Flow)