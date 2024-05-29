import News from "../models/News.js"

export const FileInsert = async (req, res) => {
    try {
        const { author, title, preview, content } = req.body;

        const newNews = new News({
            author,
            title,
            preview,
            content
        });

        const savedNews = await newNews.save();
        res.status(201).json(savedNews);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}
