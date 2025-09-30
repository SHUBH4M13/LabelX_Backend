import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/temp')
    },
    filename: function(req,file,cb){
        cb(null , file.originalname)
    }
})

const upload = multer({storage})

export function UploadMiddleware(req,res,next){
    upload.single("image")(req,res, function (err) {
        if(err){
            return res.status(400).json({ error: err.message });
        }
        next();
    })
}