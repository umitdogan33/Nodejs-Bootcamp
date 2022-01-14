const Section = require("../models/SectionModel")
const BaseService = require("./BaseService")
class SectionService extends BaseService{
    constructor() {
        super(Section)
    }
}
module.exports=SectionService;
