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