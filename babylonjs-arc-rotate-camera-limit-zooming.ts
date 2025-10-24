class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);
        //scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
        //scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4)

        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 3,  Math.PI / 3, 5, BABYLON.Vector3.Zero(), scene);
        // This attaches camera to the canvas
        camera.attachControl(canvas, true);
        //This limit camera zooming
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 50;

        //Create spot light
        var pointLight = new BABYLON.PointLight("pl", camera.position, scene);
        //Create box model and attend to the scene.
        var box = BABYLON.MeshBuilder.CreateBox("box", {height: 1}, scene);

        return scene;
    }
}
export { Playground };
