const Users = require('./../users/users-model')

async function logger(req, res, next) {
  // DO YOUR MAGIC
  await 
  console.log("logger req.method:", req.method)
  console.log("logger req.url:", req.url)
  console.log("logger req.timestamp:", Date.now())
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC 
  const { id } = await req.params
  try {
    Users.getById(id)
    if(id) {next()}
    else {next({ status: 404, message: "user not found" })}
  }
  catch {next}
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = await req.body
  next()
  // try {
  //   Users.insert(req.body)
  //   if(name){next(req.body)}
  //   else{next({ status: 400, message: "missing required name field" })}
  // }
  // catch {next}
  }

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log("validatePost req:", req)
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}