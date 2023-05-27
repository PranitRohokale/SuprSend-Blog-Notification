const Blog = require('../Models/Blog');
const Subscriber = require('../Models/Subscriber');
const { Suprsend } = require("@suprsend/node-sdk");
const { GenerateSummaryForBlog } = require("./chatgpt")

const NotifySubscriber = async (newBlog) => {
  let subscribers = await Subscriber.find({ isActive: true });
  subscribers = subscribers.map(({ email, id }) => ({ "distinct_id": id, "$email": [email] }))

  const summary = await GenerateSummaryForBlog(newBlog?.content)
  const trimmedContent = newBlog?.content.length > 220 ? newBlog?.content.slice(0, 220) + '...' : newBlog?.content;

  const data = {
    title: newBlog?.title,
    summary,
    content: trimmedContent,
    blog_url: `${process.env.CLIENT_URL}/blog/${newBlog?._id}`
  }
  // Prepare Workflow body
  const workflow_body = {
    "name": "My final workflow",
    "template": "new-blog",
    "notification_category": "system",
    "users": subscribers,
    // data can be any json
    "delivery": {
      "smart": true,
      "success": "Delivered",
      "time_to_live": "1s", // optional field
      "mandatory_channels": ["email"] // list of mandatory channels e.g ["email"]
    },
    data
  }

  const supr_client = new Suprsend(process.env.WORKSPACE_KEY, process.env.WORKSPCAE_SECRET)

  // Trigger workflow
  const response = supr_client.trigger_workflow(workflow_body) // returns promise
  response.then((res) => console.log("response", res));

  return true;
}

// Create blog controller
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { buffer } = req.file; // Access the file buffer

    // Create a new blog
    const newBlog = new Blog({
      title,
      content,
      image: buffer,
      authorId: req.user._id // Access the user ID from the authenticated request
    });

    // Save the blog to the database
    await newBlog.save();

    await NotifySubscriber(newBlog);

    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get a specific blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog by ID
    const blog = await Blog.findById(blogId).populate('authorId', 'email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    // Find all blogs
    const blogs = await Blog.find().populate('authorId', 'email');

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
