class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // Create scene and camera
        const scene = new BABYLON.Scene(engine);
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

        // Variable management
        let selectedMesh = null; // Selected box
        const projectors = []; // Saving all boxes

        // Gizmo
        const utilLayer = new BABYLON.UtilityLayerRenderer(scene);
    
        // Moving tool
        const positionGizmo = new BABYLON.PositionGizmo(utilLayer);
        positionGizmo.updateGizmoRotationToMatchAttachedMesh = false;
        // Moving gizmo will be larger
        positionGizmo.scaleRatio = 1.25;

        // Rotating tool
        const rotationGizmo = new BABYLON.RotationGizmo(utilLayer);
        // Rotating gizmo will be smaller
        rotationGizmo.scaleRatio = 1.0; 

        // Initialize the invisible gizmo.
        positionGizmo.attachedMesh = null;
        rotationGizmo.attachedMesh = null;

        // GUI panel
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // Menu
        const mainMenu = new BABYLON.GUI.StackPanel();
        mainMenu.width = "220px";
        mainMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        mainMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(mainMenu);

        // "Add a new box" button GUI
        const btnAdd = BABYLON.GUI.Button.CreateSimpleButton("btnAdd", "Add a box");
        btnAdd.height = "40px";
        btnAdd.color = "white";
        btnAdd.background = "orange";
        btnAdd.paddingTop = "10px";
        mainMenu.addControl(btnAdd);

        // Slider GUI and delet button GUI when the box is selected
        const editPanel = new BABYLON.GUI.StackPanel();
        editPanel.width = "200px";
        // They are invisible by default
        editPanel.isVisible = false;
        advancedTexture.addControl(editPanel);

        // Scaling slider
        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 0.1;
        slider.maximum = 5;
        slider.value = 1;
        slider.height = "20px";
        slider.width = "150px";
        slider.color = "orange";
        slider.onValueChangedObservable.add((value) => {
            if (selectedMesh) {
                selectedMesh.scaling.setAll(value);
            }
        });
        editPanel.addControl(slider);

        // Delete button GUI
        const btnDel = BABYLON.GUI.Button.CreateSimpleButton("btnDel", "Delete");
        btnDel.height = "35px";
        btnDel.width = "100px";
        btnDel.color = "white";
        btnDel.background = "red";
        btnDel.paddingTop = "10px";
        btnDel.onPointerUpObservable.add(() => {
            if (selectedMesh) {
                selectedMesh.dispose();
                deselectAll();
            }
        });
        editPanel.addControl(btnDel);

        // Functionality logics

        // Function for deselected box
        function deselectAll() {
            selectedMesh = null;
            positionGizmo.attachedMesh = null;
            rotationGizmo.attachedMesh = null;
            editPanel.isVisible = false;
        }

        // Function for selected box
        function selectMesh(mesh) {
            selectedMesh = mesh;
            positionGizmo.attachedMesh = mesh;
            rotationGizmo.attachedMesh = mesh;
        
            // Update the slider value to reflect the current scaling level.
            slider.value = mesh.scaling.x;
        
            // Make the GUI panel follow the object (update its position in screen space)
            editPanel.isVisible = true;
            scene.onBeforeRenderObservable.addOnce(() => {
                updateGuiPosition();
            });
        }

        // The logic for making the GUI follow the object
        function updateGuiPosition() {
            if (selectedMesh && editPanel.isVisible) {
                // Convert the world coordinates of an object to screen coordinates.
                const pos = BABYLON.Vector3.Project(
                    selectedMesh.getAbsolutePosition(),
                    BABYLON.Matrix.Identity(),
                    scene.getTransformMatrix(),
                    camera.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight())
                );
                // The UI appear slightly below the object
                editPanel.leftInPixels = pos.x - (engine.getRenderWidth() / 2);
                editPanel.topInPixels = pos.y - (engine.getRenderHeight() / 2) + 120;
            }
        }

        // Update GUI position
        scene.onBeforeRenderObservable.add(() => {
            updateGuiPosition();
        });

        scene.onPointerDown = (evt, pickResult) => {
            if (pickResult.hit && pickResult.pickedMesh && pickResult.pickedMesh.name === "projectorBox") {
                selectMesh(pickResult.pickedMesh);
            } else if (pickResult.hit && pickResult.pickedMesh.name === "ground") {
                deselectAll();
            }
        };

        // Button GUI to add an orange wireframe box
        btnAdd.onPointerUpObservable.add(() => {
            const box = BABYLON.MeshBuilder.CreateBox("projectorBox", { size: 1 }, scene);
            box.position = new BABYLON.Vector3(Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2);
        
            // Orange material setting
            const mat = new BABYLON.StandardMaterial("boxMat", scene);
            mat.emissiveColor = new BABYLON.Color3(1, 0.5, 0); // Orange color
            mat.wireframe = true;
            box.material = mat;

            projectors.push(box);
            selectMesh(box); // Automatically mark selected when added
        });

        // Create a ground model for observation
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
        ground.position.y = 0.01;

        return scene;
    }
}
export { Playground };
