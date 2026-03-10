class Playground {
    public static async CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): Promise<BABYLON.Scene> {
        // Create the scene, camera, light, and enviroment
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        const env = scene.createDefaultEnvironment();

        // 1. Create a cyilnder default model
        const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 2, diameter: 2 }, scene);

        // 2. PBR material matting
        const pbr = new BABYLON.PBRMaterial("pbr", scene);
        pbr.albedoColor = new BABYLON.Color3(1, 1, 1);
        pbr.metallic = 1.0;
        pbr.roughness = 0.1;
        pbr.useAlphaFromAlbedoTexture = true; // Ensure the transparency of the dynamic texture is applied
        cylinder.material = pbr;

        // 3. Create the dynamic texture
        const texSize = 1024;
        const dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", texSize, scene, true);
        pbr.albedoTexture = dynamicTexture;

        // External image status
        let imgX = 0;
        let imgY = 0;
        let imgScale = 0.5; // 預設縮放比例
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "https://i.imgur.com/ZyY3rbN.png";

        // Arrow function for drawing iamge
        const updateCanvas = () => {
            const ctx = dynamicTexture.getContext();
            // Transparent background
            ctx.clearRect(0, 0, texSize, texSize);
            
            if (img.complete) {
                const w = img.width * imgScale;
                const h = img.height * imgScale;
                // 5. Draw the image (Center-aligned with offset)
                ctx.drawImage(img, (texSize - w) / 2 + imgX, (texSize - h) / 2 + imgY, w, h);
                dynamicTexture.update();
            }
        };

        img.onload = () => updateCanvas();

        // --- GUI setting ---
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const panel = new BABYLON.GUI.StackPanel();
        panel.width = "220px";
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(panel);

        const createBtn = (text: string, onClick: () => void) => {
            const btn = BABYLON.GUI.Button.CreateSimpleButton(text, text);
            btn.height = "40px";
            btn.color = "white";
            btn.background = "#333";
            btn.marginTop = "5px";
            btn.hoverCursor = "pointer";
            btn.onPointerUpObservable.add(onClick);
            panel.addControl(btn);
        };

        // 6-9. Moving button GUI (moving 10 pixels)
        createBtn("Up", () => { imgY -= 10; updateCanvas(); });
        createBtn("Down", () => { imgY += 10; updateCanvas(); });
        createBtn("Left", () => { imgX -= 10; updateCanvas(); });
        createBtn("Right", () => { imgX += 10; updateCanvas(); });

        // 10. Slider GUI allow users to resize the image
        const header = new BABYLON.GUI.TextBlock();
        header.text = "Scale";
        header.height = "30px";
        header.color = "white";
        panel.addControl(header);

        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 0.1;
        slider.maximum = 2.0;
        slider.value = 0.5;
        slider.height = "20px";
        slider.width = "200px";
        slider.hoverCursor = "pointer";
        slider.onValueChangedObservable.add((value) => {
            imgScale = value;
            updateCanvas();
        });
        panel.addControl(slider);

        return scene;
    }
}
export { Playground };
