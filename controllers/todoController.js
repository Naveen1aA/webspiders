const { taskSchema } = require('../validator/todoValidator');
const Task = require('../model/todoModel'); // Import Mongoose Task model

// Create a new task
exports.createTask = async (req, res) => {
    try {
        // Validate the payload using Joi
        const { error, value } = taskSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                error: 'Validation errors',
                details: error.details.map(err => err.message),
            });
        }
        
        // Save validated data to MongoDB using the Mongoose model
        const task = new Task(value);
        await task.save();

        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};




// Get all tasks with filters, sorting, and pagination
exports.getTasks = async (req, res) => {
    try {
        const { status, priority, sort, limit = 10, skip = 0 } = req.query;

        // Build query object for filtering
        const query = {};
        if (status) query.status = status;
        if (priority) query.priority = priority;

        // Build sort object for sorting
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':'); // Example: "createdAt:asc" or "dueDate:desc"
            sortOptions[field] = order === 'desc' ? -1 : 1;
        }

        // Fetch tasks with filtering, sorting, and pagination
        const tasks = await Task.find(query)
            .sort(sortOptions)
            .skip(parseInt(skip)) // Skip documents for pagination
            .limit(parseInt(limit)); // Limit the number of documents

        // Get total count for pagination metadata
        const totalTasks = await Task.countDocuments(query);
        
        res.json({
            tasks,
            pagination: {
                total: totalTasks,
                limit: parseInt(limit),
                skip: parseInt(skip),
                totalPages: Math.ceil(totalTasks / parseInt(limit)),
                currentPage: Math.floor(parseInt(skip) / parseInt(limit)) + 1,
            },
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


