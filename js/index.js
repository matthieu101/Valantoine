const startButton = document.getElementById( 'startButton' );
const nextStep = document.getElementById( 'nextStep' );
startButton.addEventListener( 'click', init );
nextStep.addEventListener( 'click', changeScene);

const xSpeed = 0.05;
const zSpeed = 0.05;
var scene;
var camera;
var renderer;
var player;
var isFinish = false;
var chapter = "chapter1";

// var loaded to check if ressources are loaded 
var loadingManager = null;
var RESOURCES_LOADED = false;

function changeScene() {
    scene = new THREE.Scene();
    camera.position.z = 0;
    player.position.z = 0;
    isFinish = false;
    chapter = 'chapter2';
    let pop_info = document.getElementById("chapter1");
    pop_info.style.display = "none";
    const loader = new THREE.ObjectLoader(loadingManager);
    loader.load(
        "json/scene2.json",

        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
            player  = obj.getObjectByName( "cotton.obj" );
            obj.position.z = 10;
            obj.position.y = -1;
            // Add the loaded object to the scene
            scene.add( obj );
        },
    );
};

function init() {
    const overlay = document.getElementById( 'overlay' );
	overlay.remove();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 ,1000);
    renderer = new THREE.WebGLRenderer();
    const listener = new THREE.AudioListener();
    // Loading Manager
    loadingManager = new THREE.LoadingManager();
    // Show all item loaded 1 by 1
    loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
    // Show when loading ressources are loaded
    loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
	};
    
    responsiveWindow(renderer, camera);

    camera.add( listener );
    PlaySong(listener);

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 39 && player.position.x >= -0.65) {
            player.position.x -= xSpeed;
        } else if (keyCode == 37 && player.position.x <= 0.65) {
            player.position.x += xSpeed;
        }
    };
    

    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.enableDamping = false;

    // Light
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    const loader = new THREE.ObjectLoader(loadingManager);
    loader.load(
    	"json/scene1.json",

    	// onLoad callback
    	// Here the loaded data is assumed to be an object
    	function ( obj ) {
            player  = obj.getObjectByName( "cotton.obj" );
            obj.position.z = 10;
            obj.position.y = -1;
    		// Add the loaded object to the scene
    		scene.add( obj );
    	},
    );
    camera.position.y = 0.5;
    camera.rotation.y = Math.PI;
    
    // game logic
    var update = function()
    {
        if(player != undefined && player.position.z < 19 )
        {
            player.position.z += zSpeed;
            camera.position.z = player.position.z + 8;
        }
        //When the object finish the scene show pop-info
        if (player != undefined && player.position.z >= 19 && isFinish === false){
            console.log('yes');
            let pop_info = document.getElementById(chapter);
            pop_info.style.display = "block";
            isFinish = true;
        }
    };
    // draw scene
    var render = function()
    {
        renderer.render (scene, camera);
    };
    // run game loop
    var GameLoop = function()
    {
        requestAnimationFrame( GameLoop);
        update();
        render();
    };
    GameLoop();

    
}

