module.exports = {
    fb: {
        URI_POST_DEFAULT: 'https://graph.facebook.com/v2.6/me/',
        TOKEN_ACCESS_PAGE: process.env.TOKEN_ACCESS_PAGE || 'EAAIVXVLEfjIBAHdh2Ie2qgonVzKJ3CHLZCpwJNqvoQUpvDgHkXkEla2N9CKHNHcPGN2v1CvmYhDQHKmGczHOFR1aZA9RQ17kApQsXmsj4J9vMVCrwkooVbIGTlX6cZCJ71HHSA9GmpuE2zzIET0CN8r2NOitsVojJ88FvIPKQZDZD'
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