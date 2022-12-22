const express = require('express');
const router = express.Router()

router.get("/",(req,res) => {
    res.status(200).json({message:"App is Working"})
})

module.exports = router