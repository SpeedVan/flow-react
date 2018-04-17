import {React} from 'src/common/react/Prelude';

const Arrow = ({start, end, stroke="#000000"})=><path id="ProcessOnPath1010" d={"M"+start.x+" "+start.y+"L"+end.x+" "+end.y} stroke={stroke} strokeWidth="2.0" strokeDasharray="none" fill="none" markerEnd="url(#ProcessOnMarker1011)"/>

export default Arrow