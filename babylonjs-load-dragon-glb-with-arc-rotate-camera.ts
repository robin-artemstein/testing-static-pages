class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions a arc rotate camera (non-mesh)
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, BABYLON.Vector3.Zero(), scene);

        // This set the camera zomming speed
        camera.wheelPrecision = 50;

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
        BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/Georgia-Tech-Dragon/", "dragonUV.glb", scene).then((result) => {
            // Retrieve the loaded model (assuming the model is the first root node)
            const model = result.meshes[0];

            // Setting coordinate position for the loaded model, for instance, move it to (x: -0.25, y: -01, z: 0)
            model.position = new BABYLON.Vector3(0, 0, -2);

            // Optional: Setting scaling for the loaded model (if the model is too small or too large)
            model.scaling = new BABYLON.Vector3(10, 10, 10); // Adjust the zoom ratio as needed

            // Optional: Setting rotation for the loaded model (in radians)
            model.rotation = new BABYLON.Vector3(0, Math.PI / 1, 0); // Rotate 90 degrees along the Y-axis.
        }).catch((error) => {
            console.error("Model loading failed:", error);
        });


        return scene;
    }
}
export { Playground };
