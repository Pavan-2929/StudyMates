import Material from "../models/material.model.js";

export const getMaterials = async (req, res, next) => {
  try {
    const allMaterials = await Material.find();

    res.status(200).json(allMaterials);
  } catch (error) {
    next(error);
  }
};

export const createMaterial = async (req, res, next) => {
  try {
    const { title, description, materialURL } = req.body;

    const newMaterial = await Material.create({
      title,
      description,
      materialURL,
    });

    res.status(200).json(newMaterial);
  } catch (error) {
    next();
    console.log(error);
  }
};

export const deleteMaterial = async (req, res, next) => {
    try {
        const id = req.params.id

        await Material.findByIdAndDelete(id)

        res.status(200).json("Material deleted")
    } catch (error) {
        next(error)
    }
}

export const updateMaterial = async (req, res, next) => {
    try {
        const id = req.params.id

        await Material.findByIdAndUpdate(id, {$set: req.body})

        res.status(200).json("Material Updated")
    } catch (error) {
        console.log(error);
    }
}

export const getMaterial = async (req, res, next) => {
    try {
        const material = await Material.findById(req.params.id)

        res.status(200).json(material)
    } catch (error) {
        console.log(error);
    }
}