const mongoose = require('mongoose')

const restaurantAdminSchema = mongoose.Schema({
    user_id: { type: String },
    mobileNumber: { type: String },
    emailId: { type: String },

});
const Restaurantadmin = mongoose.model('Restaurantadmin', restaurantAdminSchema, 'Restaurants');
module.exports = Restaurantadmin;