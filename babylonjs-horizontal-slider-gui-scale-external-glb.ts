class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // Create a new scene
        var scene = new BABYLON.Scene(engine);

        // --- CAMERA SETUP ---
        // Create an ArcRotateCamera looking at the center of the scene
        // Parameters: name, alpha, beta, radius, target, scene
        var camera = new BABYLON.ArcRotateCamera(
            "camera",
            Math.PI / 2,
            Math.PI / 3,
            5,
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true); // Enable mouse/touch controls

        // --- LIGHT SETUP ---
        // Add a hemispheric light to softly illuminate the scene
        var light = new BABYLON.HemisphericLight(
            "hemiLight",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        light.intensity = 0.9;

        // --- MODEL LOADING ---
        // Load the external GLB model
        var modelUrl = "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/bullet-for-assult-2025-11-7-1.glb";

        var loadedMesh = null; // to store the loaded model

        BABYLON.SceneLoader.ImportMesh(
            "",               // mesh name (empty = load all)
            "",               // root URL (we pass full URL below)
            modelUrl,         // full model URL
            scene,
            function (meshes) {
                loadedMesh = meshes[0]; // the root mesh of the GLB
                loadedMesh.scaling = new BABYLON.Vector3(1, 1, 1);
                loadedMesh.position = new BABYLON.Vector3(0, 0, 0);
            },
            null,
            function (scene, message) {
                console.error("Error loading model:", message);
            }
        );

        // --- SLIDER GUI SETUP ---
        // Create a full-screen GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // Create a slider GUI
        var slider = new BABYLON.GUI.Slider();
        slider.minimum = 0.2;       // Minimum scale multiplier
        slider.maximum = 3.0;       // Maximum scale multiplier
        slider.value = 1;           // Default (normal size)
        slider.height = "20px";
        slider.width = "60%";
        slider.color = "white";
        slider.background = "gray";
        slider.borderColor = "black";

        // Position slider GUI at bottom of screen
        slider.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        slider.top = "-20px";

        // Add slider to GUI
        advancedTexture.addControl(slider);

        // --- SLIDER EVENT ---
        // When slider changes, scale the model accordingly
        slider.onValueChangedObservable.add(function (value) {
            if (loadedMesh) {
                loadedMesh.scaling.set(value, value, value);
            }
        });

        return scene;
    }
}
export { Playground };
