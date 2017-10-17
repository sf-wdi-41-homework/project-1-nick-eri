var usersList = [
	{
		_id:1,
		username: 'severejetlag',
		fName: 'Nick',
		lName: 'Lee',
		avatar: '/images/something.png',
		jobTitle: 'WDI Student', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 20
	}, 
	{
		_id:2,
		username: 'severejetlag2',
		fName: 'Nick2',
		lName: 'Lee',
		avatar: '/images/something.png',
		jobTitle: 'Front End Developer', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 30
	},
	{
		_id:3,
		username: 'severejetlag3',
		fName: 'Nick3',
		lName: 'Lee',
		avatar: '/images/something.png',
		jobTitle: 'Designer', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 40
	},
	{
		_id: 4,
		username: 'severejetlag4',
		fName: 'Nick4',
		lName: 'Lee',
		avatar: '/images/something.png',
		jobTitle: 'WDI Student', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 100
	}
]

// GET /
function home(req, res) {  
  	res.render('index.ejs', { message: req.flash('errorMessage') });
}

function users(req,res){
	res.render('users.ejs', {message: req.flash('errorMessage'), users: usersList });
}

module.exports = {
  home: home,
  users: users
}