const electricityConsumptionSchema = {
    "title": "electricity",
    "description": "Contains a list of world countries and their electricity consumption",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "The id of the country"
        },
        "country": {
            "type": "string",
            "description": "The name of the country"
        },
        "percentage": {
            "type": "integer",
            "description": "Electricity consumption in %"
        },
    },
    "required": ["country", "percentage"]
};
module.exports = electricityConsumptionSchema;