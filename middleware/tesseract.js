import { createWorker } from "tesseract.js";

export async function HandleImageToText(req, res, next) {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const worker = createWorker();

  try {

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const { data } = await worker.recognize(req.file.path);
    req.ocrText = data.text;

    await worker.terminate();
    next();

  } catch (error) {
    await worker.terminate();
    return res.status(500).json({ error: "OCR failed", details: err.message });
  }
}
