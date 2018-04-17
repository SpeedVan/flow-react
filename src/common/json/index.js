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

module.exports = {
    jsonExtend:jsonExtend,
    json2KeyVal:json2KeyVal,
    jsonArrayMap:jsonArrayMap,
    jsonForeach:jsonForeach,
    jsonCondReturn:jsonCondReturn,
    jsonMap:jsonMap,
    jsonReduce:jsonReduce,
    jsonFilter:jsonFilter,
    jsonInc:jsonInc
}