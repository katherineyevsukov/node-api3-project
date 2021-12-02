const User = require('./../users/users-model')

function logger(req, res, next) {
  console.log({
    method: req.method,
    url: req.url,
    time: new Date().toISOString()
  })
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user){
      res.status(404).json({ message: "user not found" })
    } else {
      req.user = user
      next()
    }
  } catch(err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  if (!req.body.name || !req.body.name.trim()){
    next({status: 400, message: "missing required name field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body.text || !req.body.text.trim()){
    next({status: 400, message: "missing required text"})
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }
