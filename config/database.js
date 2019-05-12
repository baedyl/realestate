let uri = 'mongodb://localhost/realestate-dev';

if (process.env.NODE_ENV === 'production') {
    uri = 'mongodb://admin:realestate101@ds155606.mlab.com:55606/realestate-prod';    
}

module.exports = {
    mongoURI: uri
}