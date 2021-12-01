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
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId }
