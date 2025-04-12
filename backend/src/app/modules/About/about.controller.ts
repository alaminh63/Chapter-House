import { NextFunction, Request, RequestHandler, Response } from "express";
import { aboutServices } from "./about.service";

// Create About Section
const createAboutSection: RequestHandler = async (req, res, next) => {
  try {
    const sectionData = req.body;
    const creationResult = await aboutServices.addAboutIntoDB(sectionData);

    res.status(201).json({
      success: true,
      message: "About section created successfully",
      statusCode: 201,
      data: creationResult,
    });
  } catch (error: any) {
    next(error);
  }
};

// Retrieve All About Sections
const fetchAllAboutSections = async (req: Request, res: Response) => {
  try {
    const sections = await aboutServices.getAllAbout();
    res.status(200).json({
      // Changed to 200 OK
      success: true,
      message: "About sections retrieved successfully",
      statusCode: 200,
      data: sections,
    });
  } catch (error) {
    res.status(500).json({
      // Changed to 500 Internal Server Error
      success: false,
      message: "Failed to retrieve about sections",
      statusCode: 500,
      error: error,
      stack: "error stack", // Consider removing in production
    });
  }
};

// Modify About Section
const modifyAboutSection = async (req: Request, res: Response) => {
  try {
    const sectionId = req.params.id;
    const updates = req.body;

    const updateResult = await aboutServices.updatAboutIntoDB(
      sectionId,
      updates
    );

    res.status(200).json({
      message: "About section updated successfully",
      success: true,
      data: updateResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update about section",
      success: false,
      data: error,
    });
  }
};

export const aboutControllers = {
  addAbout: createAboutSection, // Aliased
  getAllAbout: fetchAllAboutSections, // Aliased
  updateAbout: modifyAboutSection, // Aliased
};
