import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileDir = path.join(__dirname, "../public/images/");

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }

    console.log(`File ${filePath} has been successfully removed.`);
  });
}

function deleteImageByFilename(filename) {
  fs.unlink(`${fileDir}/${filename}`, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
    console.log(`File ${filename} has been successfully removed.`);
  });
}

export { deleteFile, deleteImageByFilename };
