const express = require('express');
const router = express.Router();


//GET
router.get('/', (req, res) => {
  res.send('GET request to the movie page')
})




module.exports = router;