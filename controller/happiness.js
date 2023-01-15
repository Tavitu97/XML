const dbConnect = require('../dbConnect');

// for validating json schema
const JsonValidator = require('jsonschema').Validator;
const v = new JsonValidator();

// for validating xml schema
const xml = require("object-to-xml");
const libxml = require('libxmljs2');

// importing the happiness schema
const happinessSchemaJson = require('../schemaForValidation/happiness_JSON');
v.addSchema(happinessSchemaJson);
const happinessSchemaXml = require('../schemaForValidation/happiness_XSD');
const xmlDoc = libxml.parseXmlString(happinessSchemaXml);

// get all countries and happiness
exports.getAllCountriesAndHappiness = (req, res, next) => {
    dbConnect.query('SELECT * FROM happiness',(err, happiness) => {
        if(err) {
            next(err)
        } else {
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml( {Countries: happiness}));
            }
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({Countries: happiness});
            }
        }
    });
};

// get all countries and happiness by id
exports.getAllCountriesAndHappinessById = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json'){
        const id = req.params.id;

        dbConnect.query('SELECT * FROM happiness WHERE id = ' + id, (err, happiness)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).json({Countries: {happiness}})
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        dbConnect.query('SELECT * FROM happiness WHERE id = ' + id, (err, happiness)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({Countries: happiness}));
            }
        });
    }
};

//post
exports.postCountryAndHappiness = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const rank = req.body.rank;
        const country = req.body.country;
        const score = req.body.score;

        try {
            v.validate(req.body, happinessSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const happinessDetails = {
            rank: rank,
            country: country,
            score: score
        };

        dbConnect.query('INSERT INTO happiness SET ?', happinessDetails, (err) => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({Countries: req.body});
            }
        })
    }

    if(req.get('Content-Type') === 'application/xml') {
        const happinessXmlData = libxml.parseXmlString(req.body);

        const rank = happinessXmlData.get('//rank');
        const country = happinessXmlData.get('//country');
        const score = happinessXmlData.get('//score');

        if(happinessXmlData.validate(xmlDoc)) {
            const happinessDetails = {
                rank: rank.text(),
                country: country.text(),
                score: score.text()
            };
            dbConnect.query('INSERT INTO happiness SET ?', happinessDetails, (err) => {
                if(err) {
                    next(err)
                }
                else {
                    res.status(201).send(req.body);
                }
            });
        }
        else {
            res.status(401).send('Xml does not match with xsd schema');
        }
    }
};

//update
exports.updateCountryAndHappiness = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const rank = req.body.rank;
        const country = req.body.country;
        const score = req.body.score;

        try {
            v.validate(req.body, happinessSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const happinessDetails = {
            rank: rank,
            country: country,
            score: score,
        };

        dbConnect.query('UPDATE happiness SET ? WHERE id = ' + id, happinessDetails, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({Countries: req.body});
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const happinessXmlData = libxml.parseXmlString(req.body);

        const rank = happinessXmlData.get('//rank');
        const country = happinessXmlData.get('//country');
        const score = happinessXmlData.get('//score');

        if(happinessXmlData.validate(xmlDoc)) {
            const id = req.params.id;

            const happinessDetails = {
                rank: rank.text(),
                country: country.text(),
                score: score.text(),
            };
            dbConnect.query('UPDATE happiness SET ? WHERE id = ' + id, happinessDetails, (err) => {
                if(err) {
                    next(err)
                }
                else {
                    res.status(201).send(req.body);
                }
            });
        }
        else {
            res.status(401).send('Xml does not match with xsd schema');
        }
    }
};

// delete
exports.deleteCountryAndHappiness = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        dbConnect.query('DELETE FROM happiness WHERE id = ' + id, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send("Deleted successfully");
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        dbConnect.query('DELETE FROM happiness WHERE id = ' + id, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
};