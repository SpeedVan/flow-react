const jsonMap = f => json =>{
    var result = []
    for(var key in json){
        result.push(f(key,json[key]))
    }
    return result;
}

const json2KeyVal = jsonMap((k,v)=>({key:k,val:v}))

const jsonFilter = f => json =>{
    var result = {};
    for(var key in json){
        var val = json[key];
        if(f(key,val)) result[key]=val;
    }
    return result;
}

const jsonInc = (json, key) => {
    if(json[key]==null||json[key]==undefined)
        json[key]=1;
    else
        json[key]++;
    return json;
}

module.exports = {
    json2KeyVal:json2KeyVal,
    jsonMap:jsonMap,
    jsonFilter:jsonFilter,
    jsonInc:jsonInc
}