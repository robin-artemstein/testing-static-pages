class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        //scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
        scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4)

        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 1.5,  Math.PI / 1.5, 0, BABYLON.Vector3.Zero(), scene);
        // This attaches camera to the canvas
        camera.attachControl(canvas, true);
        //This limit camera zooming
        camera.lowerRadiusLimit = 1.35;
        camera.upperRadiusLimit = 50;

        //Create spot light
        var pointLight = new BABYLON.PointLight("pl", camera.position, scene);

        //Load skybox HDRI
        const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
        const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

        //Load object from GitHub
        const katana = BABYLON.AppendSceneAsync("https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/Katana3.glb", scene);

        return scene;
    }
}
export { Playground };
