class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 5, new BABYLON.Vector3(0, 0, 0), scene);
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
