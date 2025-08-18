export default async function getFiles(sandbox, dirPath = ".") {
    try {
        const res = await sandbox.commands.run(
            `find ${dirPath} \\( -path "*/node_modules/*" -o -path "*/.git/*" \\) -prune -o -type f -print`
        );

        const filePaths = res.stdout.trim().split("\n").filter(Boolean);

        const files = {};
        for (const filePath of filePaths ) {
            const contentRes = await sandbox.commands.run(`cat ${filePath}`);
            files[filePath] = contentRes.stdout;
        }

        return {
            message: "files with content fetched success!",
            result: files,
        };
    } catch (err) {
        console.error("Error fetching files:", err);
        throw new Error("Failed to fetch files from sandbox");
    }
}
