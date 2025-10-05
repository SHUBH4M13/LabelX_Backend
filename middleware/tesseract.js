import { createWorker } from "tesseract.js";
import path from "path"
import { UploadToCloudinary } from "../utils/cloudinary.js";

export async function HandleImageToText(req, res, next) {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const worker = await createWorker('eng');
  const imagePath = path.resolve(req.file.path)
  console.log(imagePath)
  try {
    const { data } = await worker.recognize(imagePath);
    req.ocrText = data.text;
    (await worker).terminate

    next();

  } catch (error) {
    (await worker).terminate
    return res.status(500).json({message: error});
  }
}
