import {React, myconnect} from '@/common/react/Prelude';
// import {separate} from '@/common/collection/index';
import Node from '@/component/element/Node';
import Arrow from '@/component/element/Arrow';
import {jsonArrayMap} from '@/common/json/index';

const Flow = ({id, traceId, data, dragEnterComponent, mouseUp, componentDragEnter, componentDragLeave})=>{
    const {nodes, arrows} = data
    return <div >
        <svg onclick={()=>alert("click")} onMouseUp={dragEnterComponent?e=>mouseUp(e,dragEnterComponent):undefined}  onDragEnter={componentDragEnter} onDragLeave={componentDragLeave}
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id={id+"#"+traceId} viewBox="-5.0 -5.0 1200.0 400.0" width="1200.0" height="400.0">
            <defs id="ProcessOnDefs1001">
                <marker id="ProcessOnMarker1011" markerUnits="userSpaceOnUse" orient="auto" markerWidth="16.23606797749979" markerHeight="10.550836550532098" viewBox="-1.0 -1.3763819204711736 16.23606797749979 10.550836550532098" refX="14" refY="3.8990363547948754">
                    <path id="ProcessOnPath1012" d="M12.0 3.8990363547948754L0.0 7.798072709589751V0.0Z" stroke="#323232" stroke-width="2.0" fill="#323232" transform="matrix(1.0,0.0,0.0,1.0,0.0,0.0)"/>
                </marker>
            </defs>
            <g id="ProcessOnG1002" x={0} y={0}>
                <g id="ProcessOnG1004">
                    {
                        jsonArrayMap(({key,val})=><Node id={key} {...val}/>)(nodes)
                    }
                </g>
                <g id="ProcessOnG1009">
                    {
                        jsonArrayMap(({key,val})=><Arrow id={key} {...val}/>)(arrows)
                    }
                </g>
            </g>
        </svg>
    </div>
}


const componentDragEnter = e => ({type:"COMPONENT_DRAG_ENTER", payload:{e:e, component:"node"}})
const componentDragEnterReducer = (state, {e,component})=>{
    //todo 根据事件把拖动组件放进容数据
    
    console.log(e.dataTransfer.getData("text"));
    console.log(component);
    return state;
}
const componentDragLeave = e => ({type:"COMPONENT_DRAG_LEAVE", payload:{e:e}})
const componentDragLeaveReducer = (state, {e}) =>{
    //todo 根据事件把指定容器中拖动数据全部清除
    return state;
}


const mouseUp = (e,component) =>({type:"FLOW_MOUSE_UP", payload:{e:e, component:component}})
const mouseUpReducer = (state, {e,component})=>{
    console.log(e);
    console.log(component)
    return state;
}

export const events = {
    "FLOW_MOUSE_UP":{
        reducer:mouseUpReducer,
        dispatch:{mouseUp}
    },
    "COMPONENT_DRAG_ENTER": {
        reducer:componentDragEnterReducer,
        dispatch:{componentDragEnter}
    },
    "COMPONENT_DRAG_LEAVE": {
        reducer:componentDragLeaveReducer,
        dispatch:{componentDragLeave}
    }
}

export default myconnect(s=>s,events)(Flow)