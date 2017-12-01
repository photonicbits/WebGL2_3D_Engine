
class modelFrame{
        constructor(vert,indices,type){
                this.vertices = vert;
                this.count = indices.length;
                this.size = 3;
                this.normalize = false;
                this.stride = 0;
                this.offset = 0;
                this.type = type;
                this.vao = null;
                this.indices = indices;
        }
}
// TODO implement better indexing method
class Entity{
        constructor(modelType){
                this.modelType = modelType;
                this.vao = null;
                this.pos = [0.0,0.0,0.0,1.0];
                this.rot = [0.0,0.0,0.0];
        }
}

class modelsClass{
        constructor(renderer){
                this.modelTypes = new Array();
                this.renderer = renderer;
        }
        addModelFrame(frame,frameName){
                this.renderer.addModelFrame(frame);
        }
        getModelFrame(frameName){
                return this.renderer.getModelFrame(frameName);
        }
        addModel(model){
                var modelFrame = this.renderer.getModelFrame(model.modelType);
                if(modelFrame==null){
                        console.log("Model frame does not yet exist. Please create it before creating a model of it.");
                        return;
                }
                if(this.modelTypes[model.modelType]==null){
                        this.modelTypes[model.modelType] = new Array();
                }
                model.type = modelFrame.type; 
                model.vao = modelFrame.vao;
                var list = this.modelTypes[model.modelType];
                list.push(model);
                JSON.stringify(model);
        }
        getAllModels(){
                var modelsList = new Array();
                for(var key in this.modelTypes){
                        var modelTypeTemp = this.modelTypes[key];
                        for(var y=0;y<modelTypeTemp.length;y++){
                                modelsList.push(modelTypeTemp[y]);
                        }
                }
                return modelsList;
        }
        getModelsForType(modelType){
                var modelsList = {};
                var modelTypeTemp = this.modelTypes[modelType];
                for(var y=0;y<modelTypeTemp.length;y++){
                        modelsList.push(modelTypeTemp[y]);
                }
                return modelsList;
        }
        getModelByTypeLists(){
                return this.modelTypes;
        }
        render(cameraMatrix){
               // this.renderer.prepare();
                this.renderer.renderArrayOfLists(this.modelTypes,cameraMatrix);
        }
}


