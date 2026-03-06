import { useEffect, useState } from "react"
import { analyzeWords, filterWords, findTraps } from "./WordEngine"

export default function App(){

  const [words,setWords] = useState([])
  const [prefix,setPrefix] = useState("")
  const [suffix,setSuffix] = useState("")

  const [engine,setEngine] = useState(null)

  const [results,setResults] = useState([])
  const [trap2,setTrap2] = useState([])
  const [trap3,setTrap3] = useState([])
  const [trap4,setTrap4] = useState([])

  useEffect(()=>{

    fetch("/words.txt")
    .then(r=>r.text())
    .then(text=>{

      const list = text.split("\n")

      setWords(list)

      const data = analyzeWords(list)

      setEngine(data)

    })

  },[])

  function runSearch(){

    if(!engine) return

    const r = filterWords(words,prefix,suffix)

    setResults(r)

    setTrap2(findTraps(r,engine.suffix2,2))
    setTrap3(findTraps(r,engine.suffix3,3))
    setTrap4(findTraps(r,engine.suffix4,4))

  }

  return(

    <div className="app">

      <h1>Word Trap Finder</h1>

      <div className="controls">

        <input
          placeholder="starts with"
          value={prefix}
          onChange={e=>setPrefix(e.target.value)}
        />

        <input
          placeholder="ends with"
          value={suffix}
          onChange={e=>setSuffix(e.target.value)}
        />

        <button onClick={runSearch}>Search</button>

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

        {words.slice(0,500).map(w=>(
          <span key={w}>{w}</span>
        ))}

      </div>

    </div>

  )

}