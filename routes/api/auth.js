const router = require('express').Router();
const User = require('../../models/user.model');
const auth = require('../../middleware/auth')

const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

// @route  GET api/auth
// @desc   auth user
// @access Public


router.route('/').post((req, res) => {
  const {email, password}  = req.body;

  // validation for empty fields
  if(!email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
  }
  // check for existing
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({msg: 'User does not exist'});

      //validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid Password' })
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.username,
                      email: user.email
                    }
                  });
                }
              )
        })
    })
});

module.exports = router;