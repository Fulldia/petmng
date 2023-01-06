const Pet = require("../models/petmng.model.js");
//const Adopter = require("../models/petmng.model.js");

//  CREER UN PET et SAVE DANS LA DB
exports.createOnePet = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a PET
  const pet = new Pet({
    pet_name: req.body.pet_name,
    animal: req.body.animal,
    breed: req.body.breed,
    birthdate: req.body.birthdate,
    reserved: req.body.reserved || false,
    shelter: req.body.shelter,
    arrival_date: req.body.arrival_date,
    depart_date: req.body.depart_date,
    image: req.body.image,
    //adopt_id: req.body.adopt_id
  });

  // Save PET in the database
  Pet.createPet(pet, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pet."
      });
    else res.send(data);
  });
};

// RECHERCHER UN PET PAR ID
exports.findOnePet = (req, res) => {
    Pet.findPetById(req.params.pet_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found pet with id ${req.params.pet_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving pet with id " + req.params.pet_id
            });
          }
        } else res.send(data);
      });
};

//RECUPERER TOUS LES noms de PETS  (avec ou sans condition)
exports.findAllPet = (req, res) => {
    const pet_name = req.query.pet_name;

    Pet.getAllPet(pet_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pets."
        });
      else res.send(data);
    });
  };
  
  // AFFICHE TOUS LES ANIMAUX QUI NE SONT PAS RESERVES
  exports.findNotReserved = (req, res) => {
    Pet.getNotReserved((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pets."
        });
      else res.send(data);
    });
};


// MODIFIE UN PET IDENTIFIE PAR SON ID
exports.updatePet = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pet.updatePetById(
    req.params.pet_id,
    new Pet(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pet with id ${req.params.pet_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating pet with id " + req.params.pet_id
          });
        }
      } else res.send(data);
    }
  );
  
};

//SUPPRIMER UN PET
exports.deletePet = (req, res) => {
    Pet.removePet(req.params.pet_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found pet with id ${req.params.pet_id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete pet with id " + req.params.pet_id
            });
          }
        } else res.send({ message: `pet was deleted successfully!` });
      });
};

/*


//  CREER UN ADOPTANT
exports.createOneAdopter = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a adoptant
  const adopter = new Adopter({
    adopt_id: req.body.adopt_id,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    birthdate: req.body.birthdate,
    address: req.body.address,
    postalcode: req.body.postalcode,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email
  });

  // Save adopt in the database
  Adopter.createAdopter(adopter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the adopter."
      });
    else res.send(data);
  });
};

// RECHERCHER UN ADOPT PAR ID
exports.findOneAdopter = (req, res) => {
  Adopter.findAdopterById(req.params.adopt_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pet with id ${req.params._id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving pet with id " + req.params.adopt_id
        });
      }
    } else res.send(data);
  });
};

//RECUPERER TOUS LES ADOPTANTS
exports.findAllAdopter = (req, res) => {
  const lastname = req.query.lastname;

  Adopter.getAllAdopter(lastname, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adopters."
      });
    else res.send(data);
  });
};
//LISTER LES NOMS PRENOM DE TOUS LES ADOPTANTS

// MODIFIE UN adoptant IDENTIFIE PAR SON ID
exports.updateAdopter = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Adopter.updateAdopterById(
    req.params.adopt_id,
    new Adopter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found adopter with id ${req.params.adopt_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating adopter with id " + req.params.adopt_id
          });
        }
      } else res.send(data);
    }
  );
};

//SUPPRIMER UN adoptant
exports.deleteAdopter = (req, res) => {
  Adopter.removeAdopter(req.params.adopt_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found adopter with id ${req.params.adopt_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete adopter with id " + req.params.adopt_id
        });
      }
    } else res.send({ message: `adopter was deleted successfully!` });
  });
};


// LISTE TOUS LES NOMS DE REFUGES
exports.findShelters = (req, res) => {
  const shelter = req.query.shelter;

  Pet.getAllShelters(shelter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shelters."
      });
    else res.send(data);
  });
};*/
