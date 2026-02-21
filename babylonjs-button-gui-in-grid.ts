class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // 初始化場景、相機與燈光
        const scene = new BABYLON.Scene(engine);

        // 基礎場景設置：相機與光照
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // 初始化 GUI 全螢幕紋理
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // 建立 Grid 容器
        const grid = new BABYLON.GUI.Grid();
        grid.width = "800px";
        grid.height = "600px";
        
        // 設定 4 欄 (Column)
        for (let i = 0; i < 4; i++) {
            grid.addColumnDefinition(0.25);
        }

        // 定義按鈕文字清單
        const buttonTexts = [
            "Kiss my ass", "Blow me bitch", "Like this shit", "Dirty scumbag",
            "Fxxk face", "Pieces of crap", "Fxxk off", "Bloody crap",
            "Suck my cock", "Fxxking cock sucker", "STFU", "Useless asshole",
            "GTFO", "Screw you"
        ];

        // 根據按鈕數量計算需要的列數 (Row)
        const rowCount = Math.ceil(buttonTexts.length / 4);
        for (let j = 0; j < rowCount; j++) {
            grid.addRowDefinition(1 / rowCount);
        }

        // 迴圈建立按鈕
        buttonTexts.forEach((text, index) => {
            const btn = BABYLON.GUI.Button.CreateSimpleButton(`btn_${index}`, text);
            
            // 樣式設定
            btn.width = "95%";
            btn.height = "60px";
            btn.color = "white";
            btn.background = "#333333";
            btn.cornerRadius = 15; // 圓角設定
            btn.thickness = 2;
            btn.fontSize = "14px";
            
            // 互動效果：滑鼠懸停變色
            btn.pointerEnterAnimation = () => { btn.background = "#555555"; };
            btn.pointerOutAnimation = () => { btn.background = "#333333"; };
            btn.pointerDownAnimation = () => { btn.scaleX = 1; btn.scaleY = 1;};
            btn.pointerUpAnimation = () => { btn.scaleX = 1; btn.scaleY = 1;};
            // 計算網格座標：第幾列、第幾欄
            const row = Math.floor(index / 4);
            const col = index % 4;

            grid.addControl(btn, row, col);
        });

        advancedTexture.addControl(grid);

        return scene;
    }
}
export { Playground };
