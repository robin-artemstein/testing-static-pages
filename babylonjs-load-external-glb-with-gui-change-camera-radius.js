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

    var btn1 = BABYLON.GUI.Button.CreateSimpleButton("button2", "Change camera position");
    btn1.width = 0.25; // 0.2 = 20%
    btn1.height = "40px";
    btn1.cornerRadius = 20;
    btn1.color = "white";
    btn1.thickness = 4;
    btn1.background = "blue";

    btn1.top = 200; //200 px
    btn1.left = "10%";
    btn1.onPointerClickObservable.add(() => {
        camera.radius = 0.5;
    });
    advancedTexture.addControl(btn1);
 
 
    return scene;

};
export default createScene
