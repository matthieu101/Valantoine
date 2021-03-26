const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

const xSpeed = 0.05;
const zSpeed = 0.05;

function init() {
    const overlay = document.getElementById( 'overlay' );
	overlay.remove();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 ,1000);
    var renderer = new THREE.WebGLRenderer();
    const listener = new THREE.AudioListener();
    
    responsiveWindow(renderer);

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

    const loader = new THREE.ObjectLoader();
    var pants;
    loader.load(
    	"json/scene.json",

    	// onLoad callback
    	// Here the loaded data is assumed to be an object
    	function ( obj ) {
            pants  = obj.getObjectByName( "jeans.obj" );
            obj.position.z = 10;
            obj.position.y = -1;
    		// Add the loaded object to the scene
    		scene.add( obj );
    	},
    );
    camera.position.y = 0.5;
    camera.rotation.y = Math.PI;
    var n = 0;
    // game logic
    var update = function()
    {
        if(pants != undefined && pants.position.z < 19 )
        {
            pants.position.z += zSpeed;
            camera.position.z = pants.position.z + 8;
        }
        //When the object finish the scene show pop-info
        if (pants.position.z >= 19 && n === 0){
            let pop_info = document.getElementById("page");
            pop_info.style.display = "block";
            n++;
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

