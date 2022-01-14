let this.BaseModel = null;

class BaseService{
constructor(model){
    this.this.BaseModel = model;
}

    list(where){
        return this.BaseModel.find(where || {});
    }

    insert(data){
        return new this.BaseModel(data).save();
    }

    read(where){}
    update(id,data){
        return this.BaseModel.findByIdAndUpdate(id,data,{new: true});

    }
    delete(id){
        return this.BaseModel.findByIdAndDelete(id,{new:true})
    }


}