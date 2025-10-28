var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.createDefaultCameraOrLight(true, true, true);
    const camera = scene.activeCamera;
    scene.createDefaultEnvironment();
    if (camera && camera instanceof BABYLON.ArcRotateCamera) {
        // Use safely the unique feature for ArcRotateCamera...
        camera.alpha = - Math.PI / 2;
        camera.beta = Math.PI / 2;
        camera.radius = 1.5;
        camera.wheelPrecision = 500;
    } else {
    console.error("The activeCamera does not support ArcRotateCamera...");
    }
    
    // Skybox
    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
    
    //Load GLB
    const katana =  BABYLON.AppendSceneAsync("https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/Katana5.glb", scene);

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var rect2 = BABYLON.GUI.Button.CreateSimpleButton("button2", "Change camera position");
    rect2.width = 0.25; // 0.2 = 20%
    rect2.height = "40px";
    rect2.cornerRadius = 20;
    rect2.color = "white";
    rect2.thickness = 4;
    rect2.background = "blue";

    rect2.top = 200; //200 px
    rect2.left = "10%";
    rect2.onPointerClickObservable.add(() => {
        camera.radius = 0.5;
    });
    advancedTexture.addControl(rect2);
 
 
    return scene;

};
export default createScene
