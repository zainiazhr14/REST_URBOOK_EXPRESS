import e, { Request, Response } from "express";
import RESTful from '../../driver/database/postgresql/rest';
import multer from 'multer';
import path from "path";


const imageType = ['jpeg', 'jpg', 'png', 'gif'];
const videoType = ['mp4', 'webm', 'ogg', 'swf', 'wmv', 'mov', 'mpg'];


const getFileType = async (extension: any) => {
  extension = extension.toLowerCase().replace('.', '');

  let fileType = 'other';

  if (imageType.includes(extension)) {
    fileType = 'image';
  }
  if (videoType.includes(extension)) {
    fileType = 'video';
  }
  return fileType;
};


const storage = multer.diskStorage({   
  destination: async function(req, file, cb) { 
    let extension = path.extname(file.originalname);
    let fileType = await getFileType(extension);
    cb(null, `./upload/${fileType}`);    
  }, 
  filename: function (req, file, cb) { 
    let extension = path.extname(file.originalname);
    cb(null , `${new Date().toISOString().replace(/:/g, '')}${extension}`);   
  }
});

const upload = multer({
  storage: storage,
  limits : {fileSize : 2000000}
}).single("file");

const fileREST = new RESTful('file', 'File');
fileREST.populate = {
  path: ''
};


module.exports = (routes: any) => {
  // Get
  routes.get('/:path*', (req: Request, res: Response) => {
    const pathFile = path.join(__dirname, '../../', req.params.path, req.params[0]);
    res.sendFile(pathFile)
  })
  // upload
  routes.post('/upload', async (req: Request, res: Response) => {
    try {
      upload(req, res, async (err) => {
        if(err) {
          res.status(400).send("Something went wrong!");
        }
        let extension = path.extname(req.file.originalname);
        let fileType = await getFileType(extension);

        req.body = {
          file_name: req.file.filename,
          file_type: fileType,
          path: req.file.path
        }

        const { error, data } = await fileREST.create(req);

        if (error) {
          return res.status(401).send('Bad Request');
        }

        return res.send(data);
      });
    } catch (e) {
      res.status(500).send(e);
    }
  })
}