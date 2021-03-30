const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

const xSpeed = 0.05;
const zSpeed = 0.05;

// var loaded to check if ressources are loaded 
var loadingManager = null;
var RESOURCES_LOADED = false;

function init() {
    const overlay = document.getElementById( 'overlay' );
	overlay.remove();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 ,1000);
    var renderer = new THREE.WebGLRenderer();
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

    var isFinish = false;
    
    responsiveWindow(renderer, camera);

    camera.add( listener );
    PlaySong(listener);

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 39 && pants.position.x >= -0.65) {
            pants.position.x -= xSpeed;
        } else if (keyCode == 37 && pants.position.x <= 0.65) {
            pants.position.x += xSpeed;
        }
    };
    

    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.enableDamping = false;

    // Light
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    const loader = new THREE.ObjectLoader(loadingManager);
    var pants;
    loader.load(
    	"json/scene2.json",

    	// onLoad callback
    	// Here the loaded data is assumed to be an object
    	function ( obj ) {
            pants  = obj.getObjectByName( "cotton.obj" );
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
        if(pants != undefined && pants.position.z < 19 )
        {
            pants.position.z += zSpeed;
            camera.position.z = pants.position.z + 8;
        }
        //When the object finish the scene show pop-info
        if (pants != undefined && pants.position.z >= 19 && isFinish === false){
            let pop_info = document.getElementById("chapter1");
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

