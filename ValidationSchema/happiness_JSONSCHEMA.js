const happinessSchema = {
    "title": "Happiness report",
    "description": "Contains a list of world countries and their happiness report",
    "type": "object",
    "properties": {
        "rank": {
            "type": "integer",
            "description": "The happiness rank of the country"
        },
        "country": {
            "type": "string",
            "description": "The name of the country"
        },
        "score": {
            "type": "integer",
            "description": "The happiness score of the country"
        },
    },
    "required": ["rank", "country", "score"]
};
module.exports = happinessSchema;