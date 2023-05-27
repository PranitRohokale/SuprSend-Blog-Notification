const mongoose = require("mongoose");

exports.connectDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB CONNECTED SUCCESSFULLY!`))
    .catch((err) => {
      console.log(`error in db connection`);
      console.log(err);
      process.exit(1);
    });
};
