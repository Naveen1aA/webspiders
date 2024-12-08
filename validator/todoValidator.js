const Joi = require('joi');

// Joi validation schema
const taskSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().allow(null, ''),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').default('TODO'),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH'),
    dueDate: Joi.date().iso().allow(null)
});

module.exports = { taskSchema };
