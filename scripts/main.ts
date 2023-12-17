const convertButton = document.getElementById("convert")
const dictURL = "https://kaeru2193.github.io/Phun-Resources/dict/phun-dict.json"
let dict: any

window.onload = async () => {
    const res = await fetch(dictURL)
    dict = await res.json()
    
}

convertButton?.addEventListener("click", async () => {
    const inputArea: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("input")
    const inputText = inputArea.value
    const pronArea: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("pron")
    const IPAArea: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("ipa")
    const pronText = convertPron(inputText)
    const IPAText = convertIPA(pronText)
    pronArea.value = pronText
    IPAArea.value = IPAText
})

function convertPron(text: string) {
    const marks: any = {
        "、": ",",
        "。": ".",
        "！": "!",
        "？": "?",
        "「": "\"",
        "」": "\""
    }

    const charArr = text.split("")
    const pron = charArr.map(c => {
        const result = dict.filter((a: any) => {return a.word == c})
        if (result.length != 0) {
            return " " + result[0].pron
        } else if (marks.hasOwnProperty(c)) {
            return marks[c]
        } else {
            return c
        }
    })

    const pronText = pron.join("")
    return pronText
}

function convertIPA(pron: string) {
    const IPATable: any = {
        "k": "k",
        "g": "g",
        "t": "t",
        "d": "d",
        "s": "s",
        "z": "z",
        "f": "ɸ",
        "v": "β",
        "p": "p",
        "b": "b",
        "l": "l",
        "h": "h",
        "x": "ʃ",
        "j": "d͡ʒ",
        "c": "t͡s",
        "q": "t͡ʃ",
        "n": "n",
        "m": "m",
        "y": "j",
        "w": "w",
        "ng": "ŋ",
        "a": "a",
        "e": "ɛ",
        "i": "i",
        "o": "o",
        "u": "ɯ",
        "1": "˦",
        "2": "˨",
        "3": "˥˩",
    }
    const IPA = pron.split("").map((l) => {
        return IPATable.hasOwnProperty(l)? IPATable[l]: l
    }).join("")

    return IPA
}