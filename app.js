var express = require('express');

const bodyparser = require('body-parser');

var cors = require('cors')


var { mongoose } = require('./db/db');
var { document } = require('./schemas/document')
var { documentMaster } = require('./schemas/documentMaster')
var { testing } = require('./schemas/testing')

var app = express();

app.use(bodyparser.json({
    limit: '50mb'
}));

app.use(bodyparser.urlencoded({
    limit: '50mb',
    extended: true
}))

var port = process.env.DMS_PORT || process.env.PORT || 4000;

app.use(cors());


app.get('/documents', (req, res) => {
    documentMaster.find({"uniqueIdentifier":req.query.uniqueIdentifier}).then((docs) => {
        res.send(docs);
    })
});


app.get('/documents/:id', (req, res) => {
    id = req.params.id;
    documentMaster.findById(id, (err, documentMaster) => {
        document.find({ "documentMasterId": id }).then((docs) => {
            // res.contentType('image/jpg');
            // res.send(docs[0].binaryContent);
            res.writeHead(200, {
                'Content-Type': documentMaster.ext,
                'Content-disposition': 'attachment;name=' + documentMaster.name + ';filename=' + documentMaster.name,
            });
            res.end(
                Buffer.from(docs[0].binaryContent, 'binary')
            );
        })

    })
});


app.get('/documentMaster/:id', (req, res) => {
    id = req.params.id;

    documentMaster.findById(id, (err, documentMaster) => {
        res.send(documentMaster);
    })
});

app.post('/documents', (req, res) => {
    if (req.body.part == 1) {
        var docMaster = new documentMaster({
            name: req.body.name,
            ext: req.body.ext,
            total: req.body.total,
            totalSize: req.body.totalSize,
            uniqueIdentifier: req.body.uniqueIdentifier

        })
        docMaster.save().then((savedDocMaster) => {
            var doc = new document({
                binaryContent: req.body.binaryContent,
                total: req.body.total,
                part: req.body.part,
                size: req.body.size,
                documentMasterId: savedDocMaster._id
            })
            doc.save().then((savedDoc) => {
                res.send('{"documentMaster":"' + savedDocMaster._id + '","fragmentId":"' + savedDoc._id + '"}');
            })
        })
    } else {
        var doc = new document({
            binaryContent: req.body.binaryContent,
            total: req.body.total,
            part: req.body.part,
            size: req.body.size,
            documentMasterId: req.body.documentMasterId
        })
        doc.save().then((savedDoc) => {
            res.send('{"documentMaster":"' + req.body.documentMasterId + '","fragmentId":"' + savedDoc._id + '"}');
        })
    }
});

app.listen(port,"0.0.0.0", () => {
    console.log("Document Management Service started at:-", port);
})