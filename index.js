async function getHtml(temp) {
    const html = await fetch(`./view/${temp}.html`)
    const textHtml = await html.text()
    return textHtml;
}

// Write Html in Skill Section
async function writeHtml(id, towrite) {
    const htmlwrite = await getHtml(towrite)
    document.getElementById(id).innerHTML = htmlwrite
}

async function getjson(jsfile) {
    const jsdata = await fetch(`./proxy/${jsfile}.json`)
    const jsondata = await jsdata.json()
    return jsondata;
}

// function for upper casing the heading

async function capUpper(js){
    let n1 = Object.keys(js)[0]
    let n2 = n1.slice(1).toLowerCase()
    n3 = n1.charAt(0).toUpperCase()
    const heading = n3 + n2
    console.log();
    return heading
}

// sidebar html and data

async function writejsonsidebar() {
    await writeHtml('sidebar', "temp2")
    const js = await getjson('personal')
    const key = Object.keys(js)[0]
    const heading = await capUpper(js)
    console.log("this is first" + heading);
    document.getElementById('sidebar').querySelector('[data-bind="section.name"]').innerHTML = heading
    const dataArray = Object.keys(js[key])
    for (i = 0; i < dataArray.length; i++) {
        const object = js[key]
        const keyName = dataArray[i]
        if (keyName == 'summary') {
            let n1 = keyName
            let n2 = n1.slice(1).toLowerCase()
            n3 = n1.charAt(0).toUpperCase()
            const keyheading = n3 + n2
            document.getElementById('summary').innerHTML = `<strong> ${keyheading}</strong> <br>`
            document.getElementById('summary').innerHTML += object[keyName] + "<br>"
            continue
        }
        document.getElementById('side').innerHTML += "<br>" + object[keyName] + "<br>"
    }
}


// work for summary
async function writeHtmlAndSummary() {
    await writeHtml('education', "temp3")
    const js = await getjson('experience')
    const key = Object.keys(js)[0]
    const heading = await capUpper(js)
    console.log("this is second " + heading);
    document.getElementById('education').querySelector('[data-bind="section.name"]').innerHTML = heading
    const dataArray = Object.keys(js[key])
    for (i = 0; i < dataArray.length; i++) {
        const object = js[key]
        const keyName = dataArray[i]
        document.getElementById('education').querySelector('[data-bind="section.item"]').innerHTML += "<br>" + object[keyName] + "<br>"
    }
}

// Skill

async function writejsdata() {
    await writeHtml('skill', "temp4")
    const data = await getjson('skills')
    const li = document.querySelector('[id="skill"] [data-bind="section.items"]').innerHTML
    const key = Object.keys(data)[0]
    const heading = await capUpper(data)
    console.log("this is third " + heading);
    document.querySelector("[id='skill'] [data-bind='section.name']").innerHTML = heading
    for (i = 0; i < data[key].length - 1; i++) {
        document.querySelector("[data-bind='section']").innerHTML += li
    }
    const li1 = document.querySelectorAll("li")
    for (j = 0; j < li1.length; j++) {
        li1[j].innerHTML = data[key][j]
    }
}

async function callFunction() {
    writejsonsidebar()
    writeHtmlAndSummary()
    writejsdata()
}
callFunction()