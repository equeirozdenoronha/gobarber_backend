import multer from 'multer';
import File from '../models/File';
class FileController {

    async store(req, res) {
        const { originalname: name, filename: path } = req.file;
        const file = await File.create({
            name,
            path,
        })
        return res.json(file);
    }

    // async show(req, res){
    //     const {id} = req.query;
    //     const 
    // }

}

export default new FileController();