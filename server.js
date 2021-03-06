const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const env = process.env.NODE_ENV || "development";
const db = require("./app/models");
const logger = require("./app/utils/logger");

let corsOptions = {
    origin: env === 'development' ? "http://localhost:3000" : "https://apple4you.tu4ka.tech"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


db.sequelize.sync();
//db.sequelize.sync({force: true});
//db.sequelize.sync({ alter: true });


require("./app/routes/user.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/office.routes")(app);
require("./app/routes/whereKnown.routes")(app);
require("./app/routes/customer.routes")(app);

//stock
require("./app/routes/stock/stock.routes")(app);
require("./app/routes/stock/defectStock.routes")(app);
require("./app/routes/stock/category.routes")(app);

//device
require("./app/routes/device/brand.routes")(app);
require("./app/routes/device/type.routes")(app);
require("./app/routes/device/model.routes")(app);
require("./app/routes/device/device.routes")(app);

//executor
require("./app/routes/executor.routes")(app);

//order
require("./app/routes/order.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Server is running on port: ${PORT}.`);
    console.log(`Server is running on port ${PORT}.`);
});
