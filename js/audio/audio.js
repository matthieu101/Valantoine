function PlaySong(listener)
{   
    // create a global audio source
    const sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'sounds/peder-b-helland-deep-in-the-forest.mp3', function( buffer ) {
    	sound.setBuffer( buffer );
    	sound.setLoop( true );
    	sound.setVolume( 0.5 );
    	sound.play();
    });
}
