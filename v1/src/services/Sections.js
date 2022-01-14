const Section = require("../models/SectionModel")

const insert = (sectionData) =>{
    const section = Section(sectionData)
    return section.save();
}

const  list  = (where) =>{
    return Section.find(where || {})
    .populate({
        path: "user_id",
            select: "email full_name profil_image"
        })
}

const modify = (data,id) =>{
return Section.findByIdAndUpdate(id,data,{new: true});
}

const remove = (id)=>{
    return Section.findByIdAndDelete(id,{new:true})
}

module.exports={
    insert,
    list,
    modify,
    remove
}
