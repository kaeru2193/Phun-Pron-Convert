"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const convertButton = document.getElementById("convert");
const dictURL = "https://kaeru2193.github.io/Phun-Resources/dict/phun-dict.json";
let dict;
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(dictURL);
    dict = yield res.json();
});
convertButton === null || convertButton === void 0 ? void 0 : convertButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const inputArea = document.getElementById("input");
    const inputText = inputArea.value;
    const pronArea = document.getElementById("pron");
    const IPAArea = document.getElementById("ipa");
    const pronText = convertPron(inputText);
    const IPAText = convertIPA(pronText);
    pronArea.value = pronText;
    IPAArea.value = IPAText;
}));
function convertPron(text) {
    const marks = {
        "、": ",",
        "。": ".",
        "！": "!",
        "？": "?",
        "「": "\"",
        "」": "\""
    };
    const charArr = text.split("");
    const pron = charArr.map(c => {
        const result = dict.filter((a) => { return a.word == c; });
        if (result.length != 0) {
            return " " + result[0].pron;
        }
        else if (marks.hasOwnProperty(c)) {
            return marks[c];
        }
        else {
            return c;
        }
    });
    const pronText = pron.join("");
    return pronText;
}
function convertIPA(pron) {
    const IPATable = {
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
    };
    const IPA = pron.split("").map((l) => {
        return IPATable.hasOwnProperty(l) ? IPATable[l] : l;
    }).join("");
    return IPA;
}
