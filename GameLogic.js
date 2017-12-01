
class GameLogic{
    constructor(){
        this.modelContainer = new modelsClass(renderer);
        this.loadModels();
    }

    setup(cam,controls){
        var modelContainer = this.modelContainer;
        var obj_frame_tree = this.modelTypes.tree;
        var obj_frame_cube = this.modelTypes.cube;
        // DefineModels.js
        modelContainer.addModelFrame(treeFrame);
        modelContainer.addModelFrame(cubeFrame);
        var tree1 = new Entity(obj_frame_cube);
        var cube1 = new Entity(obj_frame_cube);
        var cube2 = new Entity(obj_frame_cube);
        modelContainer.addModel(tree1);
        modelContainer.addModel(cube1);
        modelContainer.addModel(cube2);
        tree1.pos = [-1,0,-14,1];
        cube1.pos = [-1,1,-15,1];
        cube2.pos = [1,1,-18,1];
        cam.setEntity(tree1);
        controls.setPlayer(tree1);
        var stretchFactor = gl.getUniformLocation(shaderProgram, "stretch");

        for(var i=0;i<500;i++){
            var cubeNew = new Entity(obj_frame_cube);
            modelContainer.addModel(cubeNew);
            cubeNew.pos = [Math.random()*60-30,Math.random()*60-30,-Math.random()*100-10,1];
        }
    }

    loop(ticksms){
        var allModels = this.modelContainer.getAllModels();
        for(var i=1;i<allModels.length;i++){
            allModels[i].rot[0]+=0.03*Math.random();
            allModels[i].rot[1]+=0.03*Math.random();
            allModels[i].rot[2]+=0.03*Math.random();
        }
    }

    render(camMatrix){
        //gl.uniform1f(multi,timeC);
        this.modelContainer.render(camMatrix);
    }

    loadModels(){
        this.modelTypes = {
            tree:"tree",
            cube:"cube"
        }
    }

}