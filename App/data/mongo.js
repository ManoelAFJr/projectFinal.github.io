require('dotenv').config();
const mongoose = require('mongoose')

main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:`+
//   `${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`);
// }

async function main() {
    await mongoose.connect(
    `mongodb+srv://${process.env.M_USER}:`+
    `${process.env.M_PASSWORD}`+
    `@${process.env.M_HOST}/${process.env.M_PORT}`);
  }


module.exports = mongoose;