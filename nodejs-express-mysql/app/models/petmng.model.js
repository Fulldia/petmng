//MODELE FONCTIONS CRUD

const sql = require("./db.js");



// constructors (chaque interface = une table)
const Pet = function(pet) {
  this.pet_id = pet.pet_id;
  this.pet_name = pet.pet_name;
  this.animal = pet.animal;
  this.breed = pet.breed;
  this.birthyear = pet.birthyear;
  this.reserved = pet.reserved;
  this.shelter = pet.shelter;
  this.arrival_date = pet.arrival_date;
  this.depart_date = pet.depart_date;
  this.image = pet.image;
  this.adopt_id = pet.adopt_id;
};

const Adopter = function(adopter){
  this.adopt_id = adopter.adopt_id;
  this.lastname = adopter.lastname;
  this.firstname = adopter.firstname;
  this.birthdate = adopter.birthdate;
  this.address = adopter.address;
  this.postalcode = adopter.postalcode;
  this.city = adopter.city;
  this.phone = adopter.phone;
  this.email = adopter.email;

}


//*************OPERATIONS CRUD SUR LES PETS*************//

//POST - CREER UN PET
Pet.createPet = (newPet, result) => {
  sql.query("INSERT INTO pets SET ?", newPet, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pets: ", { pet_id: res.insertId, ...newPet });
    result(null, { pet_id: res.insertId, ...newPet });
  });
};



//GET - RECHERCHER UN PET PAR ID
Pet.findPetById = (pet_id, result) => {
  sql.query(`SELECT * FROM pets WHERE pet_id = ${pet_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pet: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found pet with the id
    result({ kind: "not_found" }, null);
  });
};

//GET - RECUPERER TOUS LES PETS PAR RECHERCHE NOM
Pet.getAllByName = (pet_name, result) => {
  let query = "SELECT * FROM pets";

  if (pet_name) {
    query += ` WHERE pet_name LIKE '%${pet_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, result);
      return;
    }

    console.log("pets:", res);
    result(null, res);
  });
};

//GET - RECUPERER TOUS LES noms de PETS
  Pet.getAllPet = (pet_name, result) => {
    let query = "SELECT * FROM pets";
  
    if (pet_name) {
      query += ` WHERE pet_name LIKE '%${pet_name}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("pets: ", res);
      result(null, res);
    });
  };
  



//GET - AFFICHE TOUS LES ANIMAUX QUI NE SONT PAS RESERVES
Pet.getNotReserved = result => {
  sql.query("SELECT * FROM pets WHERE reserved=false", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("pets: ", res);
    result(null, res);
  });
};

//PUT - MODIFIE UN PET
Pet.updatePetById = (pet_id, pet, result) => {
  sql.query(
    "UPDATE pets SET pet_name = ?, animal = ?, breed = ?, birthyear = ?, reserved = ?, shelter = ?, arrival_date = ?, depart_date = ?, image = ?, adopt_id = ? WHERE pet_id = ?",
    [pet.pet_name, pet.animal, pet.breed, pet.birthyear, pet.reserved, pet.shelter, pet.arrival_date, pet.depart_date, pet.image, pet.adopt_id, pet_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Pet with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pets: ", { pet_id: pet_id, ...pet });
      result(null, { pet_id: pet_id, ...pet });
    }
  );
};

//DELETE - SUPPRIMER UN PET
Pet.removePet = (pet_id, result) => {
  sql.query("DELETE FROM pets WHERE pet_id = ?", pet_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pet with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pet with id: ", pet_id);
    result(null, res);
  });
};

//************OPERATIONS CRUD SUR LES ADOPTANTS***********//

/*

//POST - CREER UN ADOPTANT
Adopter.createAdopter = (newAdopter, result) => {
    sql.query("INSERT INTO adopters SET ?", newAdopter, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, res);
        return;
      }
  
      console.log("created adopter: ", { adopt_id: res.insertId, ...newAdopter });
      result(null, { adopt_id: res.insertId, ...newAdopter });
    });
  };
  
  //GET - RECHERCHER UN ADOPTER PAR ID
  Adopter.findAdopterById = (adopt_id, result) => {
    sql.query(`SELECT * FROM adopters WHERE adopt_id = ${adopt_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found adopt: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found adoptants with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  //GET - RECUPERER TOUS LES ADOPTANTS PAR RECHERCHE NOM
  Adopter.getAllAdopter = (lastname, result) => {
    let query = "SELECT * FROM adopters";
  
    if (pet_name) {
      query += ` WHERE lastname LIKE '%${lastname}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("adoptants:", res);
      result(null, res);
    });
  };
  
  
  //PUT - MODIFIE UN ADOPTANT
  Adopter.updateAdopterById = (adopt_id, adopter, result) => {
    sql.query(
      "UPDATE adopters SET lastname = ?, firstname = ?, birthdate = ?, address = ?, postalcode = ?, city = ?, phone = ?, email = ?",
      [adopter.lastname, adopter.firstname, adopter.birthdate, adopter.address, adopter.postalcode,adopter.city,adopter.phone,adopter.email, adopt_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Pet with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated adoptant: ", { adopt_id: adopt_id, ...adopter });
        result(null, { adopt_id: adopt_id, ...adopter });
      }
    );
  };
  
  //DELETE - SUPRRIMER UN ADOPTANT
  Adopter.removeAdopter = (adopt_id, result) => {
    sql.query("DELETE FROM adopters WHERE adopt_id = ?", adopt_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found pet with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted adopter with id: ", adopt_id);
      result(null, res);
    });
  };

  //GET - RECUPERER TOUS LES noms de adoptants
Adopter.getAllAdopterName = result => {
    sql.query("SELECT firstname, lastname FROM adopters", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("adopters: ", res);
      result(null, res);
    });
  };

  //************REFUGES**************//*/

//GET - LISTE TOUS LES NOMS DE REFUGES (refuge n'est pas une table)
Pet.getAllShelters = result => {
    sql.query("SELECT DISTINCT shelter FROM pets", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("shelters: ", res);
      result(null, res);
    });
  };
*/

//module.exports = Adopter;
module.exports = Pet;