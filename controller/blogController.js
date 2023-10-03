const axios=require('axios');
const lodash=require('lodash');
const asyncHandler=require('express-async-handler');
const config = {
    method: 'get',
    url: 'https://intent-kit-16.hasura.app/api/rest/blogs',
    headers: {
      'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
    }
  };
const blogStatsController=asyncHandler(async(req,res)=>{
    try{
        //Getting the Data
    const response = await axios(config);
    const blog=response.data.blogs;

    //Finding the total no of BLOG
    const totalBlog=blog.length;
    // console.log("Total No Of Blog is:",totalBlog);

    // blog with the longest title

    const blogWithLongestTitle = lodash.maxBy(blog, 'title.length');
    // console.log('Blog with the longest title:', blogWithLongestTitle);

    //blogs with titles containing the word "privacy"

    const blogTitlePrivicy=lodash.filter(blog, data => lodash.includes(data.title.toLowerCase(), 'privacy'));
    // console.log("Blogs with titles containing the word -Privicy:",blogTitlePrivicy.length);

    // Create an array of unique blog titles (no duplicates)
    const uniqueBlogTitles = lodash.uniqBy(blog, 'title');
    // console.log('Unique blog titles are:', uniqueBlogTitles.map(data => data.title));

    //Response To The Client

    const stat={
        totalBlog:totalBlog,
        blogWithLongestTitle:blogWithLongestTitle,
        blogTitlePrivicy:blogTitlePrivicy.length,
        uniqueBlogTitles:uniqueBlogTitles.map(data => data.title)
    }

    res.json(stat);

    }catch(err)
    {
        throw new Error(err);
    }
})

module.exports=blogStatsController;

