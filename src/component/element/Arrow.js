import {React} from 'src/common/react/Prelude';

const Arrow = ({code, start, end, stroke="#e3e3e3", schedule})=>{

    const {color, arrowHead} = ((s)=>{
        switch (s){
            case "fail": return {
                color:"red",
                arrowHead:"arrowHeadRed"
            };
            case undefined: return {
                color:"#e3e3e3",
                arrowHead:"arrowHeadWill"
            };
            default: return {
                color:"#bed742",
                arrowHead:"arrowHeadGreen"
            };
        }
    })(schedule)

    return <g>
        <path id="ProcessOnPath1010" d={"M"+start.x+" "+start.y+"L"+end.x+" "+end.y} stroke={color} strokeWidth="2.0" strokeDasharray="none" fill="none" markerEnd={"url(#"+arrowHead+")"}/>
        <g id="ProcessOnG1007" transform="matrix(1.0,0.0,0.0,1.0,0,5)">
            <text id="ProcessOnText1008" className="noselect" fill="#000000" fontSize="13" x={ start.x+(end.x-start.x)/2 } y={ start.y+(end.y-start.y)/2-10 }  fontFamily="微软雅黑" fontWeight="normal" fontStyle="normal" textDecoration="none" family="微软雅黑" textAnchor="middle" size="13">{code}</text>
        </g>
    </g>
}

export default Arrow