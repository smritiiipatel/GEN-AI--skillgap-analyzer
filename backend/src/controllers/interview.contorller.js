import pdf2json from "pdf2json";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interview.report.model.js";

function extractTextFromPDF(buffer) {
    return new Promise((resolve, reject) => {
        const parser = new pdf2json()
        parser.on("pdfParser_dataReady", (data) => {
            const text = data.Pages.map(page =>
                page.Texts.map(t => {
                    try {
                        return decodeURIComponent(t.R[0].T)
                    } catch(e) {
                        return t.R[0].T
                    }
                }).join(" ")
            ).join("\n")
            resolve(text)
        })
        parser.on("pdfParser_dataError", reject)
        parser.parseBuffer(buffer)
    })
}

export async function generateInterviewResponse(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file required" })
        }
        const resumeText = await extractTextFromPDF(req.file.buffer)
        const { selfDescription, jobDescription } = req.body
        if (!selfDescription || !jobDescription) {
            return res.status(400).json({ message: "selfDescription and jobDescription required" })
        }
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        })
        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("Interview generation error:", error)
        res.status(500).json({ 
            message: "Something went wrong", 
            error: error.message 
        })
    }
}

export async function getInterviewReortById(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        })
        if (!interviewReport) {
            return res.status(404).json({ message: "interview report not found" })
        }
        res.status(200).json({
            message: "interview report fetched successfully",
            interviewReport
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

export async function getAllReport(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQusetion -behaviourQuestion -skillGaps -preparationPlan")
        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}