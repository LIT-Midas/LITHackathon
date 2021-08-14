import express from "express";
import DocumentController from "../controllers/document.controller";
import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const router = express.Router();

const upload = multer({
  storage: multerS3({
      s3,
      bucket: `${process.env.AWS_BUCKET_NAME}`,
      cacheControl: 'max-age=31536000',
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname});
      },
      key: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    })
})

router.get("/", async (_req, res) => {
  const controller = new DocumentController();
  const response = await controller.getDocuments();
  return res.send(response);
});

router.post("/", upload.array('files'), async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.createDocument(req);
  return res.send({message: "Documents uploaded successfully!"})
});

router.get("/:id", async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.getDocument(req.params.id);
  if (!response) res.status(404).send({message: "No document found"})
  return res.send(response);
});

router.get("/claim/:id", async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.getClaimDocuments(req.params.id);
  if (!response) res.status(404).send({message: "No documents found"})
  return res.send(response);
});

router.get("/download/:id", async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.downloadDocument(req.params.id);
  if (!response) res.status(404).send({message: "No document found"})
  return res.send(response);
});

router.get("/presignedUrl/:id", async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.generateDocumentPresignedUrl(req.params.id);
  if (!response) res.status(404).send({ message: "No document found" })
  return res.send(response);
});

router.post("/bootstrap", async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.createS3Document(req.body);
  return res.send({message: "S3 Bootstrapped!"})
});

router.post("/:id", async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.updateDocument(req.params.id, req.body);
  if (!response) res.status(404).send({message: "No document found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new DocumentController();
  const response = await controller.deleteDocument(req.params.id);
  if (!response) res.status(404).send({message: "No document found"})
  return res.send({message: "Document deleted successfully!"});
});

export default router;