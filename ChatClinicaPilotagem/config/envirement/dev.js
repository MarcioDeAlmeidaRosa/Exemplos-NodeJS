module.exports = {
    fb: {
        URI_POST_DEFAULT: 'https://graph.facebook.com/v2.6/me/',
        TOKEN_ACCESS_PAGE: process.env.TOKEN_ACCESS_PAGE || 'EAAIVXVLEfjIBAH0hZAu92UZBw953QNzFWOPg3ZCTurZBJx71jYsOIG6uAPLNX4AonpAQbyPbegsMNpcKdJvml5UTGTVyJmtM5Rm5Epe0XzQqzKSFLLIZAyQrjZBGb0JzStRzsUUl19zLyMW7P5MHGmw7FoCsUZBQWFVaxkqyvOh3wZDZD'
    },
    db: {
        uri: process.env.URI_DB || 'mongodb://localhost:27017/chatClinicaPilotagem_local',
        options: {
            user: '',
            pass: ''
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || true
    }
};