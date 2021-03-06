// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
canvas.focus();

var app = new pc.fw.Application(canvas, {
    mouse: new pc.input.Mouse(canvas),
    keyboard: new pc.input.Keyboard(canvas)
});
//var keyboard = new pc.input.Keyboard(window);

app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
app.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

// Create box entity
var tank = new pc.fw.Entity();

var base = new pc.fw.Entity();

var gun = new pc.fw.Entity();

var url = "assets/Tank_base.json";

app.context.assets.loadFromUrl(url, "model").then(function (results) {
    var model = results.resource;
    var asset = results.asset;

    app.context.systems.model.addComponent(base, {
        type: "asset",
        asset: asset
    });
});

url = "assets/Tank_gun_turret.json";

app.context.assets.loadFromUrl(url, "model").then(function (results) {
    var model = results.resource;
    var asset = results.asset;

    app.context.systems.model.addComponent(gun, {
        type: "asset",
        asset: asset
    });
});

var lookScript = {
    name: 'look',
    url: 'scripts/look.js'
}

app.context.systems.script.addComponent(gun, {
    enabled: true,
    scripts: [lookScript]
});

var moveScript = {
    name: 'move',
    url: 'scripts/move.js'
}

app.context.systems.script.addComponent(tank, {
    enable: true,
    scripts: [moveScript]
});


// Create camera entity
var cam = new pc.fw.Entity();
app.context.systems.camera.addComponent(cam, {
    clearColor: [0.3, 0.3, 0.3]
});

// Create directional light entity
var light = new pc.fw.Entity();
app.context.systems.light.addComponent(light, {
    color: new pc.Color(1, 1, 1)
});

// Add to hierarchy
app.context.root.addChild(tank);
tank.addChild(base);
tank.addChild(gun);
app.context.root.addChild(cam);
app.context.root.addChild(light);

// Set up position and orientation
//tank.setLocalScale(0.001, 0.001, 0.001);
gun.translateLocal(0, 0.55, 0);
cam.setLocalPosition(0, 1, 3);
cam.rotate(0, 0, 0);
light.setEulerAngles(45, 0, 0);

canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock ||
    canvas.webkitRequestPointerLock;
// Ask the browser to lock the pointer
canvas.requestPointerLock();
//
//// Ask the browser to release the pointer
//document.exitPointerLock = document.exitPointerLock ||
//    document.mozExitPointerLock ||
//    document.webkitExitPointerLock;
//document.exitPointerLock();

// Register an update event
//app.on("update", function (dt) {
            //
            //
            //    var rotateTarget = cam;
            //
            //    if (app.context.keyboard.isPressed(pc.input.KEY_CONTROL))
            //        rotateTarget = gun;
            //
            //    if (app.context.keyboard.isPressed(pc.input.KEY_LEFT)) {
            //        rotateTarget.rotateLocal(0, 90 * dt, 0);
            //    }
            //    if (app.context.keyboard.isPressed(pc.input.KEY_RIGHT)) {
            //        rotateTarget.rotateLocal(0, -90 * dt, 0);
            //    }
            //    if (app.context.keyboard.isPressed(pc.input.KEY_UP)) {
            //        rotateTarget.rotateLocal(90 * dt, 0, 0);
            //    }
            //    if (app.context.keyboard.isPressed(pc.input.KEY_DOWN)) {
            //        rotateTarget.rotateLocal(-90 * dt, 0, 0);
            //    }
            //
            //});