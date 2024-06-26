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


export const getAllNews = async (req, res) => {
    try{
        const newItems = await News.find();
        res.status(200).json(newItems);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};

export const deleteNews = async (req, res) => {
    try {
        const { _id } = req.body;
        const deleteNews = await News.findByIdAndUpdate(_id, { $set: { showFlag: false } }, { new: true });
        if (!deleteNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ message: "News deleted" });  
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateNews = async (req, res) => {
    try{
        const {author, content, _id, title, preview } = req.body;
        const updateFile = await News.findByIdAndUpdate(
            _id, 
            { $set: { preview: preview, author: author, content: content, title: title } },
            { new: true }
          );
        if (!updateFile) {
            return res.status(404).send({ message: "News not found" });
        }
        res.json(updateFile)
    } catch(err){
        res.status(500).json({ error: err.message })
    }
}