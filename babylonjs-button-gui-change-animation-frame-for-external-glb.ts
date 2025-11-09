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
        
            // The animation stop at the 1st frame by default
            // Stop all animations
            katanaAnimationGroup.stop(); 

            // Set the current frame number to 1 (Babylon.js uses a 0-based frame index, so the first frame is actually index 0).
            // Use the setCurrentFrame() method to move the model to a specific pose.
            katanaAnimationGroup.play(false); // Play once to initialize the animation track
            katanaAnimationGroup.pause(); // Pause immediately
            katanaAnimationGroup.goToFrame(1); // Jump to frame 1 (index 1)

        });

        // Create a button GUI
        // Create an Advanced Dynamic Texture (ADT) to draw a 2D GUI over the scene.
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // Create a button control options
        const button = BABYLON.GUI.Button.CreateSimpleButton("moveButton", "Move to Frame 55");
        button.width = "150px";
        button.height = "40px";
        button.color = "white";
        button.background = "blue";
        button.alpha = 0.8;
        // Align the button vertically to the bottom.
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button.paddingBottom = "20px";

        // Add a click event handler to the button
        button.onPointerUpObservable.add(function () {
            if (katanaAnimationGroup) {
                console.log("When the button is clicked, the animation moves to frame 55.");

                // Stop any playing animation.
                katanaAnimationGroup.goToFrame(55); 
                katanaAnimationGroup.stop();
            } else {
                console.log("The model has not been loaded, so animation operations cannot be performed.");
            }
        });

        // Add the button to the ADT so that it appears on the screen.
        advancedTexture.addControl(button);

        // Returning the scene object is the standard practice required by Playground.
        return scene;
    }
}
export { Playground };
