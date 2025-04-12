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
exports.aboutControllers = void 0;
const about_service_1 = require("./about.service");
// Create About Section
const createAboutSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectionData = req.body;
        const creationResult = yield about_service_1.aboutServices.addAboutIntoDB(sectionData);
        res.status(201).json({
            success: true,
            message: "About section created successfully",
            statusCode: 201,
            data: creationResult,
        });
    }
    catch (error) {
        next(error);
    }
});
// Retrieve All About Sections
const fetchAllAboutSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield about_service_1.aboutServices.getAllAbout();
        res.status(200).json({
            // Changed to 200 OK
            success: true,
            message: "About sections retrieved successfully",
            statusCode: 200,
            data: sections,
        });
    }
    catch (error) {
        res.status(500).json({
            // Changed to 500 Internal Server Error
            success: false,
            message: "Failed to retrieve about sections",
            statusCode: 500,
            error: error,
            stack: "error stack", // Consider removing in production
        });
    }
});
// Modify About Section
const modifyAboutSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectionId = req.params.id;
        const updates = req.body;
        const updateResult = yield about_service_1.aboutServices.updatAboutIntoDB(sectionId, updates);
        res.status(200).json({
            message: "About section updated successfully",
            success: true,
            data: updateResult,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update about section",
            success: false,
            data: error,
        });
    }
});
exports.aboutControllers = {
    addAbout: createAboutSection, // Aliased
    getAllAbout: fetchAllAboutSections, // Aliased
    updateAbout: modifyAboutSection, // Aliased
};
