const express = require('express')
const sequelize = require('./util/database');
const User = require('./models/users'); 

const app = express()
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/', (req, res) => {
  res.send('Hello Docker World!')
})

app.use('/users', require('./routes/users'));

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

(async () => {
  try {
    await sequelize.sync({force: false});
    app.listen(process.env.EXTERNALPORT)
    console.log("JS app listening on port", process.env.EXTERNALPORT);
  } catch (error) {
    console.log(error);
  }
})();