import { useEffect,useState } from "react"
import { buildIndex,search,findTraps,findBestTraps } from "./WordEngine"

export default function App(){

const [index,setIndex] = useState(null)
const [validSet,setValidSet] = useState(new Set())

const [prefix,setPrefix] = useState("")
const [suffix,setSuffix] = useState("")

const [sortMode,setSortMode] = useState("shortest")

const [results,setResults] = useState([])
const [trap2,setTrap2] = useState([])
const [trap3,setTrap3] = useState([])
const [trap4,setTrap4] = useState([])
const [bestTraps,setBestTraps] = useState([])


const [loading,setLoading] = useState(true)

useEffect(()=>{

Promise.all([
fetch("/datasets/all_words.txt").then(r=>r.text()),
fetch("/datasets/valid_words.txt").then(r=>r.text())
])

.then(([allText,validText])=>{

const allWords = allText
.split("\n")
.map(w=>w.trim().toLowerCase())
.filter(w=>/^[a-z]+$/.test(w))

const validWords = new Set(
validText
.split("\n")
.map(w=>w.trim().toLowerCase())
.filter(w=>/^[a-z]+$/.test(w))
)

setValidSet(validWords)

const idx = buildIndex(allWords)

setIndex(idx)

setLoading(false)

})

},[])



useEffect(()=>{

if(!index) return

let r = search(index,prefix,suffix)

// traps use full dictionary
setTrap2(findTraps(r,index.suffix2,2,index.allWords))
setTrap3(findTraps(r,index.suffix3,3,index.allWords))
setTrap4(findTraps(r,index.suffix4,4,index.allWords))

const best = findBestTraps(r,index.suffix4,4,index.allWords)
setBestTraps(best)
// normal list = valid words only
let validResults = r.filter(w => validSet.size === 0 || validSet.has(w))

// sorting
if(sortMode==="shortest"){

validResults.sort((a,b)=>a.length-b.length)

}

else if(sortMode==="longest"){

validResults.sort((a,b)=>b.length-a.length)

}

else if(sortMode==="alphabet"){

validResults.sort()

}

setResults(validResults)

},[prefix,suffix,index,sortMode,validSet])


if(loading){

return(
<div className="app">
<h1>Loading dictionaries...</h1>
</div>
)

}

return(

<div className="app">

<h1>Word Trap Finder</h1>

<div className="controls">

<div className="inputWrap">

<input
placeholder="Starts with"
value={prefix}
onChange={e=>setPrefix(e.target.value.toLowerCase())}
/>

{prefix && (
<button
className="clearBtn"
onClick={()=>setPrefix("")}
>
x
</button>
)}

</div>

<div className="inputWrap">

<input
placeholder="Ends with"
value={suffix}
onChange={e=>setSuffix(e.target.value.toLowerCase())}
/>

{suffix && (
<button
className="clearBtn"
onClick={()=>setSuffix("")}
>
x
</button>
)}

</div>

<select
value={sortMode}
onChange={e=>setSortMode(e.target.value)}
>
<option value="shortest">Shortest</option>
<option value="longest">Longest</option>
<option value="alphabet">Alphabetical</option>

</select>

</div>

<Section title="Normal Valid Words" words={results}/>
<TrapSection title="Best Trap Words" words={bestTraps}/>
<Section title="2 Letter Trap" words={trap2}/>
<Section title="3 Letter Trap" words={trap3}/>
<Section title="4 Letter Trap" words={trap4}/>

</div>

)

}

function Section({title,words}){

return(

<div className="section">

<h2>{title} ({words.length})</h2>

<div className="wordlist">

{words.slice(0,300).map(w=>(
<span key={w}>{w}</span>
))}

</div>

</div>

)

}


function TrapSection({title,words}){

return(

<div className="section">

<h2>{title}</h2>

<div className="wordlist">

{words.slice(0,100).map(w=>(
<span key={w.word + w.count}>
{w.word} ({w.count})
</span>
))}

</div>

</div>

)

}


