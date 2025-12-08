class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        const scene = new BABYLON.Scene(engine);

        // Camera and Light setup
        const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

        // Create a sphere to click on to open the modal and make it pickable
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        sphere.position.y = 1;
        sphere.isPickable = true; // Ensure the mesh can be clicked

        // --- GUI Modal Logic ---
        const adt = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const modalContainer = new BABYLON.GUI.Rectangle();
        modalContainer.width = "700px";
        modalContainer.height = "500px";
        modalContainer.cornerRadius = 30;
        modalContainer.color = "White";
        modalContainer.thickness = 4;
        modalContainer.background = "#333333";
        modalContainer.isVisible = true;
        adt.addControl(modalContainer);

        const stackPanel = new BABYLON.GUI.StackPanel();
        modalContainer.addControl(stackPanel);

        const content = new BABYLON.GUI.TextBlock();
        content.text = "Click the button below to close this modal dialog.";
        content.color = "white";
        content.fontSize = 24;
        content.paddingTop = "5px";
        content.paddingBottom = "5px";
        content.textWrapping = true;
        content.width = 0.9;
        content.height = "100px";
        stackPanel.addControl(content);

        const closeButton = BABYLON.GUI.Button.CreateSimpleButton("closeButton", "Close");
        closeButton.width = "100px";
        closeButton.height = "40px";
        closeButton.color = "white";
        closeButton.background = "#007bff";
        closeButton.cornerRadius = 5;
        closeButton.paddingTop = "10px";
        closeButton.onPointerUpObservable.add(function () {
            modalContainer.isVisible = false; // Hide modal when clicked
        });
        stackPanel.addControl(closeButton);

        // FIX: Use the scene's pointer observable instead of ActionManager
        scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
                // Check if the picked mesh is our sphere
                if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh === sphere) {
                    modalContainer.isVisible = true; // Show modal when sphere is clicked
                }
            }
        });

        return scene;
    }
}
export { Playground };
