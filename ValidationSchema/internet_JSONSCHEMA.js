const internetSchema = 
{
    "title": "Countries and internet users",
    "description": "Contains a list of world countries by the number of internet users",
    "type": "object",
    "properties": {
        "country": {
            "type": "string",
            "description": "The name of the country"
        },
        "internet_users": {
            "type": "integer",
            "description": "The number of internet users"
        },
        "population": {
            "type": "integer",
            "description": "The population of the country"
        },
        "percentage": {
            "type": "integer",
            "description": "The percentage of the population which is using internet"
        },
    },
    "required": ["country", "internet_users", "population", "percentage"]
};
module.exports = internetSchema;