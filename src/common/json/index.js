const jsonExtend = ({...p1}, {...p2}) => ({...p1,...p2})

const jsonMap = f => json =>{
    var result = {}
    for(var k in json){
        const {key,val} = f({key:k,val:json[k]})
        result[key] = val
    }
    return result;
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
    jsonMap:jsonMap,
    jsonReduce:jsonReduce,
    jsonFilter:jsonFilter,
    jsonInc:jsonInc
}