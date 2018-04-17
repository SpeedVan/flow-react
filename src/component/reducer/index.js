import {jsonExtend} from 'src/common/json/index';
import {events as NodeEvents} from 'src/component/element/Node';
import {events as FlowEvents} from 'src/component/element/Flow';



const result =jsonExtend({}, NodeEvents, FlowEvents);
export default result;