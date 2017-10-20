// Handle static page routes
function home(req, res) {  
  	res.render('index.ejs', { message: req.flash('errorMessage') });
}

module.exports = {
  	home: home,
}