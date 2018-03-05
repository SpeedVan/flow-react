import {React, combineReducers} from '@/common/react/Prelude';
import {headTail, concat, separate} from '@/common/collection/index';
import {json2KeyVal, jsonMap, jsonInc} from '@/common/json/index';
import Node,{reducer as NodeReducer} from '@/component/element/Node';
import Arrow,{reducer as ArrowReducer} from '@/component/element/Arrow';

const Flow = ({data})=>{
    const jsonData = data.elems.reduce((r,i)=>{
            if(i["type"]=="node"){
                const leftMP = {x:i.x,y:i.y+40}
                const rightMP = {x:i.x+100,y:i.y+40}
                const topMP = {x:i.x-75,y:i.y}
                const bottomMP = {x:i.x-75,y:i.y-80}
                i["leftMP"] = leftMP;
                i["rightMP"] = rightMP;
                i["topMP"] = topMP;
                i["bottomMP"] = bottomMP;
            }
            r[i["id"]]=i;
            return r;
        },
        {}
    );
    const {nodes, arrows} = separate({
        nodes:i=>i["type"]=="node",
        arrows:i=>i["type"]=="arrow"
    })(data.elems);
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="processonSvg1000" viewBox="-5.0 -5.0 1200.0 400.0" width="1200.0" height="400.0">
            <defs id="ProcessOnDefs1001">
                <marker id="ProcessOnMarker1011" markerUnits="userSpaceOnUse" orient="auto" markerWidth="16.23606797749979" markerHeight="10.550836550532098" viewBox="-1.0 -1.3763819204711736 16.23606797749979 10.550836550532098" refX="14" refY="3.8990363547948754">
                    <path id="ProcessOnPath1012" d="M12.0 3.8990363547948754L0.0 7.798072709589751V0.0Z" stroke="#323232" stroke-width="2.0" fill="#323232" transform="matrix(1.0,0.0,0.0,1.0,0.0,0.0)"/>
                </marker>
            </defs>
            <g id="ProcessOnG1002" x={0} y={0}>
                <g id="ProcessOnG1004">
                    {
                        nodes.map(i=><Node x={i.x} y={i.y} text={i.code}/>)
                    }
                </g>
                <g id="ProcessOnG1009">
                    {
                        arrows.map(i=><Arrow start={jsonData[String(i.from)]["rightMP"]} end={jsonData[String(i.next)]["leftMP"]}/>)
                    }
                </g>
            </g>

        </svg>
    </div>
}

const mapStateToProps = state => state

const defaultState = {
    data: {
        traceId:0,
        id:1,
        code:"WF001",
        version:1,
        desc:"desc xxxxxxxx",
        elems: {
            "0": {
                id: "0",
                code: "start",
                type: "node",
                x: 0,
                y: 100
            },
            "11": {
                id: "11",
                code: "arrow003",
                type: "arrow",
                from: "0",
                next: "2"
            },
            "2": {
                id: "2",
                code: "R001",
                type: "node",
                version: 1,
                desc: "desc R001",
                func: {
                    input: ["P001", "P002"],
                    body: "{'RULE0039':P001>1&&3>2,'RULE0089':P002>4}",
                    output: "R001"
                },
                x: 150,
                y: 100
            },
            "21": {
                id: "21",
                code: "arrow001",
                type: "arrow",
                func: {
                    input: ["R001"],
                    body: "R001.RULE0039==true",
                    output: "arrow001"
                },
                from: "2",
                next: "3"
            },
            "22": {
                id: "22",
                code: "arrow002",
                type: "arrow",
                func: {
                    input: ["R001"],
                    body: "R001.RULE0039!=true",
                    output: "arrow002"
                },
                from: "2",
                next: "4"
            },
            "3": {
                id: "3",
                code: "T001",
                type: "node",
                version: 3,
                desc: "desc T001",
                func: {
                    input: ["R001"],
                    body: "R001.RULE0039!=true?0:1",
                    output: "T001"
                },
                x: 300,
                y: 100
            },
            "4": {
                id: "4",
                code: "T002",
                type: "node",
                version: 10,
                desc: "desc T002",
                func: {
                    input: ["R001"],
                    body: "R001.RULE0039!=true?0:1",
                    output: "T002"
                },
                x: 300,
                y: 300
            },
            "51": {
                id: "51",
                code: "arrow003",
                type: "arrow",
                from: "3",
                next: "5"
            },
            "61": {
                id: "61",
                code: "arrow004",
                type: "arrow",
                from: "4",
                next: "6"
            },
            "5": {
                id: "5",
                code: "call002",
                type: "node",
                version: 1,
                desc: "desc call002",
                func: {
                    input: ["R001", "T002"],
                    body: "syncAjax('http://xx/',{R001:R001,T002:T002})",
                    output: "call002"
                },
                x: 450,
                y: 100
            },
            "56": {
                id: "56",
                code: "arrow005",
                type: "arrow",
                from: "5",
                next: "6"
            },
            "6": {
                id: "6",
                code: "reduce001",
                type: "node",
                desc: "how to reduce",
                func: {
                    input: ["T002", "call002"],
                    body: "{T002:T002,call002:call002}",
                    output: "reduce001"
                },
                x: 600,
                y: 100
            },
            "12": {
                id: "12",
                code: "arrow998",
                type: "arrow",
                from: "6",
                next: "998"
            },
            "998": {
                id: "998",
                code: "end",
                type: "node",
                x: 750,
                y: 100
            }
        }
    }
}

const defaultData = {
    traceId:0,
    id:1,
    code:"WF001",
    version:1,
    desc:"desc xxxxxxxx",
    elems:[{
        id:0,
        code:"start",
        type:"node",
        x:0,
        y:100
    },{
        id:11,
        code:"arrow003",
        type:"arrow",
        from:0,
        next:2
    },{
        id:2,
        code:"R001",
        type:"node",
        version:1,
        desc:"desc R001",
        func:{
            input:["P001","P002"],
            body:"{'RULE0039':P001>1&&3>2,'RULE0089':P002>4}",
            output:"R001"
        },
        x:150,
        y:100
    },{
        id:21,
        code:"arrow001",
        type:"arrow",
        func:{
            input:["R001"],
            body:"R001.RULE0039==true",
            output:"arrow001"
        },
        from:2,
        next:3
    },{
        id:22,
        code:"arrow002",
        type:"arrow",
        func:{
            input:["R001"],
            body:"R001.RULE0039!=true",
            output:"arrow002"
        },
        from:2,
        next:4
    },{
        id:3,
        code:"T001",
        type:"node",
        version:3,
        desc:"desc T001",
        func:{
            input:["R001"],
            body:"R001.RULE0039!=true?0:1",
            output:"T001"
        },
        x:300,
        y:100
    },{
        id:4,
        code:"T002",
        type:"node",
        version:10,
        desc:"desc T002",
        func:{
            input:["R001"],
            body:"R001.RULE0039!=true?0:1",
            output:"T002"
        },
        x:300,
        y:300
    },{
        id:51,
        code:"arrow003",
        type:"arrow",
        from:3,
        next:5
    },{
        id:61,
        code:"arrow004",
        type:"arrow",
        from:4,
        next:6
    },{
        id:5,
        code:"call002",
        type:"node",
        version:1,
        desc:"desc call002",
        func:{
            input:["R001","T002"],
            body:"syncAjax('http://xx/',{R001:R001,T002:T002})",
            output:"call002"
        },
        x:450,
        y:100
    },{
        id:56,
        code:"arrow005",
        type:"arrow",
        from:5,
        next:6
    },{
        id:6,
        code:"reduce001",
        type:"node",
        desc:"how to reduce",
        func:{
            input:["T002","call002"],
            body:"{T002:T002,call002:call002}",
            output:"reduce001"
        },
        x:600,
        y:100
    },{
        id:12,
        code:"arrow998",
        type:"arrow",
        from:6,
        next:998
    },{
        id:998,
        code:"end",
        type:"node",
        x:750,
        y:100
    }]
}

const initFlowData = (data=defaultData) => {
    const jsonData = data.elems.reduce((r,i)=>{
            if(i["type"]=="node"){
                const leftMP = {x:i.x,y:i.y+40}
                const rightMP = {x:i.x+100,y:i.y+40}
                const topMP = {x:i.x-75,y:i.y}
                const bottomMP = {x:i.x-75,y:i.y-80}
                i["leftMP"] = leftMP;
                i["rightMP"] = rightMP;
                i["topMP"] = topMP;
                i["bottomMP"] = bottomMP;
            }
            r[i["id"]]=i;
            return r;
        },
        {}
    );
    const {nodes, arrows} = separate({
        nodes:i=>i["type"]=="node",
        arrows:i=>i["type"]=="arrow"
    })(data.elems);
}

export const reducer = (state=defaultState, action) =>{
    const {type, payload} = action;
    switch (type) {
        case "FlowModify": return {...state, stroke:"green"}
        default: return state
    }
}

export default Flow