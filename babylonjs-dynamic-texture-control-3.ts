class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // Create Scene and camera
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.7, 0.5, 0.5, 0.99);
        const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.env", scene);
        scene.environmentTexture = hdrTexture;
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        // Arc rotate camera setting
        camera.alpha = -Math.PI / 2;
        camera.beta =  Math.PI / 1;
        
        // Create a ground plane defualt model
	    const groundWidth = 1;
        const groundHeight = 1;
        const ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: groundWidth, height: groundHeight}, scene)
        ground.rotation.x = -Math.PI / 1.25; 
        
        // Create standard material for the model
    	const materialGround = new BABYLON.PBRMaterial("pbrMat", scene); 				
	    ground.material = materialGround;
        
        // Create dynamic texture canvas
        const textureResolution = 512;
	    const textureGround = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);   
        // Uncomment this line of code if you want the transparent (alpha) background
        //textureGround.hasAlpha = true;
        materialGround.albedoTexture = textureGround;
        materialGround.albedoColor = new BABYLON.Color3(1.0, 0.766, 0.336);
        materialGround.metallic = 1.0;
        materialGround.roughness = 0.1
        materialGround.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHABLEND;
        materialGround.useAlphaFromAlbedoTexture = true;
	    const textureContext = textureGround.getContext();
        // Load image
        const imgPosX = 3;
        const imgPosY = 5;
        const imgWidth = 100;
        const imgHeight = 100;
	    const img = new Image();
	    img.src = 'https://i.imgur.com/1eAmEO8.png';
        img.crossOrigin = "Anonymous";
	    img.onload = function() {
            // Add image to dynamic texture
            textureContext.drawImage(this, imgPosX, imgPosY, imgWidth, imgHeight)
		    textureGround.update();	
        }	

        return scene;
    }
}
export { Playground };
