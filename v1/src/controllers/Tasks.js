const { insert, list, modify, remove, findOne } = require("../services/Tasks");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const TaskService = require("../services/Tasks");
const service = new TaskService();
class Task{
 index(req, res){
  service.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      console.log(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

 create(req, res){
  req.body.user_id = req.user;
  service.insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

 update(req, res){
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "ID Bilgisi eksik",
    });
  }

  service.modify(req.body, req.params?.id)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

 deleteTask(req, res){
  if (req.params?.id == null) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "ID bilgisi eksik" });
  }
  service.remove(req.params?.id)
    .then((response) => {
      if (!response) {
        res.status(httpStatus.NOT_FOUND).send({ error: "Proje bulunamadı" });
      }

      res.status(httpStatus.OK).send({ message: "işlem başarılı" });
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("beklenmedik bir hata oluştu");
    });
};

 makeComment(req, res){
  service.findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "işlem bulunamadı" });
      console.log(mainTask);

      const comment = {
        ...req.body,
        commented_at: new Date(),
        user_id: req.user,
      };

      mainTask.comments.push(comment);

      mainTask
        .save()
        .then((response) => {
          res.status(httpStatus.OK).send(response);
        })
        .catch((e) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });

  return false;
  req.body.user_id = req.user;
  req.body.commented_at = new Date();
};

 deleteComment(req, res){
  // console.log("taskId",req.params.taskId);
  // console.log("commentId",req.params.commentId);
  // console.log("refactor _id",_id);
  service.findOne({ _id: req.params.taskId })
    .then((mainTask) => {
      console.log("öncesi", mainTask.comments);
      console.log(req.params);
      if (!mainTask)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "işlem bulunamadı" });
      mainTask.comments = mainTask.comments.filter(
        (c) => c._id.toString() !== req.params.commentId
      );
      console.log("sonrası", mainTask.comments);

      mainTask
        .save()
        .then((response) => {
          res.status(httpStatus.OK).send(response);
        })
        .catch((e) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

 addSubTask(req, res) {
  service.findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "işlem bulunamadı" });

      req.body.user_id = req.user;
      service.insert(req.body)
        .then((response) => {
          mainTask.sub_tasks.push(response);
          mainTask
            .save()
            .then((response) => {
              res.status(httpStatus.OK).send(response);
            })
            .catch((e) => {
              res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
              console.log("error",e)
            });
        })
        .catch((e) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
          console.log("error",e)
        });
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      console.log("error",e)
    });

    
};

 fetchTask(req, res){
  service.read({ _id: req.params.id })
    .then((mainTask) => {
    res.status(httpStatus.OK).send(mainTask);
    }).catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
  }
}
module.exports = new Task();
