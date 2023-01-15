const express = require('express');
const electricityConsumptionRouter = express.Router();

// requiring all the electricity controller for CRUD logic
const {
        getAllCountriesAndElectricityConsumption,
        getAllCountriesAndElectricityConsumptionById,
        postCountryAndElectricityConsumption,
        updateCountryAndElectricityConsumption,
        deleteCountryAndElectricityConsumption
} = require('../controller/electricity');

electricityConsumptionRouter.get('/', getAllCountriesAndElectricityConsumption);
electricityConsumptionRouter.get('/:id', getAllCountriesAndElectricityConsumptionById);
electricityConsumptionRouter.post('/', postCountryAndElectricityConsumption);
electricityConsumptionRouter.put('/:id',updateCountryAndElectricityConsumption);
electricityConsumptionRouter.delete('/:id',deleteCountryAndElectricityConsumption);

module.exports = electricityConsumptionRouter;
