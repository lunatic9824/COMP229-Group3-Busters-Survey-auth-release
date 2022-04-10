let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let ComponentSchema = new Schema({
    partID: String,
    name: String,
    description: String,
    price: Number
},
{
    collection: 'components'
});

module.exports.Model = Model('Component', ComponentSchema);