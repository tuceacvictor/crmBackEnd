const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const env = process.env.NODE_ENV || "development";
const db = require("./app/models");
const utils = require('./app/utils/initializeApp');
let corsOptions = {
    origin: env === 'development' ? "http://localhost:3000" : "https://apple4you.tu4ka.tech"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


db.sequelize.sync();


require("./app/routes/user.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/office.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/stock/stock.routes")(app);
require("./app/routes/stock/defectStock.routes")(app);
require("./app/routes/stock/category.routes")(app);


utils.initializeApp();
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});