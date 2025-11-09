class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // Get references to canvas, which are automatically set up in the Playground environment.
        const scene = new BABYLON.Scene(engine);

        //Create the the default camera in the scene.
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        camera.alpha = -Math.PI / 2;
        camera.beta =  Math.PI / 2;
        camera.radius = 1.5;
        camera.lowerRadiusLimit = 0.25;
        camera.upperRadiusLimit = 10;


        // Store a reference to the loaded model animation group; it will be used later.
        let katanaAnimationGroup = null;

        // Load the GLB model from the specified URL
        const modelURL = "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/";
        const modelName = "Katana3.glb";
    
        BABYLON.SceneLoader.ImportMesh("", modelURL, modelName, scene, function (meshes, particleSystems, skeletons, animationGroups) {
            // Callback function after loading completes

            // The loaded model may be large or small; it is scaled here to fit the scene.
            meshes[0].scaling = new BABYLON.Vector3(2, 2, 2);

            // Save the reference of the animation group
            katanaAnimationGroup = animationGroups[0];
            console.log("模型和動畫已成功載入:", katanaAnimationGroup.name);

            // Set the current frame number to 1 (Babylon.js uses a 0-based frame index, so the first frame is actually index 0).
            // Use the setCurrentFrame() method to move the model to a specific pose.
            katanaAnimationGroup.pause(); // Pause immediately
            katanaAnimationGroup.goToFrame(1); // Jump to frame 1 (index 1)

        });

        // Create a button GUI
        // Create an Advanced Dynamic Texture (ADT) to draw a 2D GUI over the scene.
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // Create a stack panel to hold the controls vertically
        const stackPanel = new BABYLON.GUI.StackPanel();
        stackPanel.width = "200px";
        stackPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        stackPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(stackPanel);

        // Create the text block (displaying the number)
        const textBlock = new BABYLON.GUI.TextBlock();
        textBlock.text = "0";
        textBlock.color = "white";
        textBlock.fontSize = 24;
        textBlock.height = "50px";
        stackPanel.addControl(textBlock);

        // Create the horizontal slider
        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 0;
        slider.maximum = 100;
        slider.value = 0;
        slider.height = "20px";
        slider.width = "200px";
        slider.isVertical = false; // Ensure horizontal
        slider.isPointerBlocker = true; // Ensure the slider captures pointer (mouse/touch) events
        stackPanel.addControl(slider);

        // Update the text block when slider value changes
        slider.onValueChangedObservable.add(function (value) {
            let textNumber = Math.round(value)
            console.log(textNumber + " is " + typeof textNumber);
            textBlock.text = textNumber.toString(); // Round to nearest integer for display
            if (katanaAnimationGroup) {
                console.log("When the button is clicked, the animation moves to frame 55.");

                // Stop any playing animation.
                katanaAnimationGroup.goToFrame(textNumber); 
                katanaAnimationGroup.pause();
            } else {
                console.log("The model has not been loaded, so animation operations cannot be performed.");
            }
        });

        // Returning the scene object is the standard practice required by Playground.
        return scene;
    }
}
export { Playground };
