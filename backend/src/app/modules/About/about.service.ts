import { aboutModel } from "./about.model";
import { TAbout } from "./about.interface";

// Add a new about section to the database
const createAboutSectionInDB = async (sectionData: TAbout) => {
  const creationResult = await aboutModel.create(sectionData);
  return creationResult;
};

// Retrieve all about sections from the database
const retrieveAllAboutSections = async () => {
  const sections = await aboutModel.find();
  return sections;
};

// Update an existing about section in the database
const updateAboutSectionInDB = async (
  sectionId: string,
  updateData: TAbout
) => {
  const updatedSection = await aboutModel.findByIdAndUpdate(
    { _id: sectionId },
    updateData,
    {
      new: true,
      runValidators: true, // Ensure validators run during update
    }
  );
  return updatedSection;
};

export const aboutServices = {
  addAboutIntoDB: createAboutSectionInDB, // Aliased
  getAllAbout: retrieveAllAboutSections, // Aliased
  updatAboutIntoDB: updateAboutSectionInDB, // Aliased
};
