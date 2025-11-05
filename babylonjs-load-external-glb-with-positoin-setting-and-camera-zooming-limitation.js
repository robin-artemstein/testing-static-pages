export const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    // Create a default skybox with an environment
    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
    //Load external GLB model from GitHub
        BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/", "Katana4.glb", scene).then((result) => {
             // Retrieve the loaded model (assuming the model is the first root node)
            const model = result.meshes[0];

            // Setting coordinate position for loaded model, for instance, move it to (x: -0.25, y: -01, z: 0)
            model.position = new BABYLON.Vector3(-0.25, 0.0005, 0);

            // Optional: Setting scaling ratio for the loaded model (if the model is too small or too large)
            model.scaling = new BABYLON.Vector3(1, 1, 1); // Setting the scaling ratio

            // Optional: Setting rotation for the loaded model (in radians)
            model.rotation = new BABYLON.Vector3(0, Math.PI / 1, 0); // Rotate 90 degrees along the Y-axis.
        }).catch((error) => {
            console.error("Model loading failed:", error);
        });
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
