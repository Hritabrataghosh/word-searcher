export function analyzeWords(words) {

  const suffix2 = {}
  const suffix3 = {}
  const suffix4 = {}

  for (let word of words) {

    if (word.length >= 2) {

      const s2 = word.slice(-2)
      suffix2[s2] = (suffix2[s2] || 0) + 1

    }

    if (word.length >= 3) {

      const s3 = word.slice(-3)
      suffix3[s3] = (suffix3[s3] || 0) + 1

    }

    if (word.length >= 4) {

      const s4 = word.slice(-4)
      suffix4[s4] = (suffix4[s4] || 0) + 1

    }

  }

  return { suffix2, suffix3, suffix4 }

}


export function filterWords(words, prefix, suffix) {

  return words.filter(word => {

    if (prefix && !word.startsWith(prefix)) return false
    if (suffix && !word.endsWith(suffix)) return false

    return true

  })

}


export function findTraps(words, suffixMap, size) {

  return words.filter(word => {

    if (word.length < size) return false

    const suf = word.slice(-size)

    const count = suffixMap[suf]

    return count < 5 && count > 0

  })

}