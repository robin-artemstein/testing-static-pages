class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        //Create scene and light
        const scene = new BABYLON.Scene(engine);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        //Load external GLB model from GitHub
        BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/", "Katana4.glb", scene).then((result) => {
                // Retrieve the loaded model (assuming the model is the first root node)
                const model = result.meshes[0];

                // Setting coordinate position for the loaded model, for instance, move it to (x: -0.25, y: -01, z: 0)
                model.position = new BABYLON.Vector3(-0.25, -0.1, 0);

                // Optional: Setting scaling for the loaded model (if the model is too small or too large)
                model.scaling = new BABYLON.Vector3(1, 1, 1); // 按需求調整縮放比例

                // Optional: Setting rotation for the loaded model (in radians)
                model.rotation = new BABYLON.Vector3(0, Math.PI / 1, 0); // Rotate 90 degrees along the Y-axis.
            }).catch((error) => {
                console.error("Model loading failed:", error);
            });
        //Create the the default camera in the scene.
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        camera.alpha = -Math.PI / 2;
        camera.beta =  Math.PI / 2;;
        camera.radius = 1.5;

        return scene;
    }
}
export { Playground };
