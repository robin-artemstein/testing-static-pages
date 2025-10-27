export const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    // Create a default skybox with an environment
    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
    // Load GLB model
    const katana =  BABYLON.AppendSceneAsync("https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/Katana5.glb", scene);
    // Create default camera and light in the scene
    scene.createDefaultCameraOrLight(true, true, true);
    const camera = scene.activeCamera;
    if (camera && camera instanceof BABYLON.ArcRotateCamera) {
        // Use safely the unique feature for ArcRotateCamera...
        camera.alpha = - Math.PI / 2;
        camera.beta = Math.PI / 2;
        camera.radius = 1.5;
        camera.wheelPrecision = 500;
    } else {
    console.error("The activeCamera does not support ArcRotateCamera...");
}

    return scene;
};
