const cache = require("./../lib/cache");
const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const { initialize } = require("../whatsapp");
const { sendBlastMessage } = require("../controllers/blast");
const {
  checkDestination,
  checkConnectionBeforeBlast,
} = require("../lib/middleware");

// Serve main page
router.get("/", (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// Authentication routes
router.post("/backend-logout", controllers.deleteCredentials);
router.post("/backend-generate-qr", controllers.createInstance);
router.post("/backend-initialize", initialize);

// Message sending routes
router.post(
  "/backend-send-list",
  checkDestination,
  controllers.sendListMessage
);
router.post(
  "/backend-send-template",
  checkDestination,
  controllers.sendTemplateMessage
);
router.post(
  "/backend-send-button",
  checkDestination,
  controllers.sendButtonMessage
);
router.post("/backend-send-media", checkDestination, controllers.sendMedia);
router.post("/backend-send-text", checkDestination, controllers.sendText);

// Group and blast routes
router.post("/backend-getgroups", controllers.fetchGroups);
router.post("/backend-blast", checkConnectionBeforeBlast, sendBlastMessage);

// Cache management
router.post("/backend-clearCache", async (req, res) => {
  await cache.myCache.flushAll();
  console.log("Cache cleared");
  return res.json({ status: "success" });
});

module.exports = router;
