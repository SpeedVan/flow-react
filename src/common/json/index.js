/**
 * 这函数是json扩展/合并函数，相同key后面覆盖前面，
 * {A:a,B:b}->{B:b1, C:c}->{A:a,B:b1,C:c}
 * @returns {*}
 */
const jsonExtend = function(){
    if(arguments.length===1) return arguments[0];
    else if(arguments.length===2) return jsonExtendForOne(arguments[0],arguments[1]);
    else if(arguments.length>2) return jsonExtendOverOne(...arguments);
    else return {};
}

const jsonExtendForOne = ({...p1}, {...p2}) => ({...p1,...p2})

const jsonExtendOverOne = function(){
    var result = {};
    for(var i=0;i<arguments.length;i++){
        result = jsonExtendForOne(result, arguments[i]);
    }
    return result;
}
//

/**
 * 柯里化json映射函数，把json的key、value对{key,val}，通过高阶f映射新的{key1,val1}，返回新的json
 * ({key,val})=>({key:A,val:B})  -> {key:val} -> {A:B}
 * @param f
 */
const jsonMap = f => json =>{
    var result = {}
    for(var k in json){
        const {key,val} = f({key:k,val:json[k]})
        result[key] = val
    }
    return result;
}

const jsonForeach = f => json =>{
    for(var k in json){
        f({key:k,val:json[k]})
    }
}

const jsonCondReturn = (f1, f2, def=undefined) => json => {
    for(var k in json){
        const param = {key:k,val:json[k]};
        if(f1(param)) return f2(param);
    }
    return def;
}

const jsonReduce = (f,zero={}) => json =>{
    var result = zero;
    for(var k in json){
        result = f(result,{key:k, val:json[k]});
    }
    return result;
}

const jsonArrayMap = f => json => {
    var result = []
    for(var k in json){
        result.push(f({key:k,val:json[k]}));
    }
    return result;

}

const json2KeyVal = json=> jsonArrayMap(kv=>kv)(json)

const jsonFilter = f => json =>{
    var result = {};
    for(var k in json){
        var v = json[k];
        if(f({key:k,val:v})) result[k]=v;
    }
    return result;
}

const jsonInc = (json, key) => {
    if(json[key]===null||json[key]===undefined)
        json[key]=1;
    else
        json[key]++;
    return json;
}

/**
 * 这种通过全解析来判断是否json，对于大json是相当耗时的
 * @param jsonStr
 * @returns {boolean}
 */
const isJson = jsonStr => {
    if (typeof jsonStr === 'string') {
        try {
            JSON.parse(jsonStr);
            return true;
        } catch(e) {
            return false;
        }
    }
    return false
}

const parseJson = jsonStr => {
    if (typeof jsonStr === 'string') {
        try {
            return JSON.parse(jsonStr);
        } catch(e) {
            return false;
        }
    }
    return false
}

const tuple2json = (key,val)=>{
    var result = {}
    result[key] = val;
    return result;
}


module.exports = {
    jsonExtend:jsonExtend,
    json2KeyVal:json2KeyVal,
    jsonArrayMap:jsonArrayMap,
    jsonForeach:jsonForeach,
    jsonCondReturn:jsonCondReturn,
    jsonMap:jsonMap,
    jsonReduce:jsonReduce,
    jsonFilter:jsonFilter,
    jsonInc:jsonInc,
    isJson:isJson,
    parseJson:parseJson,
    tuple2json:tuple2json
}