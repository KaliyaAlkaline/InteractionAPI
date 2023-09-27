const interactions = require("./interactions")
const appRouter = (app, fs) => {
	app.get("/", (req, res) => {
		res.send("")
	})
	interactions(app, fs)
}
module.exports = appRouter
