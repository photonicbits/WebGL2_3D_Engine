function loadSettings(screenWidth,screenHeight){
    var globalVars = {
        FOV: Math.PI*50/180,
        ZNEAR: 1,
        ZFAR: 1000,
        SCREEN_RATIO: screenWidth/screenHeight,
        FPS: 30,
        // controls
        KEY_CAM_LEFT: 65,
        KEY_CAM_RIGHT: 68,
        KEY_CAM_UP: 81,
        KEY_CAM_DOWN: 69,
        KEY_CAM_BOOST: 16,
        KEY_CAM_FORWARD: 87,
        KEY_CAM_BACKWARD: 83,
        SENSITIVITY: 200.0,
        SEC_PER_FRAME: 16.666
    };
    globalVars.SEC_PER_FRAME = 1000/globalVars.FPS;

    return globalVars;
}

