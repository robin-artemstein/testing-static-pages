class Playground {
    public static async CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): Promise<BABYLON.Scene> {
        // Create a new scene
        const scene = new BABYLON.Scene(engine);

        //Create the the default camera in the scene.
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        // Arc rotate camera setting
        camera.alpha = -Math.PI / 2;
        camera.beta =  Math.PI / 2;
        camera.radius = 1.5;
        camera.lowerRadiusLimit = 0.25;
        camera.upperRadiusLimit = 10;
        // Limit zooming speed for touch devices
        camera.pinchPrecision = 0.005;
        camera.pinchDeltaPercentage = 0.005;
        // Limit Zooming speed for mouse
        camera.wheelPrecision = 0.005;
        camera.wheelDeltaPercentage = 0.005;
        // Limit panning speed for both of mouse and touch devices
        camera.panningSensibility = 5000; // Panning speed setting, smaller means faster panning

        // Define the URL for the GLB model
        const modelUrl = "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/bullet-for-assult-2025-11-7-1.glb";

        // Load the GLB model asynchronously
        const importResult = await BABYLON.SceneLoader.ImportMeshAsync("", modelUrl, "", scene);

        // Get the loaded meshes
        const meshes = importResult.meshes;

        // Create a dynamic texture with size 1024x1024 (power of 2 for better performance)
        const dynamicTexture = new BABYLON.DynamicTexture("dynamicTexture", 1024, scene, true);
        const textureSize = 1024; // Size of the texture (width and height)

        // Get the 2D context to draw on the texture
        const context = dynamicTexture.getContext();

        // Define the URL for the external image
        const imageUrl = "https://i.imgur.com/ZyY3rbN.png";

        // Variables to track the image position and scale
        let posX = 0;
        let posY = 0;
        let scale = 1;
        let imgWidth = 0;
        let imgHeight = 0;

        // Function to redraw the image on the canvas
        const redraw = () => {
            // Clear the canvas to make background transparent
            context.clearRect(0, 0, textureSize, textureSize);
        
            // Draw the image at the current position and scale
            context.drawImage(img, posX, posY, imgWidth * scale, imgHeight * scale);
        
            // Update the dynamic texture in the scene
            dynamicTexture.update();
        };

        // Load the image asynchronously
        const img = new Image();
        img.crossOrigin = "anonymous"; // Allow cross-origin loading if needed
        img.src = imageUrl;
        await new Promise<void>((resolve) => {
            img.onload = () => {
                // Get the natural dimensions of the image
                imgWidth = img.width;
                imgHeight = img.height;
            
                // Center the image initially
                posX = (textureSize - imgWidth * scale) / 2;
                posY = (textureSize - imgHeight * scale) / 2;
            
                // Draw the initial image
                redraw();
                resolve();
            };
        });

        // Create a new PBR material with the specified properties
        const pbrMaterial = new BABYLON.PBRMaterial("pbrMaterial", scene);
        pbrMaterial.albedoColor = new BABYLON.Color3(1, 1, 1); // Base color white
        pbrMaterial.metallic = 1.0; // Fully metallic
        pbrMaterial.roughness = 0.1; // Low roughness for smoothness
        pbrMaterial.albedoTexture = dynamicTexture; // Attach the dynamic texture
        pbrMaterial.useAlphaFromAlbedoTexture = true; // Use alpha from texture for transparency
        pbrMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHABLEND; // Enable alpha blending

        // Apply the new material to all loaded meshes (override any existing materials)
        meshes.forEach((mesh) => {
            if (mesh.material) {
                mesh.material = pbrMaterial;
            }
        });

        // Create a fullscreen GUI
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

        // Create a stack panel to hold the controls
        const panel = new BABYLON.GUI.StackPanel();
        panel.width = "220px";
        panel.height = "200px";
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(panel);

        // Create a grid for the direction buttons
        const grid = new BABYLON.GUI.Grid();
        grid.width = "150px";
        grid.height = "120px";
        grid.addColumnDefinition(1 / 3);
        grid.addColumnDefinition(1 / 3);
        grid.addColumnDefinition(1 / 3);
        grid.addRowDefinition(1 / 3);
        grid.addRowDefinition(1 / 3);
        grid.addRowDefinition(1 / 3);
        panel.addControl(grid);

        // Up button
        const upButton = BABYLON.GUI.Button.CreateSimpleButton("up", "Up");
        upButton.width = 1;
        upButton.height = 1;
        upButton.color = "white";
        upButton.background = "blue";
        upButton.onPointerUpObservable.add(() => {
            posY -= 10;
            redraw();
        });
        grid.addControl(upButton, 0, 1); // Row 0, Column 1

        // Left button
        const leftButton = BABYLON.GUI.Button.CreateSimpleButton("left", "Left");
        leftButton.width = 1;
        leftButton.height = 1;
        leftButton.color = "white";
        leftButton.background = "blue";
        leftButton.onPointerUpObservable.add(() => {
            posX -= 10;
            redraw();
        });
        grid.addControl(leftButton, 1, 0); // Row 1, Column 0

        // Down button
        const downButton = BABYLON.GUI.Button.CreateSimpleButton("down", "Down");
        downButton.width = 1;
        downButton.height = 1;
        downButton.color = "white";
        downButton.background = "blue";
        downButton.onPointerUpObservable.add(() => {
            posY += 10;
            redraw();
        });
        grid.addControl(downButton, 2, 1); // Row 2, Column 1

        // Right button
        const rightButton = BABYLON.GUI.Button.CreateSimpleButton("right", "Right");
        rightButton.width = 1;
        rightButton.height = 1;
        rightButton.color = "white";
        rightButton.background = "blue";
        rightButton.onPointerUpObservable.add(() => {
            posX += 10;
            redraw();
        });
        grid.addControl(rightButton, 1, 2); // Row 1, Column 2

        // Create a slider for resizing the image
        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 0.1;
        slider.maximum = 2;
        slider.value = 1;
        slider.step = 0.1;
        slider.height = "20px";
        slider.width = "200px";
        slider.onValueChangedObservable.add((value) => {
            scale = value;
            // Recenter if needed, but for simplicity, just redraw at current position
            redraw();
        });
        panel.addControl(slider);

        // Return the scene
        return scene;
    }
}
export { Playground };
