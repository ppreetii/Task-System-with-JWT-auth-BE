const path = require("path");

const Task = require("../db/models/task");

const { TaskSchema } = require("../utils/validation-schema/task");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ where: { user: req.user } });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const {taskId} = req.params;
    const task= await Task.findOne({ where: { id: taskId } });

    if(task){
        return res.status(200).json({ task });
    }

    return res.status(404).send({message: "No Task found with this ID"})
   
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    let { title, due_date } = req.body;
    let attachment = path.join(
      path.dirname(require.main.filename),
      req.file.path
    );
    let user = req.user;

    const validateReqBody = await TaskSchema.validateAsync(
      {
        title,
        due_date,
        attachment,
        user,
      },
      { abortEarly: false }
    );
    const task = await Task.create({
      title,
      due_date,
      attachment,
      user,
    });

    return res.status(201).json({ task });
  } catch (error) {
    if (error.isJoi) {
      error = error.details.map((err) => err.message).join(" ; ");
      return res.status(400).json({ ValidationError: error });
    }
    return res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    let { taskId } = req.params;
    let { title, due_date } = req.body;
    let attachment = path.join(
      path.dirname(require.main.filename),
      req.file.path
    );
    let user = req.user;

    const validateReqBody = await TaskSchema.validateAsync(
      {
        title,
        due_date,
        attachment,
        user,
      },
      { abortEarly: false }
    );

    const isExist = await Task.findOne({where: { id: taskId }});

    if (isExist) {
      const updatedTask = await Task.update(
        {
          title,
          due_date,
          attachment,
          user,
        },
        {
          where: { id: taskId }
        }
      );

      return res.status(200).json({message: "Task Updated"});
    }

    return res.status(404).send({message: "No Task found with this ID"});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deleted = await Task.destroy({
      where: { id: taskId },
    });

    if (deleted) {
      return res.status(200).json({ message: "Task deleted" });
    }
    return res.status(404).json({ message: "No Task found with this ID" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
