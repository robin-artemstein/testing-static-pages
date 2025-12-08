export const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    // Get the engine and canvas elements provided by the playground environment
    var engine = BABYLON.Engine.LastCreatedEngine;
    var canvas = engine.getRenderingCanvas();
    
    // The rest of the logic goes inside this function
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
    // Note: You need to make sure the GUI extension is loaded in the playground.
    // The playground usually loads the necessary extensions automatically if referenced.
    const adt = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const modalContainer = new BABYLON.GUI.Rectangle();
    modalContainer.width = "40%";
    // We set initial visibility to false, so it starts hidden.
    modalContainer.isVisible = false; 
    // Set height to auto or fixed value, "100%" makes it take the whole screen which might be too big if you want padding.
    modalContainer.height = "430px"; 
    modalContainer.cornerRadius = 15;
    modalContainer.color = "White";
    modalContainer.thickness = 2;
    modalContainer.background = "#333333";
    adt.addControl(modalContainer);

    const stackPanel = new BABYLON.GUI.StackPanel();
    modalContainer.addControl(stackPanel);

    const content = new BABYLON.GUI.TextBlock();
    content.text = "Instruction... \n\n Rotate\nLeft click + Drag (Mouse)\nOne finger + drag (Touch) \n\n Zoom\nScrolling (Mouse)\nTwo fingers pinch (Touch) \n\n Pan\nRight click + Drag (Mouse)\nTwo fingers drag (Touch)";
    content.color = "white";
    content.fontSize = 23;
    content.textWrapping = true;
    content.width = 0.9;
    content.height = "370px";
    stackPanel.addControl(content);

    const closeButton = BABYLON.GUI.Button.CreateSimpleButton("closeButton", "Close");
    closeButton.width = "100px";
    closeButton.height = "40px";
    closeButton.color = "white";
    closeButton.background = "blue"; // Give the button some background
    closeButton.cornerRadius = 5;
    closeButton.paddingTop = "1px";
    closeButton.paddingBottom = "5px"
    // Use an arrow function for clean scope and readability in modern JS
    closeButton.onPointerUpObservable.add(() => {
        modalContainer.isVisible = false; // Hide modal when clicked
    });
    stackPanel.addControl(closeButton);

    // Sphere Click Handler
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
            // Check if the picked mesh is our sphere
            if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh === sphere) {
                modalContainer.isVisible = true; // Show modal when sphere is clicked
            }
        }
    });

    // Return the scene object, which the playground will then render
    return scene;
};
