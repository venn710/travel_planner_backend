const Restaurantadmin = require("../models/restaurant-admin");
const jsonwebtoken = require('jsonwebtoken');
const findAndSaveRegisterDetails = async (req, res, uid) => {
    let receivedBody = req.body;
    var emailId = receivedBody['email'];
    var customerType = receivedBody['customerType'];
    var generatedUserId = uid;
    var generalUserModel;
    switch (customerType) {
        case "RESTAURANT":
            var generalUserModel = new Restaurantadmin({
                user_id: generatedUserId,
                emailId: emailId
            });
            try {
                var count = await Restaurantadmin.find({ 'emailId': emailId }).count();
                if (count > 0) {
                    return res.status(400).json({
                        'message': 'user already exists please login'
                    });
                }
            } catch (error) {
                return res.status(400).send(err)
            }
            break;
        default:
            return res.status(404).send("Not found")
    }
    await generalUserModel.save().then((result) => {
        let data = {
            'email': emailId,
            'userId': generatedUserId
        };
        const token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY, {
            'expiresIn': "30000s"
        });
        return res.status(200).json({
            'data': result,
            'token': token
        });
    }).catch((err) => {
        return res.status(400).send("unable to create document")
    });
}

module.exports = { findAndSaveRegisterDetails }