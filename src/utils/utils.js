function parseValueToString(priceInt) {
    const stringedInt = priceInt.toString();
    let centsSlice = ""; // two last numbers represent the cents
    let intSlice = ""; // the other numbers represents the interger part of the value

    for(let i = 0; i < stringedInt.length; i++) {
        if(i >= stringedInt.length - 2) {
            centsSlice += stringedInt[i]
        } else {
            intSlice += stringedInt[i]
        }
    }

    return `${intSlice === "" ? "0" : intSlice},${centsSlice}`;
}

function valueColorizer(value) {
    if(value < 0) {
        return 'red'
    }
    return "green"
}

function resetApp() {
    localStorage.removeItem("mywallet")
    window.location.href = "/"
}


export {
    parseValueToString,
    valueColorizer,
    resetApp
}