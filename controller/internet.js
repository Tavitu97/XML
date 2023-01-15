const dbConnect = require('../dbConnect');

// for validating json schema
const JsonValidator = require('jsonschema').Validator;
const v = new JsonValidator();

// for validating xml schema
const xml = require("object-to-xml");
const libxml = require('libxmljs2');

// importing the internet schema
const internetSchemaJson = require('../schemaForValidation/internet_JSON');
v.addSchema(internetSchemaJson);
const internetSchemaXml = require('../schemaForValidation/internet_XSD');
const xmlDoc = libxml.parseXmlString(internetSchemaXml);

// get all countries and internet usage
exports.getAllInternetCountries = (req, res, next) => {
    dbConnect.query('SELECT * FROM internet',(err, internet) => {
        if(err) {
            next(err)
        } else {
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml( {Countries: internet}));
            }
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({Countries: internet});
            }
        }
    });
};

// get all countries and internet usage by id
exports.getAllInternetCountriesById = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json'){
        const id = req.params.id;

        dbConnect.query('SELECT * FROM internet WHERE id = ' + id, (err, country)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).json({Countries: {country}})
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        dbConnect.query('SELECT * FROM internet WHERE id = ' + id, (err, country)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({Countries: country}));
            }
        });
    }
};

// post
exports.postInternetCountry = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const internet_users = req.body.internet_users;
        const population = req.body.population;
        const percentage = req.body.percentage;

        try {
            v.validate(req.body, internetSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const internetDetails = {
            country: country,
            internet_users: internet_users,
            population: population,
            percentage: percentage,
        };

        dbConnect.query('INSERT INTO internet SET ?', internetDetails, (err) => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({Countries: req.body});
            }
        })
    }

    if(req.get('Content-Type') === 'application/xml') {
        const internetXmlData = libxml.parseXmlString(req.body);

        const country = internetXmlData.get('//country');
        const internet_users = internetXmlData.get('//internet_users');
        const population = internetXmlData.get('//population');
        const percentage = internetXmlData.get('//percentage');

        if(internetXmlData.validate(xmlDoc)) {
            const internetDetails = {
                country: country.text(),
                internet_users: internet_users.text(),
                population: population.text(),
                percentage: percentage.text(),
            };
            dbConnect.query('INSERT INTO internet SET ?', internetDetails, (err) => {
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
exports.updateInternetCountry = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const internet_users = req.body.internet_users;
        const population = req.body.population;
        const percentage = req.body.percentage;

        try {
            v.validate(req.body, internetSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const internetDetails = {
            country: country,
            internet_users: internet_users,
            population: population,
            percentage: percentage,
        };

        dbConnect.query('UPDATE internet SET ? WHERE id = ' + id, internetDetails, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({Countries: req.body});
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const internetXmlData = libxml.parseXmlString(req.body);

        const country = internetXmlData.get('//country');
        const internet_users = internetXmlData.get('//internet_users');
        const population = internetXmlData.get('//population');
        const percentage = internetXmlData.get('//percentage');

        if(internetXmlData.validate(xmlDoc)) {
            const id = req.params.id;

            const internetDetails = {
                country: country.text(),
                internet_users: internet_users.text(),
                population: population.text(),
                percentage: percentage.text(),
            };
            dbConnect.query('UPDATE internet SET ? WHERE id = ' + id, internetDetails, (err) => {
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
exports.deleteInternetCountry = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        dbConnect.query('DELETE FROM internet WHERE id = ' + id, (err)  => {
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

        dbConnect.query('DELETE FROM internet WHERE id = ' + id, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
};