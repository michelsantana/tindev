const Pet = require('../model/Pet');

module.exports = {
   async store(req, res) {
      const {user} = req.headers;
      const {petId} = req.params;

      const loggedPet = await Pet.findById(user);
      const targetPet = await Pet.findById(petId);

      if (!targetPet || !loggedPet) {
         return res.status(400).json({error: 'Pet not exists'});
      }

      loggedPet.dislikes.push(targetPet._id);

      await loggedPet.save();

      return res.json(loggedPet);
   },
};
