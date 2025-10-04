import { createWorker } from "tesseract.js";
import path from "path"

export async function HandleImageToText(req, res, next) {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const worker = await createWorker('eng');
  const imagePath = path.resolve(req.file.path)
  console.log(imagePath)
  try {
    const { data } = await worker.recognize(imagePath);
    console.log(data);
    (await worker).terminate
    next();

  } catch (error) {
    (await worker).terminate
    return res.status(500).json({message: error});
  }
}
