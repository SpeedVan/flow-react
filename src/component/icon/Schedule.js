import { React } from 'src/common/react/Prelude';

const Schedule = ({schedule, x, y}) => {
    // console.log(schedule)
    // console.log(schedule!==undefined&&0<=schedule&&schedule<1);
    const {circleStyle, inner} = ((s)=>{
        switch (s){
            case "fail": return {
                circleStyle:{fill:"#D75A4A"},
                inner:<g>
                    <polyline style={{fill:"none",stroke:"#FFFFFF",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:10}} points="6,14 10,10 14,6"/>
                    <polyline style={{fill:"none",stroke:"#FFFFFF",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:10}} points="6,6 10,10 14,14"/>
                </g>
            };
            case 1: return {
                circleStyle:{fill:"#25AE88"},
                inner:<g>
                    <polyline style={{fill:"none",stroke:"#FFFFFF",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:10}} points="15,6 9,13 5,10"/>
                </g>
            };
            case undefined: return {
                circleStyle:{fill:"#ffffff",stroke:"#e3e3e3"},
                inner:<g>
                </g>
            };
            default: return {
                circleStyle:{fill:"#ffffff",stroke:"#e3e3e3"},
                inner:<g>
                    <circle style={{fill:"#ffffff",stroke:"#858585"}} cx="10" cy="10" r="10" strokeDasharray={"10%"} strokeDashoffset={"0%"}>
                        <animate attributeName="stroke-dashoffset" from="10%" to="0%" begin="0s" dur="5s" repeatCount="indefinite" />
                    </circle>
                </g>
            };
        }
    })(schedule)

    return <g transform={"matrix(1.0,0.0,0.0,1.0,"+x+","+y+")"}>
        <circle style={circleStyle} cx="10" cy="10" r="10"/>
        {inner}
    </g>
}

export default Schedule