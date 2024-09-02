const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async (req, res)=>{
    try {
      const data = req.body // Assuming the request body contains the person data

      // Create a new Person document using the mongoose model
      const newPerson = new Person(data);
      // newPerson.name = data.name;
      // newPerson.age = data.age;
      // newPerson.work = data.work;
      // newPerson.mobile = data.mobile;
      // newPerson.email = data.email;
      // newPerson.address = data.address;
      // newPerson.salary = data.salary;

      // Save the new person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
      
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
      
    }
  })

// Get method to get the person
router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
      
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
      
    }
})

router.get('/:workType', async(req, res) => {
    try {
      const workType = req.params.workType; // Extract the work type form the URL parameter
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
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

  // Update
  router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the id from the URL parameter
      const updatedPersonData = req.body; // Updated data for the person
  
      // Find the person by ID and update with the new data, while running validators
      const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true,          // Return the updated document
        runValidators: true // Ensure that any schema validations are applied
      });
      
      if(!response){
        return res.status(404).json({error: 'Person not found'});
      }

      console.log('Data updated');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Delete
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter

    // Find the person by ID and remove it from the database
    const response = await Person.findByIdAndDelete(personId); //findByIdAndRemove

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data deleted');
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
