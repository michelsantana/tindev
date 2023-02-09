const { get } = require('mongoose');
const { find } = require('../model/Pet');
const Pet = require('../model/Pet');

module.exports = {
   async Save(pet){
      const response = await Pet.create(pet);
      return response;
   },
   async find(user){
      const response = await Pet.findById(user);
      return response;
   }
}