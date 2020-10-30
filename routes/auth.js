const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');

//Validation
router.post('/register', async (req, res) => {

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking similar data
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('email already exists')

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save();
    res.json(savedUser)
  } catch(err) {
    res.status(400).send(err);
  }
})

module.exports = router