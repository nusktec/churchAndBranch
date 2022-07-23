var express = require('express');
var router = express.Router();

const { 
    getIndex,
    getDocuments, 
    getPendingDoc, 
    getDocument,
    createDocument,
    addARecord,
    deleteDocument,
    deleteRecord,
    approvedDoc,
    login,
    getWhoIs,
    createHelper,
    getHelpers,
    deleteHelper
} = require('../controller/branch');
const { protect } = require('../middleware/authgraud');

// Ping Router
router.get("/", getIndex);


router.post("/login/", login);
router.get("/whoisme", protect, getWhoIs);

router.get("/access/create/", protect, createHelper);
router.get("/access/manage/", protect, getHelpers);
router.delete("/access/revoke/:helper", protect, deleteHelper);

router.get("/documents/", protect, getDocuments);
router.get("/documents/pending/", protect, getPendingDoc);
router.get("/document/get/:doc", protect, getDocument);
router.post("/document/create/", protect, createDocument);
router.delete("/document/delete/:doc/", protect, deleteDocument);
router.post("/document/add/:doc/", protect, addARecord);
router.delete("/document/remove/:rec/", protect, deleteRecord);
router.put("/document/approved/:doc/", protect, approvedDoc);

// Modify Branch == Never Really Understood This 
//TODO: ...

module.exports = router;