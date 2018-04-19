import {React, myconnect, generateUUID, identity} from 'src/common/react/Prelude';
import Node from 'src/component/element/Node';
import Arrow from 'src/component/element/Arrow';
import { jsonArrayMap, jsonExtend, parseJson } from 'src/common/json';

const Flow = ({id, traceId, data, dragEnterComponent, componentDrop, componentDragEnter, componentDragLeave})=>{
    const {nodes, arrows} = data
    return <div>
        <svg onDragOver={e=>{e.preventDefault();}} onDrop={componentDrop}  onDragEnter={e=>componentDragEnter} onDragLeave={componentDragLeave}
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id={id+"#"+traceId} viewBox="-5.0 -5.0 1200.0 400.0" width="1200.0" height="400.0">
            <defs id="ProcessOnDefs1001">
                <marker id="ProcessOnMarker1011" markerUnits="userSpaceOnUse" orient="auto" markerWidth="16.23606797749979" markerHeight="10.550836550532098" viewBox="-1.0 -1.3763819204711736 16.23606797749979 10.550836550532098" refX="14" refY="3.8990363547948754">
                    <path id="ProcessOnPath1012" d="M12.0 3.8990363547948754L0.0 7.798072709589751V0.0Z" stroke="#323232" strokeWidth="2.0" fill="#323232" transform="matrix(1.0,0.0,0.0,1.0,0.0,0.0)"/>
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
    //todo 根据事件把拖动组件放进容数据

    // console.log(e.dataTransfer.getData("Text"));
    // console.log(component);
    return state;
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
    }
}

export default myconnect(identity,events)(Flow)