const httpStatus = require("http-status");
const SectionService = require("../services/Sections");
const service = new SectionService();
class Section{
 index(req, res)  {
  if(!req?.params?.projectId)
  {
    return res.status(httpStatus.BAD_REQUEST).send({error:"projectId parametresi gerekli"});
  }
  
  service.list({project_id:req.params.projectId})
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      console.log(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

 create(req, res) {
  req.body.user_id = req.user;
  service.insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

 update(req, res)  {
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

 deleteSection(req, res)  {
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
}
module.exports = Section;