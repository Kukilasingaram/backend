import express from "express";

import {
  deleteEmails,
  getEmails,
  moveEmailsToBin,
  saveSentEmails,
  toogleStarredEmails,
} from "../controllers/email-controllers.js";

const routes = express.Router();

routes.post("/save", saveSentEmails);

routes.get("/emails/:type", getEmails);

routes.post("/save-draft", saveSentEmails);

routes.post("/bin", moveEmailsToBin);

routes.post("/starred", toogleStarredEmails);

routes.delete("/delete", deleteEmails);
export default routes;