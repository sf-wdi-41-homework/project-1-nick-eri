// Functions to handle the Software Model
const db = require('../models');

module.exports = {
  // Meant for client side ajax call to return software search results
  search: (req, res) => {
    db.Software
      .find({ name: { $regex: req.params.software, $options: 'i' } })
      .exec((err, softwares) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json(softwares);
      });
  }
};
