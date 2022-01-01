const express = require("express");
const helmet = require("helmet");
const config = require("./config/index")
const {ProjectRouters,UserRouters,OperationClaimRouters,UserOperationClaimRouters} = require("./api-routers/index");
const loaders = require("./loaders");
const events = require("./scripts/events/index")
const getLog = require("./middlewares/getLog");


config();
loaders();
events();
const app = express();
app.use(express.json());
app.use(helmet());
// app.use(getLog())
// app.use();

app.listen(process.env.APP_PORT,() => {
    console.log("sistem ayakta");
    app.use("/projects",ProjectRouters);
    app.use("/users",UserRouters);
    app.use("/operationclaims",OperationClaimRouters);
    app.use("/useroperationclaims",UserOperationClaimRouters);
})
