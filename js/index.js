const express = require('express')
const sequelize = require('./util/database');
const User = require('./models/users');

const app = express()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Docker World!')
})

app.use('/users', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error)
  }
});

sequelize.sync({ force: true })
  .then(() => app.listen(process.env.EXTERNALPORT))
  .catch((error) => console.log(error))