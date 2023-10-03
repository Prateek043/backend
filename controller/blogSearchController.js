const express = require('express');
const axios = require('axios');
const lodash= require('lodash');
const asyncHandler=require('express-async-handler');
const config = {
    method: 'get',
    url: 'https://intent-kit-16.hasura.app/api/rest/blogs',
    headers: {
      'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
    }
  };

const blogSearch=asyncHandler(async(req,res)=>{
    try{
    const { query } = req.query; 
//if the query not found
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is missing.' });
  }
//if found then->
const response = await axios(config);
const blog=response.data.blogs;

  const searchresult = blog.filter(data => {
    return (
      data.title.toLowerCase().includes(query.toLowerCase())
    );
  });
  res.json(searchresult);
}catch(err){
    throw new Error(err);
}
})

module.exports=blogSearch;