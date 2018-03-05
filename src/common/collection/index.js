const {json2KeyVal} = require('@/common/json/index');

const separate = (funcJSON) => arr =>{
    const kv = json2KeyVal(funcJSON);
    return kv.reduce(
        (r,{key,val})=>{r[key] = arr.filter(i=>val(i)); return r;},
        kv.reduce((r,{key,val})=>{r[key]=[]; return r;},{})//初始化为{key1:[],key2:[]...}
    )
}

const headTail = arr => {
    if (arr.length == 0) return ({head:null, tail:[]});
    const head = arr[0];
    const tail = arr.slice(1);
    return ({head: head, tail: tail});
}

const headTailMode = f => arr => {
    const {head, tail} = headTail(arr);
    if(head==null) return []
    return f(head, tail);
}

const argsHeadTailMode = f => (...arr) => headTailMode(f)(arr)

const setWith = (init, arr) => arr.reduce((r,i)=>r.contains(i)?r:r.concat([i]),init);

const set = arr => setWith([], arr);

const remove = (arr, e) => arr.reduce((r,i)=>e==i?r:r.concat([i]),[])

const union = (...arrs) => arrs.reduce((r,arr)=>setWith(r,arr),[]);

const intersection = argsHeadTailMode((head, tail) =>tail.reduce(setWith, head));

const complement = universe => (...arrs) => arrs.reduce((r,arr)=>arr.reduce((r2,i)=>remove(r2, i), r), universe);

const concat = argsHeadTailMode((head,tail) => head.concat(concat(tail)));

const zipBy = f => (...arrs) => {
    const result = [];
    for(let i=0;i<Math.max(...arrs.map(arr=>arr.length));i++){
        result.push(f(...arrs.map(arr=>i<arr.length[i]?arr[i]:null)));
    }
    return result;
}

const zip = zipBy((...arr)=>arr)

const zipByConcat = zipBy((...arrs)=>concat(...arrs))

module.exports = {
    set: set,
    union: union,
    separate:separate,
    intersection: intersection,
    complement: complement,
    zipBy: zipBy,
    zip: zip,
    zipByConcat: zipByConcat,
    concat: concat,
    argsHeadTailMode:argsHeadTailMode
}