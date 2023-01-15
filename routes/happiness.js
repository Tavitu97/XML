const express = require('express');
const happinessRouter = express.Router();

// requiring all the happiness controller for CRUD logic
const {
    getAllCountriesAndHappiness,
    getAllCountriesAndHappinessById,
    postCountryAndHappiness,
    updateCountryAndHappiness,
    deleteCountryAndHappiness
} = require('../controller/happiness');

happinessRouter.get('/', getAllCountriesAndHappiness);
happinessRouter.get('/:id', getAllCountriesAndHappinessById);
happinessRouter.post('/', postCountryAndHappiness);
happinessRouter.put('/:id',updateCountryAndHappiness);
happinessRouter.delete('/:id',deleteCountryAndHappiness);

module.exports = happinessRouter;