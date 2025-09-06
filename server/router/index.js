const cache = require("./../lib/cache"),
  express = require("express"),
  router = express.Router(),
  controllers = require("../controllers"),
  { initialize } = require("../whatsapp"),
  { sendBlastMessage } = require("../controllers/blast"),
  {
    checkDestination,
    checkConnectionBeforeBlast,
  } = require("../lib/middleware");

router.get("/", (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.post("/backend-logout", controllers.deleteCredentials);
router.post("/backend-generate-qr", controllers.createInstance);
router.post("/backend-initialize", initialize);

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
router.post("/backend-send-media", checkDestination, controllers.sendFile);
router.post("/backend-send-text", checkDestination, controllers.sendText);
router.post("/backend-blast", checkConnectionBeforeBlast, sendBlastMessage);

router.post("/backend-getgroups", controllers.fetchGroups);

router.post("/backend-clearCache", async (req, res) => {
  await cache.myCache.flushAll();
  console.log("Cache cleared");
  res.json({ status: "success" });
});

module.exports = router;
