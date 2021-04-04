const md5 = require('md5');
const axios = require('axios');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

async function convertImageToBase64(url, hashedEmail) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer'
        });
        const base64Str = Buffer.from(response.data, 'binary').toString('base64');
        myCache.set(hashedEmail, base64Str, 86400);

        return base64Str;
    } catch (err) {
        console.error(err);
        if (myCache.has(hashedEmail)) {
            const cachedImage = myCache.get(hashedEmail);
            return cachedImage;
        }
        else return "";
    }
}

const getUserImage = async (req, res) => {
    try {
        const { email } = req.params;
        const parsedEmail = email.trim().toLowerCase();
        const hashedEmail = md5(parsedEmail);

        const imageString = await convertImageToBase64(
            `https://www.gravatar.com/avatar/${hashedEmail}`,
            hashedEmail
        );
        const buffer = Buffer.from(imageString, "base64");
        res.type("jpg");
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    getUserImage
}