"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutServices = void 0;
const about_model_1 = require("./about.model");
// Add a new about section to the database
const createAboutSectionInDB = (sectionData) => __awaiter(void 0, void 0, void 0, function* () {
    const creationResult = yield about_model_1.aboutModel.create(sectionData);
    return creationResult;
});
// Retrieve all about sections from the database
const retrieveAllAboutSections = () => __awaiter(void 0, void 0, void 0, function* () {
    const sections = yield about_model_1.aboutModel.find();
    return sections;
});
// Update an existing about section in the database
const updateAboutSectionInDB = (sectionId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSection = yield about_model_1.aboutModel.findByIdAndUpdate({ _id: sectionId }, updateData, {
        new: true,
        runValidators: true, // Ensure validators run during update
    });
    return updatedSection;
});
exports.aboutServices = {
    addAboutIntoDB: createAboutSectionInDB, // Aliased
    getAllAbout: retrieveAllAboutSections, // Aliased
    updatAboutIntoDB: updateAboutSectionInDB, // Aliased
};
