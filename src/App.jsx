import { useEffect, useState } from "react"

import { analyzeWords, filterWords, findTraps } from "./WordEngine"


export default function App() {

  const [words, setWords] = useState([])

  const [prefix, setPrefix] = useState("")
  const [suffix, setSuffix] = useState("")

  const [engine, setEngine] = useState(null)

  const [results, setResults] = useState([])
  const [trap2, setTrap2] = useState([])
  const [trap3, setTrap3] = useState([])
  const [trap4, setTrap4] = useState([])


  useEffect(() => {

    fetch("/words.txt")

      .then(res => res.text())

      .then(text => {

        const list = text.split("\n")

        setWords(list)

        const analysis = analyzeWords(list)

        setEngine(analysis)

      })

  }, [])



  function runSearch() {

    if (!engine) return

    const filtered = filterWords(words, prefix, suffix)

    setResults(filtered)

    setTrap2(findTraps(filtered, engine.suffix2, 2))
    setTrap3(findTraps(filtered, engine.suffix3, 3))
    setTrap4(findTraps(filtered, engine.suffix4, 4))

  }


  return (

    <div className="app">

      <h1>Word Trap Finder</h1>

      <div className="controls">

        <input
          placeholder="Starts with (ex: ly)"
          value={prefix}
          onChange={e => setPrefix(e.target.value)}
        />

        <input
          placeholder="Ends with (ex: ly)"
          value={suffix}
          onChange={e => setSuffix(e.target.value)}
        />

        <button onClick={runSearch}>Search</button>

      </div>


      <Section title="Normal Results" words={results} />

      <Section title="2 Letter Trap" words={trap2} />

      <Section title="3 Letter Trap" words={trap3} />

      <Section title="4 Letter Trap" words={trap4} />

    </div>

  )

}



function Section({ title, words }) {

  return (

    <div className="section">

      <h2>{title} ({words.length})</h2>

      <div className="wordlist">

        {words.slice(0, 500).map(word => (

          <span key={word}>{word}</span>

        ))}

      </div>

    </div>

  )

}