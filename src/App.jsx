import { useEffect,useState } from "react"
import { buildIndex,search,findTraps } from "./WordEngine"

export default function App(){

const [index,setIndex] = useState(null)

const [prefix,setPrefix] = useState("")
const [suffix,setSuffix] = useState("")

const [results,setResults] = useState([])
const [trap2,setTrap2] = useState([])
const [trap3,setTrap3] = useState([])
const [trap4,setTrap4] = useState([])

const [loading,setLoading] = useState(true)

useEffect(()=>{

fetch("/datasets/all_words.txt")

.then(r=>r.text())

.then(text=>{

const words = text
.split("\n")
.map(w=>w.trim().toLowerCase())
.filter(Boolean)

const idx = buildIndex(words)

setIndex(idx)

setLoading(false)

console.log("Indexed words:",words.length)

})

},[])


useEffect(()=>{

if(!index) return

const r = search(index,prefix,suffix)

setResults(r)

setTrap2(findTraps(r,index.suffix2,2))
setTrap3(findTraps(r,index.suffix3,3))
setTrap4(findTraps(r,index.suffix4,4))

},[prefix,suffix,index])


if(loading){

return(
<div className="app">
<h1>Building Word Index...</h1>
</div>
)

}

return(

<div className="app">

<h1>Word Trap Finder</h1>

<div className="controls">

<input
placeholder="Starts with"
value={prefix}
onChange={e=>setPrefix(e.target.value.toLowerCase())}
/>

<input
placeholder="Ends with"
value={suffix}
onChange={e=>setSuffix(e.target.value.toLowerCase())}
/>

</div>

<Section title="Normal Results" words={results}/>
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