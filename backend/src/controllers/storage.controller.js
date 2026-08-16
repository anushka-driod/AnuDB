const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

let downloadCount = 0;


// ===============================
// Get Files
// ===============================
async function getFiles(req, res) {

    try {

        const files = fs.readdirSync(uploadDir)
            .map((name) => {

                const filePath = path.join(
                    uploadDir,
                    name
                );

                const stats = fs.statSync(filePath);

                return {
                    name,
                    size: stats.size,
                    date: stats.mtime
                };

            })
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );

        res.json({
            success: true,
            files
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


// ===============================
// Get Storage Statistics
// ===============================
async function getStats(req, res) {

    try {

        const files = fs.readdirSync(uploadDir);

        let totalBytes = 0;
        let fileCount = 0;

        files.forEach((name) => {

            const filePath = path.join(
                uploadDir,
                name
            );

            const stats = fs.statSync(filePath);

            if (stats.isFile()) {

                fileCount++;
                totalBytes += stats.size;

            }

        });

        console.log("STORAGE STATS:", {
            files: fileCount,
            totalBytes,
            downloads: downloadCount
        });

        res.json({

            success: true,

            stats: {
                files: fileCount,
                usedBytes: totalBytes,
                downloads: downloadCount
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


// ===============================
// Download File
// ===============================
async function downloadFile(req, res) {

    console.log(
        "DOWNLOAD REQUEST RECEIVED:",
        req.params.fileName
    );

    try {

        const fileName =
            path.basename(
                req.params.fileName
            );

        const filePath =
            path.join(
                uploadDir,
                fileName
            );

        if (!fs.existsSync(filePath)) {

            console.log(
                "FILE NOT FOUND:",
                filePath
            );

            return res.status(404).json({
                success: false,
                message: "File not found"
            });

        }

        // Count download immediately
        downloadCount++;

        console.log(
            "DOWNLOAD COUNT:",
            downloadCount
        );

        res.download(
            filePath,
            fileName
        );

    } catch (error) {

        console.error(
            "DOWNLOAD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


// ===============================
// Delete File
// ===============================
async function deleteFile(req, res) {

    try {

        const fileName =
            path.basename(
                req.params.fileName
            );

        const filePath =
            path.join(
                uploadDir,
                fileName
            );

        if (!fs.existsSync(filePath)) {

            return res.status(404).json({
                success: false,
                message: "File not found"
            });

        }

        fs.unlinkSync(filePath);

        res.json({
            success: true,
            message: "File deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


// ===============================
// Export Controllers
// ===============================
module.exports = {
    getFiles,
    getStats,
    downloadFile,
    deleteFile
};