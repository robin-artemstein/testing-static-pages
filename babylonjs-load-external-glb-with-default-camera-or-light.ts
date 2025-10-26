class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This loads an external asset from GitHub with defaut camera and light.
        BABYLON.ImportMeshAsync(
        "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/Katana3.glb",
        scene).then(function () {          
            scene.createDefaultCameraOrLight(true, true, true);
            scene.createDefaultEnvironment();
    });

        return scene;
    }
}
export { Playground };
