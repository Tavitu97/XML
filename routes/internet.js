const express = require('express');
const internetRouter = express.Router();

// requiring all the internet controller CRUD logic
const {
    getAllInternetCountries,
    getAllInternetCountriesById,
    postInternetCountry,
    updateInternetCountry,
    deleteInternetCountry
} = require('../controller/internet');

internetRouter.get('/', getAllInternetCountries);
internetRouter.get('/:id', getAllInternetCountriesById);
internetRouter.post('/', postInternetCountry);
internetRouter.put('/:id',updateInternetCountry);
internetRouter.delete('/:id',deleteInternetCountry);

module.exports = internetRouter;