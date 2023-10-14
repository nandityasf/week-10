const router = require("express").Router();
const pool = require("../models/pool.js")

router.get('/', (req, res) => {
    pool.query(
      `SELECT * FROM users`,
    (err, result)=>{
        if (err){
            console.error(err)
            res.status(500).json(err)
        } else{
            res.json(result.rows)
        }
      
    })
  })

module.exports = router