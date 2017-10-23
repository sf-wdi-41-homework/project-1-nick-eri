
var db = require("./models");

var softwaresList = [
	{
		name: 'Contexts',
		tag: 'Productivity'
	},
	{
		name: 'Sublime Text',
		tag: 'Programming'
	},
	{
		name: 'Adobe Photoshop',
		tag: 'Design'
	},
	{
		name: 'SizeUp',
		tag: 'Utility'
	},
	{
		name: 'Stay',
		tag: 'Utility'
	},
	{
		name: 'Slack',
		tag: 'Communication'
	},
	{
		name: 'Telegram',
		tag: 'Communication'
	},
	{
		name: 'Adobe InDesign',
		tag: 'Design'
	},
	{
		name: 'Microsoft Word',
		tag: 'Productivity'
	},
	{
		name: 'Microsoft PowerPoint',
		tag: 'Productivity'
	},
	{
		name: 'Microsoft Excel',
		tag: 'Productivity'
	},
	{
		name: 'Google Docs',
		tag: 'Productivity'
	},
	{
		name: 'Google Sheets',
		tag: 'Productivity'
	},
	{
		name: 'Google Slides',
		tag: 'Productivity'
	},
	{
		name: 'Atom',
		tag: 'Programming'
	},
	{
		name: 'Robo 3T',
		tag: 'Programming'
	}
]

var usersList = [
	{
		username: 'severejetlag',
		fName: 'Nick',
		lName: 'Lee',
		avatar: 'something.png',
		jobTitle: 'WDI Student', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 20
	}, 
	{
		username: 'severejetlag2',
		fName: 'Nick2',
		lName: 'Lee',
		avatar: 'something.png',
		jobTitle: 'Front End Developer', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 30
	},
	{
		username: 'severejetlag3',
		fName: 'Nick3',
		lName: 'Lee',
		avatar: 'something.png',
		jobTitle: 'Designer', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 40
	},
	{
		username: 'severejetlag4',
		fName: 'Nick4',
		lName: 'Lee',
		avatar: 'something.png',
		jobTitle: 'WDI Student', 
		jobField: 'Tech', 
		blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
		votes: 100
	}
]

var workspaceItemsList = [
	{
		username:'severejetlag',
		name: 'Contexts',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
	},
	{
		username:'severejetlag',
		name: 'Sublime Text',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
	},
	{
		username:'severejetlag',
		name: 'Adobe Photoshop',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
	},
	{
		username:'severejetlag2',
		name: 'Contexts',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
	},
	{
		username:'severejetlag2',
		name: 'Stay',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
	}
]


db.User.remove({}, function(err, users){
  	db.User.create(usersList, function(err, users){
	    // code in here runs after all albums are created
	    if (err) { return console.log('ERROR', err); }
	    console.log("all users:", users);
	    console.log("created", users.length, "users");
		db.Software.remove({}, function(err, users){
			db.Software.create(softwaresList, function(err, softwares){
				if(err) {return console.log('ERROR', err);}
				console.log("all softwares:", softwares);
				console.log('created', softwares.length, 'softwares');
				db.WorkspaceItem.remove({}, function(err, workspaceItems){
					console.log('removed all workspaceItems');
					workspaceItemsList.forEach(function(workspaceItemData) {
						var workspaceItem = new db.WorkspaceItem({
				          	description: workspaceItemData.description
						});
				        db.User.findOne({username: workspaceItemData.username}, function (err, foundUser) {
				          	console.log(`found user ${foundUser.username} for for workspace item ${workspaceItem.description}`);
				          	if (err) {
				            	console.log(err);
				            	return;
				          	}
				          	workspaceItem._userId = foundUser._id;
				          	console.log("\nUSER\N",foundUser._id)				   
							db.Software.findOne({name: workspaceItemData.name}, function (err, foundSoftware) {
					          	console.log(`found software ${foundSoftware.name} for for workspace item ${workspaceItem.description}`);
					          	if (err) {
					            	console.log(err);
					            	return;
					          	}
					          	console.log("\nSOFTWARE\n",foundSoftware._id)				   
					          	workspaceItem._softwareId = foundSoftware._id;
					          	workspaceItem.save(function(err, saveWorkspaceItem){
							        	if (err) {
							          		return console.log(err);
										}
										console.log('saved workspace item');
										process.exit(0);
									});
								});
							});
						
				      	
					});
				});
			});
		});
  	});
});