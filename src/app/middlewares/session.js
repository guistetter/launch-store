function onlyUsers(req,res,next){
  if(!req.session.userID)
  return res.redirect('/users/login')
  next()
}
module.exports = {
  onlyUsers
}