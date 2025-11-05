class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // Create scene
        const scene = new BABYLON.Scene(engine);
        // Add a arc rotate camera to the scene
        const camera = new BABYLON.ArcRotateCamera("Camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(70), 10, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        camera.inputs.clear();
        // Add a light to the scene.
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        // Add a sphere to the scene
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);
        sphere.position.y = 1;

        // --- GUI Setup ---
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const panel = new BABYLON.GUI.StackPanel();
        panel.width = "250px";
        panel.isVertical = false;
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(panel);
        //Label text block
        const label = new BABYLON.GUI.TextBlock();
        label.text = "Scale: 1.00";
        label.color = "white";
        label.width = "100px";
        label.paddingRight = "10px";
        panel.addControl(label);
        // Slider GUI
        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 1;
        slider.maximum = 3;
        slider.value = 1;
        slider.height = "20px";
        slider.width = "150px";
        slider.onValueChangedObservable.add(function (value) {
            sphere.scaling.x = value;
            sphere.scaling.y = value;
            sphere.scaling.z = value;
            label.text = `Scale: ${value.toFixed(2)}`;
        });
        panel.addControl(slider);
        // --- End GUI Setup ---

        return scene;
    }
}
export { Playground };
