class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // 1. 初始化場景
        const scene = new BABYLON.Scene(engine);

        // 2. 設置攝影機 (ArcRotateCamera 方便旋轉檢視)
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);

        // 3. 設置光源
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // 4. 建立地面 (Ground)
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

        // 5. 建立球體 (Sphere)
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

        // 根據要求：球體初始 Z 軸位置設為 1
        // 注意：在預設視角下，Y 軸是向上，Z 軸是前後
        sphere.position.y = 1; // 讓球體剛好落在地面上 (半徑為1)
        sphere.position.z = 1;

        // --- GUI 部分 ---

        // 建立全螢幕 GUI 管理器
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // 建立按鈕
        const button = BABYLON.GUI.Button.CreateSimpleButton("moveBtn", "Move the sphere now.");
        button.width = "200px";
        button.height = "40px";
        button.color = "white";
        button.background = "green";
        button.cornerRadius = 10;
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM; // 置於底部
        button.top = "-50px"; // 向上偏移一點點

        // 6. 點擊事件：Z 軸位置 + 3
        button.onPointerUpObservable.add(() => {
            sphere.position.z += 1;
            console.log("Current Z-axis of the sphere is " + sphere.position.z + " .");
        });

        advancedTexture.addControl(button);

        return scene;
    }
}
export { Playground };
