const musicModel = require('../models/music.models');
const jwt = require('jsonwebtoken');
const {uploadFile} = require('../services/storage.services');
const albumModel = require('../models/album.models');

async function createMusic(req,res){


    // const token = req. cookies.token;

    // if(!token ){
    //     return res.status(401).json ({
    //         message:"Unauthorised"
    //     })
    // }

    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     if(decoded.role !== 'artist'){
    //         return res.status(403).json({
    //             message: "You don't have permission to create music"
    //         })
    //     }
   

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));
    console.log("music result", result);

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        message: "Music created successfully",
        music:{
            id: music._id,
            uri:music.uri,
            title: music.title,
            artist: music.artist
        }
    })
    //  }
    // catch(err){
    //     console.error(err);
    //     return res.status(401).json({
    //         message: "Unauthorized"
    //     })
    // }
}

async function createAlbum(req,res){
    // const token = req.cookies.token;

    // if(!token ){
    //     return res.status(401).json ({
    //         message:"Unauthorised"
    //     })
    // }

    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)  
    //     if (decoded.role !== 'artist'){
    //         return res.status(403).json({
    //             message: "You don't have permission to add music to album"
    //         })
    //     }
        
        const {title, musics} = req.body;
        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics,
        })

        res.status(201).json({
            message: "Music added to album successfully",
            album:{
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })
    // }
    // catch(err){
    //     console.error(err);
    //     return res.status(401).json({
    //         message: "Unauthorized"
    //     })
    // }
}

async function getAllMusic(req, res){
    const musics = await musicModel
    .find()
    .skip(1) //pagination
    .limit(1) //pagination
    .populate('artist')
    res.status(200).json({
        message: "All music fetched successfully",
        musics: musics
    })
}

async function getAllAlbums(req, res){
    // const albums = await albumModel.find().populate("artist", "username email").populate('musics')
    const albums = await albumModel.find().select("title artist").populate("artist", "username email")
    res.status(200).json({
        message: "All albums fetched successfully",
        albums: albums
    })
}

async function getAlbumById(req, res){

    const albumId= req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email")
    res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })
}
module.exports = {createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById};