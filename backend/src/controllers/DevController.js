const axios = require('axios');
const Dev = require('../model/Dev');
module.exports = {
   async index(req, res) {
      const {user} = req.headers;
      const {all} = req.query;
      const loggedDev = await Dev.findById(user);

      if(all){
         return res.json(await Dev.find());
      }

      const users = await Dev.find({
         $and: [
            //Todas condições são &&
            {_id: {$ne: user}}, // id (n)ot (e)quals user
            {_id: {$nin: loggedDev.likes}}, // id (n)ot (in) user likes
            {_id: {$nin: loggedDev.dislikes}}, // id (n)ot (in) user dislikes
         ],
      });

      return res.json(users);
   },
   async store(req, res) {
      const {username} = req.body;

      const userExists = await Dev.findOne({user: username});

      if (userExists) {
         return res.json(userExists);
      }

      const result = await axios.get(
         `https://api.github.com/users/${username}`
      );

      const {name, bio, avatar_url: avatar} = result.data;

      const dev = await Dev.create({
         name,
         user: username,
         bio,
         avatar,
      });

      return res.json(dev);
   },
};
