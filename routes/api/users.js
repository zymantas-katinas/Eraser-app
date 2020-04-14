const router = require('express').Router();
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs')

// @route  GET api/users
// @desc   Register new user
// @access Public
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const {username, password}  = req.body;

  // validation for empty fields
  if(!username || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
  }
  // check for existing
  User.findOne({ username })
    .then(user => {
      if(user) return res.status(400).json({msg: 'User already exists'});

      const newUser = new User({username, password});

      //create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              res.json({
                user: {
                  id: user.id,
                  name: user.username,
                }
              });
            });
        })
      })
    })
});

module.exports = router;