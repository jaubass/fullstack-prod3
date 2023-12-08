import { URL } from 'url';

function uploadHandler(req, res) {
    console.log('Request received at /upload', req.files, req.method);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.json({ status: "error", text: "No files were uploaded." });
    }

    const subjectFile = req.files.subjectFile;
    const __dirname = new URL('..', import.meta.url).pathname;
    console.log("dirname", __dirname);
    const uploadPath = __dirname + 'public/upload/' + subjectFile.name;
    const path = '/upload/' + subjectFile.name;

    // Use the mv() method to place the file somewhere on your server
    subjectFile.mv(uploadPath, function (err) {
      if (err) {
        console.log("Error al cargar archivo", err);
        return res.status(500).send(err);
      }

      res.json({ status: "ok", text: "File uploaded!", path });
    });
}


export default uploadHandler;