import { React } from 'src/common/react/Prelude';

const Schedule = ({schedule, x, y, r=10}) => {
    // console.log(schedule)
    // console.log(schedule!==undefined&&0<=schedule&&schedule<1);

    const C = 2*Math.PI*r;
    const lens = (len1, len2, len3) => len1+" "+len2+" "+len3

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
                    <circle style={{fill:"#ffffff",stroke:"#858585"}} transform={"rotate(-90,"+r+","+r+")"} cx={r} cy={r} r={r} strokeDasharray={lens(C,C,1)} strokeDashoffset={2*C}>
                        <animate attributeName="stroke-dasharray" values={lens(C,C,1)+";"+lens(C,C+C/2,20)+";"+lens(C,C*2,1)} dur="2s" repeatCount="indefinite" />
                        {/*<animate attributeName="stroke-dasharray" from={lens(C,C+C/2,C)} to={lens(C,2*C,1)} begin="2s" dur="2s" repeatCount="indefinite" />*/}
                    </circle>
                </g>
            };
        }
    })(schedule)

    return <g transform={"translate("+x+","+y+")"}>
        <circle style={circleStyle} cx="10" cy="10" r="10"/>
        {inner}
    </g>
}

export default Schedule