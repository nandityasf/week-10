const router = require("express").Router();
const pool = require("../models/pool.js")


router.get('/', (req, res) => {
    pool.query(
      `SELECT * FROM movies`,
    (err, result)=>{
        if (err){
            console.error(err)
            res.status(500).json(err)
        } else{
            res.json(result.rows)
        }
      
    })
  })

  router.post('/movies', (req,res)=>{
    pool.query(
      `INSERT INTO movies ("id", "title", "genres", "year", "photo") VALUES ($1, $2, $3, $4, $5)`,
    [req.body.id, req.body.title, req.body.genres, req.body.year, req.body.photo],
    (err, result) => {
      if (err){
      console.error (err)
        res.status(500).json(err)
      } 
      res.status(201).json({status: 'success'})
    });
  });

  router.put('/movies/:id', (req,res)=>{
    pool.query(
      `UPDATE movies SET genres = '${req.body.genres}' WHERE id = ${req.body.id}`,
    (err, result) => {
      if (err){
      console.error (err)
        res.status(500).json(err)
      } 
      res.status(201).json({status: 'success'})
    });
  });

  router.delete('/movies/:id', (req,res)=>{
    pool.query(
      `DELETE FROM movies WHERE id = ${req.body.id}`,
    (err, result) => {
      if (err){
      console.error (err)
        res.status(500).json(err)
      } 
      res.status(201).json({status: 'success'})
    });
  });

  

module.exports = router