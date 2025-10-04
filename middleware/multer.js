import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public')
    },
    filename: function(req,file,cb){
        const name = file.originalname
        const final = name.replace(/\s+/g, '-');
        cb(null ,final )
    },
})

const upload = multer({storage})

export function UploadMiddleware(req,res,next){
    upload.single("image")(req,res, function (err) {
        if(err){
            console.log(err);
            return res.status(404);
        }
        next();
    })
}