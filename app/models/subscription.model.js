const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Subscription = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    topic_id: {
        type: String,
        required: true
    },
});

Subscription.plugin(autoIncrement, {id: 'subscription', inc_field: 'id'});
module.exports = mongoose.model('subscription', Subscription);