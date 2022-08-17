const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
function discordAPI(authToken, apiEndpoint, JSONparams, type="GET", GETcontent=null) {
	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function () { 
		if (xhr.readyState == 4 && xhr.status == 200)
			GETcontent = JSON.parse(xhr.responseText)
	}
	xhr.open(type, "https://discord.com/api/v8" + apiEndpoint, false)
	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.setRequestHeader("Authorization", authToken)
	xhr.send(JSON.stringify(JSONparams))
	return GETcontent
}
function makeid(length) {
	var result = ""
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+|\/#$%&*@!"
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}
const interactions = (app, fs) => {
	const dataPath = "./data/interactions.json"
	const readFile = (
		callback,
		returnJson = false,
		filePath = dataPath,
		encoding = "utf8"
	) => {
		fs.readFile(filePath, encoding, (err, data) => {
			if (err) {
				throw err
			}
			callback(returnJson ? JSON.parse(data) : data)
		})
	}
	const writeFile = (
		fileData,
		callback,
		filePath = dataPath,
		encoding = "utf8"
	) => {
		fs.writeFile(filePath, fileData, encoding, err => {
			if (err) {
				throw err
			}
			callback()
		})
	}
	app.post("/interactions", (req, res) => {
		if (req.headers.data !== undefined) {
			readFile(data => {
				try {
					var json = JSON.parse(req.headers.data)
				} catch (err) {
					var json = {}
				}
				delete json["channel_id"]
				delete json["guild_id"]
				delete json["session_id"]
				delete json["nonce"]
				var exists = 0
				var code = ""
				for (let i = 0; i < Object.keys(data).length; i++) {
					if (JSON.stringify(json) === data[Object.keys(data)[i]]) {
						exists++
						var code = Object.keys(data)[i]
					}
				}
				if (exists === 0) {
					var code = makeid(10)
					data[code] = JSON.stringify(json)
					writeFile(JSON.stringify(data, null, 2), () => {
						res.status(200).send(code)
					})
				} else {
					res.status(400).send(code)
				}
			}, true)
		} else {
			res.status(401).send({"requires":["data"]})
		}
	})
	app.post("/interactions/request", (req, res) => {
		if (req.headers.authorization !== undefined && req.headers.channelid !== undefined, req.headers.key !== undefined) {
			readFile(data => {
				try {
					var json = JSON.parse(data[req.headers.key.replace(/[^a-zA-Z0-9\-_\+\|\\\/\#\$\%\&\*\@\!]/g, "")])
				} catch (err) {
					var json = {}
				}
				json["channel_id"] = req.headers.channelid.replace(/[^0-9]/g, "")
				try {
					var auth = req.headers.authorization.replace(/[^a-zA-Z0-9\-_\.]/g, "")
				} catch (err) {
					var auth = undefined
				}
				try {
					json["guild_id"] = discordAPI(auth, "/channels/"+json["channel_id"]).guild_id
				} catch (err) {
					json["guild_id"] = null
				}
				json["session_id"] = "1"
				json["nonce"] = ((BigInt(Date.now()) - 1420070400000n) << 22n).toString()
				discordAPI(auth, "/interactions", json, "POST")
				res.status(200).send("Request sent")
			}, true)
		} else {
			res.status(401).send({"requires":["authorization","channelid","key"]})
		}
	})
}
module.exports = interactions