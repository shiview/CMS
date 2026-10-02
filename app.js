const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

// MongoDB configuration
const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);

let postsCollection;

// EJS configuration
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
async function connectDB() {
    await client.connect();

    const database = client.db("cms_lab");
    postsCollection = database.collection("posts");

    console.log("Connected to MongoDB");
}

// Home page - display all posts
app.get("/", async (req, res) => {
    try {
        const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
        const filter = search ? { title: { $regex: search, $options: "i" } } : {};
        const posts = await postsCollection
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        res.render("posts", { posts, search });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading posts");
    }
});

// Create post page
app.get("/posts/new", (req, res) => {
    res.render("new-post", { error: null });
});

// Create new post
app.post("/posts", async (req, res) => {
    try {
        const { title, content, author } = req.body;

        // Validation
        if (!title || !title.trim()) {
            return res.render("new-post", {
                error: "Title cannot be empty."
            });
        }

        if (!content || !content.trim()) {
            return res.render("new-post", {
                error: "Content cannot be empty."
            });
        }

        if (!author || !author.trim()) {
            return res.render("new-post", {
                error: "Author cannot be empty."
            });
        }

        // Insert post into MongoDB
        await postsCollection.insertOne({
            title: title.trim(),
            content: content.trim(),
            author: author.trim(),
            createdAt: new Date()
        });

        // Redirect to home page
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post");
    }
});

// Individual post
app.get("/posts/:id", async (req, res) => {
    try {
        const post = await postsCollection.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!post) {
            return res.status(404).send("Post not found");
        }

        res.render("post", { post });
    } catch (error) {
        console.error(error);
        res.status(400).send("Invalid post ID");
    }
});

// Start application
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });