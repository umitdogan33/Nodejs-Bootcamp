const ProjectService = require("../services/Projects");
const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
service = new ProjectService();

class Project{
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
  req.body.userId = req.user.id;
  service.insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

update(req, res,next){
  if (!req.params?.id) {
    return next(new ApiError("ID bilgisi eksik", httpStatus.BAD_REQUEST));
  }

  service.modify(req.body, req.params?.id)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      next(new ApiError(e?.message),e.status);
    });
};

deleteProject(req, res){
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
      
      console.log("delted Project", response);
      res.status(httpStatus.OK).send({ message: "işlem başarılı" });
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("beklenmedik bir hata oluştu");
    });
}
}
module.exports = new Project();
