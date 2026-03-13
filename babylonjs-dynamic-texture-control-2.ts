class Playground {
    public static async CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): Promise<BABYLON.Scene> {
        // Create the Scene
        var scene = new BABYLON.Scene(engine);
    
        // Create the the default camera and set activeCamera as ArcRotateCamera in the scene
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        // Arc rotate camera setting
        camera.alpha = -Math.PI / 4;
        camera.beta =  Math.PI / 4;
        camera.radius = 15;
        // Limit zooming speed for touch devices
        camera.pinchPrecision = 0.005;
        camera.pinchDeltaPercentage = 0.005;
        // Limit Zooming speed for mouse
        camera.wheelPrecision = 0.005;
        camera.wheelDeltaPercentage = 0.005;
        // Limit panning speed for both of mouse and touch devices
        camera.panningSensibility = 5000; // Panning speed setting, smaller means faster pannin

        // Load GLB model from the public GitHub repository
        // Asynchronous load model with ImportMeshAsync to ensure subsequent operations can access the model content
        const modelUrl = "https://raw.githubusercontent.com/changhejeong/web-assets-hotlink/main/terrian-ice-field-v1.glb";
        const result = await BABYLON.SceneLoader.ImportMeshAsync("", "", modelUrl, scene);
    
        // Get the model's main node (typically the first mesh)
        const terrain = result.meshes[0];

        // Set the coordinate position for the loaded model
        terrain.position = new BABYLON.Vector3(0, 1, 0);
        // Set the scaling ratio for the loaded model
        terrain.scaling = new BABYLON.Vector3(1, 1, 1);
        // Set the rotation angle for the loaded model
        terrain.rotation = new BABYLON.Vector3(0, Math.PI / 1, 0);

        // Create the dynamic texture
        // Parameter：name, resolution (1024*1024), scene, booleans for mipmaps generation
        var dynamicTexture = new BABYLON.DynamicTexture("dynamicTex", 1024, scene, true);
        var ctx = dynamicTexture.getContext(); // Get the drawing context for the canvas

        // Create a material and apply a dynamic texture
        var material = new BABYLON.StandardMaterial("mat", scene);
        material.diffuseTexture = dynamicTexture;
        // Uncomment this line of code if you want the image contains a alpha channel
        //material.diffuseTexture.hasAlpha = true;
        // Transparency in Diffuse Maps
        material.useAlphaFromDiffuseTexture = true;
    
        // Apply the new material to the mesh
        result.meshes.forEach(mesh => {
            if (mesh.material) {
                mesh.material = material;
            }
        });

        // Load and draw external images onto the canvas
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = "https://i.imgur.com/aSvywaE.png";
    
        img.onload = function() {
            // Clear the background ensure it is transparent
            ctx.clearRect(0, 0, 512, 512);
        
            // Draw the image onto the canvas （X-axis, Y-axis, width, height）
            ctx.drawImage(img, 5, 5, 300, 300);
        
            // Update the texture
            dynamicTexture.update();
        };

        return scene;
    }
}
export { Playground };
