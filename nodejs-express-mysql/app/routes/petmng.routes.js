module.exports = app => {
    const pets = require("../controllers/petmng.controller.js");
  
    var router = require("express").Router();
  
    //  CREER UN PET
    router.post("/pets/", pets.createOnePet);

    // RECHERCHER UN PET PAR ID
    router.get("/pets/:pet_id", pets.findOnePet);


    //RECUPERER TOUS LES noms de PETS
    router.get("/pets/", pets.findAllPet);
  
    // AFFICHE TOUS LES ANIMAUX QUI NE SONT PAS RESERVES
    router.get("/notreserved/", pets.findNotReserved);
  
    // MODIFIE UN PET
    router.put("/pets/:pet_id", pets.updatePet);
  
    // SUPPRIMER UN PET
    router.delete("/pets/:pet_id", pets.deletePet);
  
/*

    // CREER UN ADOPTANT
    router.post("/adopters/", pets.createOneAdopter);

    // RECHERCHER UN ADOPTER PAR ID
    router.get("/adopters/:adopt_id", pets.findOneAdopter);

    // LISTE TOUS LES NOMS DES ADOPTANTS
    router.get("/adopters/", pets.findAllAdopter);

    //MODIFIE UN ADOPTANT
    router.put("/adopters/:adopt_id", pets.updateAdopter);

    // SUPPRIMER UN ADOPTANT
    router.delete("/adopters/:adopt_id", pets.deleteAdopter);


    // LISTE TOUS LES NOMS DE REFUGES
    router.get("/shelters/", pets.findShelters);

  */
    app.use('/api/petmng', router);
  };