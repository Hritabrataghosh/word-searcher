// ==============================
// TRIE STRUCTURE (FAST PREFIX SEARCH)
// ==============================

class TrieNode {
constructor(){
this.children = {}
this.words = []
}
}

class Trie {
constructor(){
this.root = new TrieNode()
}

insert(word){

let node = this.root

for(const char of word){

if(!node.children[char]){
node.children[char] = new TrieNode()
}

node = node.children[char]
node.words.push(word)

}

}

search(prefix){

let node = this.root

for(const char of prefix){

if(!node.children[char]) return []
node = node.children[char]

}

return node.words

}

}



// ==============================
// BUILD INDEX
// ==============================

export function buildIndex(words){

const trie = new Trie()

const suffix2 = {}
const suffix3 = {}
const suffix4 = {}

for(const word of words){

trie.insert(word)

// suffix rarity maps

if(word.length >= 2){
const s2 = word.slice(-2)
suffix2[s2] = (suffix2[s2] || 0) + 1
}

if(word.length >= 3){
const s3 = word.slice(-3)
suffix3[s3] = (suffix3[s3] || 0) + 1
}

if(word.length >= 4){
const s4 = word.slice(-4)
suffix4[s4] = (suffix4[s4] || 0) + 1
}

}

return {
trie,
suffix2,
suffix3,
suffix4,
allWords: words
}

}



// ==============================
// SEARCH
// ==============================

export function search(index,prefix,suffix){

let results = []

if(prefix){
results = index.trie.search(prefix)
}else{
results = index.allWords
}

if(suffix){
results = results.filter(w => w.endsWith(suffix))
}

return results

}



// ==============================
// TRAP DETECTION
// ==============================

export function findTraps(words,map,size,allWords){

return words.filter(w=>{

if(w.length < size) return false

const suf = w.slice(-size)
const count = map[suf]

// remove traps where suffix itself is a word
if(allWords.includes(suf)) return false

return count < 5 && count > 0

})

}



// ==============================
// BEST TRAP FINDER
// ==============================

export function findBestTraps(words,suffixMap,size,allWords){

const traps = []

for(const word of words){

if(word.length < size) continue

const suf = word.slice(-size)
const count = suffixMap[suf]

// remove traps where suffix itself is a word
if(allWords.includes(suf)) continue

if(count > 0 && count <= 7){

traps.push({
word,
count
})

}

}

return traps.sort((a,b)=>{

// prefer counts near 6 (best trap zone)

const scoreA = Math.abs(6 - a.count)
const scoreB = Math.abs(6 - b.count)

if(scoreA !== scoreB) return scoreA - scoreB

return a.count - b.count

})

}