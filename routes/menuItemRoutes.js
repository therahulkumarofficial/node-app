const express = require('express');
const router = express.Router();


const MenuItem = require('./../models/MenuItem');
const { route } = require('./personRoutes');

// Get method to get the menu

router.get('/', async (req, res) => {
    try {
      const menuOfHotel = await MenuItem.find();
      console.log('data of menu fetched');
      res.status(200).json(menuOfHotel);
      
      
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })
  
  // Post method to save the menu
  
  router.post('/', async (req, res)=>{
    try {
      const dataOfMenu = req.body // Assuming the request body contains the person data
  
      // Create a new Person document using the mongoose model
      const newMenu = new MenuItem(dataOfMenu);
      
      const response = await newMenu.save();
      console.log('data of menu saved');
      res.status(200).json(response);
      
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
      
    }
  })



// param menu routes
router.get('/:menuType', async(req, res) => {
  try {
    const menuType = req.params.menuType; // Extract the work type form the URL parameter
    if(menuType == 'sweet' || menuType == 'spicy' || menuType == 'sour'){
      const response = await MenuItem.find({taste: menuType});
      console.log('response fetched');
      res.status(200).json(response);

    }else{
      res.status(404).json({error: 'Invalid work type'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    
  }
})
module.exports = router;

