const { insert, list, modify, remove } = require("../services/Projects");
const httpStatus = require("http-status");

const index = (req, res) => {
  list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      console.log(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const create = (req, res) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "ID Bilgisi eksik",
    });
  }

  modify(req.body, req.params?.id)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const deleteProject = (req, res) => {
  if (req.params?.id == null) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "ID bilgisi eksik" });
  }
  remove(req.params?.id)
    .then((response) => {

      if (!response) {
        res.status(httpStatus.NOT_FOUND).send({ error: "Proje bulunamadı" });
      }
      
      console.log("delted Project", response);
      res.status(httpStatus.OK).send({ message: "işlem başarılı" });
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("beklenmedik bir hata oluştu");
    });
};

module.exports = {
  create,
  index,
  update,
  deleteProject,
};
