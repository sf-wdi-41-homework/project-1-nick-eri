// Functions handling routing for user information
const db = require('../models');

// BUG: Should someone be able to hit a route where they can see all of the information on all users? I could hit this route and get emails, password hashes, etc.  TMI

// FIXME: the function name `show` will more often than not refer to a call to view one single element, not a list of all elements (index)
// GET Shows a list of all users logged into the site
let show = (req, res) => {
  db.User.find({}).exec((err, users) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render('users.ejs', {
      message: req.flash('errorMessage'),
      users
    });
  });
};

// FIXME: index is usually reserved for returning a list of all elements, not returning just one. Consider switching this to show.
// GET Displays the page of a user when given the username
let index = (req, res) => {
  let username = req.params.username;
  db.User.findOne({ username: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      return;
    }
    if (foundUser) {
      db.WorkspaceItem
        .find({ _userId: foundUser._id })
        .populate('_userId')
        .populate('_softwareId')
        .exec((err, workspaceItems) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          // TODO: Very nice work!
          // Check is user is viewing their own page or someone elses or not logged in at all
          if (
            !currentUser ||
            foundUser.username !== currentUser.username.toString()
          ) {
            res.render('userProfile.ejs', {
              message: req.flash('errorMessage'),
              user: foundUser,
              workspaceItems: workspaceItems
            });
          } else if (foundUser.username === currentUser.username.toString()) {
            res.render('currentUserUserProfile.ejs', {
              message: req.flash('errorMessage'),
              user: foundUser,
              workspaceItems: workspaceItems
            });
          }
        });
    } else {
      // FIXME: send an errror flash message instead of just this.
      res.send('user not found');
    }
  });
};

// GET Displays form page for updating basic profile information
let edit = (req, res) => {
  let username = req.params.username;
  if (username === currentUser.username.toString()) {
    db.User.findOne({ username: username }, (err, foundUser) => {
      if (err) {
        console.log(err);
        return;
      }
      res.render('userProfileEdit.ejs', {
        message: req.flash('errorMessage'),
        user: foundUser
      });
    });
  } else {
    // TODO: Add a flash error message to explain why the redirect
    res.redirect('/');
  }
};

// PUT Saves the updated information from the edit page.
let update = (req, res) => {
  let username = req.params.username;
  // TODO: Try db.User.findOneAndUpdate instead. it's faster/smaller.
  db.User.findOne({ username: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      return;
    }
    foundUser.jobTitle = req.body.jobTitle;
    foundUser.jobField = req.body.jobField;
    foundUser.blurb = req.body.blurb;
    foundUser.save((err, saved) => {
      console.log('Updated ', foundUser.username);
      res.redirect(`/users/${foundUser.username}`);
    });
  });
};

module.exports = {
  show,
  index,
  edit,
  update
};
