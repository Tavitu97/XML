const dbConnect = require('../dbConnect');

// for validating json schema
const JsonValidator = require('jsonschema').Validator;
const v = new JsonValidator();

// for validating xml schema
const xml = require("object-to-xml");
const libxml = require('libxmljs2');

// importing the electricity schema
const electricitySchemaJson = require('../schemaForValidation/electricity_JSON');
v.addSchema(electricitySchemaJson);
const electricitySchemaXml = require('../schemaForValidation/electricity_XSD');
const xmlDoc = libxml.parseXmlString(electricitySchemaXml);

// get all countries and electricity consumption
exports.getAllCountriesAndElectricityConsumption = (req, res, next) => {
    dbConnect.query('SELECT * FROM electricity',(err, electricity) => {
        if(err) {
            next(err)
        } else {
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml( {electricityConsumption: electricity}));
            }
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({electricityConsumption: electricity});
            }
        }
    });
};

// get all countries and electricity consumption by id
exports.getAllCountriesAndElectricityConsumptionById = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json'){
        const id = req.params.id;

        dbConnect.query('SELECT * FROM electricity WHERE id = ' + id, (err, electricity)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).json({electricityConsumption: {electricity}})
            }
        });
    }
    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        dbConnect.query('SELECT * FROM electricity WHERE id = ' + id, (err, electricity)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({electricityConsumption: electricity}));
            }
        });
    }
};

// post
exports.postCountryAndElectricityConsumption = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {

        const country = req.body.country;
        const percentage = req.body.percentage;

        try {
            v.validate(req.body, electricitySchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const electricityDetails = {
            country: country,
            percentage: percentage
        };

        dbConnect.query('INSERT INTO electricity SET ?', electricityDetails, (err) => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({electricityConsumption: req.body});
            }
        })
    }

    if(req.get('Content-Type') === 'application/xml') {
        const electricityXmlData = libxml.parseXmlString(req.body);

        const country = electricityXmlData.get('//country');
        const percentage = electricityXmlData.get('//percentage');

        if(electricityXmlData.validate(xmlDoc)) {
            const electricityDetails = {
                country: country.text(),
                percentage: percentage.text()
            };
            dbConnect.query('INSERT INTO electricity SET ?', electricityDetails, (err) => {
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

// update
exports.updateCountryAndElectricityConsumption = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;
        const country = req.body.country;
        const percentage = req.body.percentage;

        try {
            v.validate(req.body, electricitySchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const electricityDetails = {
            country: country,
            percentage: percentage,
        };

        dbConnect.query('UPDATE electricity SET ? WHERE id = ' + id, electricityDetails, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({electricityConsumption: req.body});
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const electricityXmlData = libxml.parseXmlString(req.body);

        const country = electricityXmlData.get('//country');
        const percentage = electricityXmlData.get('//percentage');

        if(electricityXmlData.validate(xmlDoc)) {
            const id = req.params.id;

            const electricityDetails = {
                country: country.text(),
                percentage: percentage.text(),
            };
            dbConnect.query('UPDATE electricity SET ? WHERE id = ' + id, electricityDetails, (err) => {
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
exports.deleteCountryAndElectricityConsumption = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        dbConnect.query('DELETE FROM electricity WHERE id = ' + id, (err)  => {
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

        dbConnect.query('DELETE FROM electricity WHERE id = ' + id, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
};