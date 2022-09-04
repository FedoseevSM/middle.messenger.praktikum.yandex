const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const history = require("express-history-api-fallback");

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(morgan("dev"));

app.use(express.static("./dist"));
app.use(history("index.html", { root: "./dist" }));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
