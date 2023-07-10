const urlService = require('../services/urlservice.js');

async function get(req,res){
    const urls = await urlService.getUrls();
    res.json(urls);
}

async function post(req,res){
    const result = await urlService.addUrl(req.body.url);
    res.json(result);
}

async function put(req,res){
    const result = await urlService.updateUrl(req.body.url);
    res.json(result);
}

async function remove(req,res){
    await urlService.deleteUrl(req.params.id);
    res.json({message:'Deleted Successfully'});
}

module.exports = {
    get,
    post,
    put,
    remove
};