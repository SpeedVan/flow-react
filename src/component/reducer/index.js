import {jsonExtend} from '@/common/json/index';
import {events as NodeEvents} from '@/component/element/Node';
import {events as FlowEvents} from '@/component/element/Flow';



const result =jsonExtend({}, NodeEvents, FlowEvents);
export default result;