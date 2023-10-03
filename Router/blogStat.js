const express=require('express');
const router=express.Router();
const blogStatsController=require('../controller/blogController');
const blogSearch=require('../controller/blogSearchController');


router.get('/blog-stats',blogStatsController);
router.get('/blog-search',blogSearch);

module.exports=router;