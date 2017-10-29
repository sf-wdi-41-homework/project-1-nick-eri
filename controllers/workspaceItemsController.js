// Functions to handle the bridge workspace item model
const db = require('../models');

// Handles users adding new workspace item to their list
let create = (req, res) => {
  db.WorkspaceItem.create(req.body, (err, workspaceItem) => {
    if (err) {
      console.log('error', err);
    }
    workspaceItem._userId = req.body.userId;
    workspaceItem._softwareId = req.body.id;
    workspaceItem.description = req.body.description;
    workspaceItem.save((err, savedWorkspaceItem) => {
      if (err) {
        console.log('Saving workspace item failed');
      }
      res.redirect(`/users/${currentUser.username}`);
    });
  });
};

// Handles user removing list items from their profile
let destroy = (req, res) => {
  console.log(req.params.id);
  db.WorkspaceItem.findById(req.params.id, (err, foundWorkspaceItem) => {
    res.json(foundWorkspaceItem);
    // FIXME: will this ever be called? Nothing executes after you send a response.
    foundWorkspaceItem.remove();
  });
};

module.exports = {
  create,
  destroy
};
