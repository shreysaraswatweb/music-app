const express = require ('express');
const musicController = require('../controllers/music.controller');
const multer = require('multer');

//Middleware
const upload = multer({
    storage: multer.memoryStorage()
});
const router = express.Router();

router.post('/upload', upload.single("music"), musicController.createMusic); //Upload.single('file') is used to upload a single file with the field name 'file'


module.exports = router;