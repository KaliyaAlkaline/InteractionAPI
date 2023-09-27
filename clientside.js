function InteractionAPI(url, type, json, GETcontent=null) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4) {
            GETcontent = xhr.responseText
            if (GETcontent.includes("requires")) {
                GETcontent = JSON.parse(GETcontent)
            }
        }
    }
    xhr.open(type, url, false)
    xhr.setRequestHeader("Content-Type", "application/json")
    for (let i = 0; i < Object.keys(json).length; i++) {
        xhr.setRequestHeader(Object.keys(json)[i], JSON.stringify(Object.values(json)[i]))
    }
    xhr.send()
    return GETcontent
}
InteractionAPI.post = function (data) {
    return InteractionAPI("http://localhost:3001/interactions", "POST", {data: data})
}
InteractionAPI.request = function (authorization, channelid, key) {
    return InteractionAPI("http://localhost:3001/interaction/request", "POST", {authorization: authorization, channelid: channelid, key: key})
}
