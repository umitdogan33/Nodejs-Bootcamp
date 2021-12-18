const express = require("express");
const helmet = require("helmet");
const config = require("./config/index")
const {ProjectRouters} = require("./api-routers/index");
const loaders = require("./loaders");
config();
loaders();
const app = express();
app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT,() => {
    console.log("sistem ayakta");
    app.use("/projects",ProjectRouters.router)
})
