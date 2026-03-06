export function buildIndex(words){

const prefixIndex = {}
const suffixIndex = {}

const suffix2 = {}
const suffix3 = {}
const suffix4 = {}

for(const word of words){

// prefix index (first 1–5 letters)

for(let i=1;i<=5;i++){

if(word.length >= i){

const p = word.slice(0,i)

if(!prefixIndex[p]) prefixIndex[p] = []
prefixIndex[p].push(word)

}

}

// suffix index

for(let i=1;i<=5;i++){

if(word.length >= i){

const s = word.slice(-i)

if(!suffixIndex[s]) suffixIndex[s] = []
suffixIndex[s].push(word)

}

}

// rarity maps

if(word.length>=2){

const s2 = word.slice(-2)
suffix2[s2] = (suffix2[s2]||0)+1

}

if(word.length>=3){

const s3 = word.slice(-3)
suffix3[s3] = (suffix3[s3]||0)+1

}

if(word.length>=4){

const s4 = word.slice(-4)
suffix4[s4] = (suffix4[s4]||0)+1

}

}

return {prefixIndex,suffixIndex,suffix2,suffix3,suffix4}

}



export function search(index,prefix,suffix){

let results = []

if(prefix && index.prefixIndex[prefix]){

results = index.prefixIndex[prefix]

}else{

results = Object.values(index.prefixIndex).flat()

}

if(suffix){

results = results.filter(w=>w.endsWith(suffix))

}

return results

}



export function findTraps(words,map,size){

return words.filter(w=>{

if(w.length<size) return false

const suf = w.slice(-size)

const count = map[suf]

return count<5 && count>0

})

}