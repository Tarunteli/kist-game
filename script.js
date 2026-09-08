/* =========================================================
   KIST GAME - COMPLETE SCRIPT.JS
   Three.js + Vanilla JavaScript
   ========================================================= */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

/* =========================================================
   DOM
   ========================================================= */

const container =
    document.getElementById("scene-container") ||
    document.getElementById("canvas-container") ||
    document.body;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const cashBtn = document.getElementById("cashBtn");
const gpayBtn = document.getElementById("gpayBtn");
const restartBtn = document.getElementById("restartBtn");

const question = document.getElementById("question");
const paymentOptions = document.getElementById("paymentOptions");
const gameEnd = document.getElementById("gameEnd");
const resultText = document.getElementById("resultText");


/* =========================================================
   SCENE
========================================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x8ed0ef);

scene.fog = new THREE.Fog(
    0x8ed0ef,
    28,
    65
);


/* =========================================================
   CAMERA
========================================================= */

const camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.1,
    120
);

camera.position.set(
    7.5,
    5.2,
    14
);

camera.lookAt(
    0,
    2.4,
    0
);


/* =========================================================
   RENDERER
========================================================= */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


/* SHADOWS */

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


/* COLOR */

renderer.outputColorSpace =
    THREE.SRGBColorSpace;


/* REALISTIC LIGHT RESPONSE */

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.15;


/* =========================================================
   ADD CANVAS
========================================================= */

if (!renderer.domElement.parentElement) {

    container.appendChild(
        renderer.domElement
    );
}


/* =========================================================
   LIGHTING
========================================================= */


/* -----------------------------------------
   SOFT SKY LIGHT
----------------------------------------- */

const hemisphereLight =
    new THREE.HemisphereLight(
        0xdff6ff,
        0x526b38,
        1.8
    );

scene.add(
    hemisphereLight
);


/* -----------------------------------------
   MAIN SUN LIGHT
----------------------------------------- */

const sun =
    new THREE.DirectionalLight(
        0xffffff,
        4.0
    );

sun.position.set(
    -10,
    16,
    10
);

sun.castShadow = true;


/* HIGH QUALITY SHADOW */

sun.shadow.mapSize.width =
    2048;

sun.shadow.mapSize.height =
    2048;


/* SHADOW CAMERA */

sun.shadow.camera.left =
    -18;

sun.shadow.camera.right =
    18;

sun.shadow.camera.top =
    18;

sun.shadow.camera.bottom =
    -18;

sun.shadow.camera.near =
    0.1;

sun.shadow.camera.far =
    60;


/* SOFT SHADOW */

sun.shadow.bias =
    -0.0005;

sun.shadow.normalBias =
    0.025;

scene.add(
    sun
);


/* -----------------------------------------
   FRONT FILL LIGHT
----------------------------------------- */

const frontLight =
    new THREE.DirectionalLight(
        0xbfe8ff,
        1.1
    );

frontLight.position.set(
    6,
    7,
    12
);

scene.add(
    frontLight
);


/* -----------------------------------------
   WARM SIDE LIGHT
----------------------------------------- */

const sideLight =
    new THREE.DirectionalLight(
        0xffe0b2,
        0.65
    );

sideLight.position.set(
    -10,
    5,
    -5
);

scene.add(
    sideLight
);


/* =========================================================
   MATERIALS
========================================================= */


/* RED SHIRT */

const redMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xe92735,

        roughness: 0.52,

        metalness: 0.0
    });


/* BLUE SHIRT */

const blueMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x0878d8,

        roughness: 0.48,

        metalness: 0.0
    });


/* PANTS */

const pantsMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x171b22,

        roughness: 0.72,

        metalness: 0.0
    });


/* SKIN */

const skinMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xf2bd86,

        roughness: 0.62,

        metalness: 0.0
    });


/* HAIR */

const hairMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x111216,

        roughness: 0.78,

        metalness: 0.0
    });


/* SHOES */

const shoeMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xf7f7f7,

        roughness: 0.32,

        metalness: 0.02
    });


/* GROUND */

const groundMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x78be54,

        roughness: 0.95,

        metalness: 0.0
    });


/* PATH */

const pathMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xd6b783,

        roughness: 0.92,

        metalness: 0.0
    });

/* =========================================================
   CHARACTER CREATOR
   ========================================================= */

function createCharacter(type) {

    const isRed = type === "red";

    const character = new THREE.Group();

    character.name =
        isRed
            ? "RED_CHARACTER"
            : "BLUE_CHARACTER";


    /* ---------------------------------------------
       PELVIS
       --------------------------------------------- */

    const pelvis = new THREE.Group();

    pelvis.position.y = 2.9;

    character.add(pelvis);


    const pelvisMesh = smoothPart(
        new THREE.SphereGeometry(
            0.68,
            32,
            24
        ),
        pantsMaterial,
        [0, 0, 0]
    );

    pelvisMesh.scale.set(
        1,
        0.75,
        0.72
    );

    pelvis.add(pelvisMesh);


    /* ---------------------------------------------
       CHEST
       --------------------------------------------- */

    const chest = new THREE.Group();

    chest.position.y = 0.65;

    pelvis.add(chest);


    const body = smoothPart(
        new THREE.SphereGeometry(
            0.82,
            32,
            24
        ),
        isRed
            ? redMaterial
            : blueMaterial,
        [0, 0, 0]
    );

    body.scale.set(
        0.98,
        1.25,
        0.7
    );

    chest.add(body);


    /* ---------------------------------------------
       NECK
       --------------------------------------------- */

    const neck = new THREE.Group();

    neck.position.y = 1.12;

    chest.add(neck);


    const neckMesh = smoothPart(
        new THREE.CylinderGeometry(
            0.24,
            0.27,
            0.38,
            24
        ),
        skinMaterial,
        [0, 0, 0]
    );

    neck.add(neckMesh);


    /* ---------------------------------------------
       HEAD
       --------------------------------------------- */

    const head = new THREE.Group();

    head.position.y = 0.55;

    neck.add(head);


    const headMesh = smoothPart(
        new THREE.SphereGeometry(
            0.68,
            40,
            32
        ),
        skinMaterial,
        [0, 0, 0]
    );

    headMesh.scale.set(
        0.96,
        1.05,
        0.9
    );

    head.add(headMesh);


    /* ---------------------------------------------
       HAIR
       --------------------------------------------- */

    const hair = smoothPart(
        new THREE.SphereGeometry(
            0.69,
            32,
            20,
            0,
            Math.PI * 2,
            0,
            Math.PI * 0.48
        ),
        hairMaterial,
        [0, 0.17, -0.02]
    );

    hair.scale.set(
        1,
        0.8,
        1
    );

    head.add(hair);


    /* ---------------------------------------------
       EYES
       --------------------------------------------- */

    const eyeGeometry =
        new THREE.SphereGeometry(
            0.055,
            12,
            12
        );

    const eyeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111
        });


    const leftEye = smoothPart(
        eyeGeometry,
        eyeMaterial,
        [-0.21, 0.03, 0.61]
    );

    const rightEye = smoothPart(
        eyeGeometry,
        eyeMaterial,
        [0.21, 0.03, 0.61]
    );

    head.add(leftEye);
    head.add(rightEye);


    /* ---------------------------------------------
       NOSE
       --------------------------------------------- */

    const nose = smoothPart(
        new THREE.SphereGeometry(
            0.045,
            12,
            12
        ),
        skinMaterial,
        [0, -0.06, 0.67]
    );

    head.add(nose);


    /* ---------------------------------------------
       ARMS
       --------------------------------------------- */

    function createArm(side) {

        const sign =
            side === "left"
                ? -1
                : 1;


        const shoulder =
            new THREE.Group();

        shoulder.position.set(
            sign * 0.78,
            0.72,
            0
        );

        chest.add(shoulder);


        const upperArm =
            new THREE.Group();

        upperArm.position.y = -0.45;

        shoulder.add(upperArm);


        const upperMesh =
            capsule(
                0.19,
                0.55,
                isRed
                    ? redMaterial
                    : blueMaterial
            );

        upperArm.add(upperMesh);


        const elbow =
            new THREE.Group();

        elbow.position.y = -0.55;

        upperArm.add(elbow);


        const elbowMesh =
            smoothPart(
                new THREE.SphereGeometry(
                    0.2,
                    20,
                    16
                ),
                isRed
                    ? redMaterial
                    : blueMaterial
            );

        elbow.add(elbowMesh);


        const forearm =
            new THREE.Group();

        forearm.position.y = -0.48;

        elbow.add(forearm);


        const forearmMesh =
            capsule(
                0.17,
                0.5,
                isRed
                    ? redMaterial
                    : blueMaterial
            );

        forearm.add(forearmMesh);


        const hand =
            new THREE.Group();

        hand.position.y = -0.55;

        forearm.add(hand);


        const handMesh =
            smoothPart(
                new THREE.SphereGeometry(
                    0.19,
                    20,
                    16
                ),
                skinMaterial
            );

        hand.add(handMesh);


        return {
            shoulder,
            upperArm,
            elbow,
            forearm,
            hand
        };
    }


    const leftArm =
        createArm("left");

    const rightArm =
        createArm("right");


    /* ---------------------------------------------
       LEGS
       --------------------------------------------- */

    function createLeg(side) {

        const sign =
            side === "left"
                ? -1
                : 1;


        const hip =
            new THREE.Group();

        hip.position.set(
            sign * 0.38,
            -0.42,
            0
        );

        pelvis.add(hip);


        const thigh =
            new THREE.Group();

        thigh.position.y = -0.48;

        hip.add(thigh);


        const thighMesh =
            capsule(
                0.27,
                0.72,
                pantsMaterial
            );

        thigh.add(thighMesh);


        const knee =
            new THREE.Group();

        knee.position.y = -0.75;

        thigh.add(knee);


        const kneeMesh =
            smoothPart(
                new THREE.SphereGeometry(
                    0.28,
                    24,
                    18
                ),
                pantsMaterial
            );

        knee.add(kneeMesh);


        const shin =
            new THREE.Group();

        shin.position.y = -0.55;

        knee.add(shin);


        const shinMesh =
            capsule(
                0.24,
                0.7,
                pantsMaterial
            );

        shin.add(shinMesh);


        const ankle =
            new THREE.Group();

        ankle.position.y = -0.75;

        shin.add(ankle);


        const shoe =
            smoothPart(
                new THREE.BoxGeometry(
                    0.58,
                    0.25,
                    0.95
                ),
                shoeMaterial,
                [0, -0.12, 0.16]
            );

        shoe.scale.set(
            1,
            1,
            1
        );

        ankle.add(shoe);


        return {
            hip,
            thigh,
            knee,
            shin,
            ankle,
            shoe
        };
    }


    const leftLeg =
        createLeg("left");

    const rightLeg =
        createLeg("right");


    /* ---------------------------------------------
       STORE JOINTS
       --------------------------------------------- */

    character.userData = {

        pelvis,

        chest,

        neck,

        head,

        leftArm,
        rightArm,

        leftLeg,
        rightLeg,

        original: {
            pelvisPosition: pelvis.position.clone(),

            chestRotation:
                chest.rotation.clone(),

            leftHipRotation:
                leftLeg.hip.rotation.clone(),

            rightHipRotation:
                rightLeg.hip.rotation.clone(),

            leftKneeRotation:
                leftLeg.knee.rotation.clone(),

            rightKneeRotation:
                rightLeg.knee.rotation.clone(),

            leftAnkleRotation:
                leftLeg.ankle.rotation.clone(),

            rightAnkleRotation:
                rightLeg.ankle.rotation.clone(),

            leftShoulderRotation:
                leftArm.shoulder.rotation.clone(),

            rightShoulderRotation:
                rightArm.shoulder.rotation.clone(),

            leftElbowRotation:
                leftArm.elbow.rotation.clone(),

            rightElbowRotation:
                rightArm.elbow.rotation.clone()
        }
    };


    return character;
}


/* =========================================================
   CREATE CHARACTERS
   ========================================================= */

const redCharacter =
    createCharacter("red");

const blueCharacter =
    createCharacter("blue");


/* =========================================================
   CHARACTER POSITION
   ========================================================= */

redCharacter.position.set(
    -0.9,
    0,
    0
);

blueCharacter.position.set(
    1.0,
    0,
    -1.4
);


/* =========================================================
   ADD CHARACTERS
   ========================================================= */

scene.add(redCharacter);
scene.add(blueCharacter);


/* =========================================================
   GROUND
   ========================================================= */

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(
        60,
        60
    ),
    groundMaterial
);

ground.rotation.x =
    -Math.PI / 2;

ground.position.y = -1.02;

ground.receiveShadow = true;

scene.add(ground);


/* =========================================================
   WALKING PATH
   ========================================================= */

const path = new THREE.Mesh(
    new THREE.PlaneGeometry(
        14,
        60
    ),
    pathMaterial
);

path.rotation.x =
    -Math.PI / 2;

path.position.y = -1.0;

path.receiveShadow = true;

scene.add(path);


/* =========================================================
   TREES
   ========================================================= */

function createTree(x, z) {

    const tree =
        new THREE.Group();


    const trunk =
        smoothPart(
            new THREE.CylinderGeometry(
                0.18,
                0.25,
                2.2,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0x76502f
            }),
            [0, 0.1, 0]
        );

    tree.add(trunk);


    const leaves =
        smoothPart(
            new THREE.SphereGeometry(
                1.15,
                24,
                20
            ),
            new THREE.MeshStandardMaterial({
                color: 0x3f9b45
            }),
            [0, 1.5, 0]
        );

    leaves.scale.set(
        0.9,
        1.2,
        0.9
    );

    tree.add(leaves);


    tree.position.set(
        x,
        0,
        z
    );

    scene.add(tree);
}


createTree(-8, -7);
createTree(8, -9);
createTree(-9, 5);
createTree(9, 4);


/* =========================================================
   CLOUDS
   ========================================================= */

function createCloud(x, y, z) {

    const cloud =
        new THREE.Group();


    const cloudMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });


    const positions = [
        [-0.8, 0, 0],
        [0, 0.2, 0],
        [0.8, 0, 0],
        [0.2, -0.05, 0]
    ];


    positions.forEach(
        ([px, py, pz]) => {

            const part =
                new THREE.Mesh(
                    new THREE.SphereGeometry(
                        0.65,
                        20,
                        16
                    ),
                    cloudMaterial
                );

            part.position.set(
                px,
                py,
                pz
            );

            cloud.add(part);
        }
    );


    cloud.position.set(
        x,
        y,
        z
    );

    scene.add(cloud);
}


createCloud(-6, 8, -15);
createCloud(7, 9, -18);


/* =========================================================
   SUN
   ========================================================= */

const sunMesh =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            1.2,
            32,
            24
        ),
        new THREE.MeshBasicMaterial({
            color: 0xffdd65
        })
    );

sunMesh.position.set(
    -9,
    11,
    -18
);

scene.add(sunMesh);


/* =========================================================
   ANIMATION STATE
   ========================================================= */

let animationStarted = false;

let animationFinished = false;

let animationProgress = 0;

let blueMoving = false;

let blueTime = 0;


/* =========================================================
   BLUE MOVEMENT SETTINGS
   ========================================================= */

const blueStartZ =
    blueCharacter.position.z;

const blueMovementDistance = 1.0;

const blueMovementSpeed = 2.0;


/* =========================================================
   EASING
   ========================================================= */

function easeInOutCubic(t) {

    return t < 0.5
        ? 4 * t * t * t
        : 1 -
          Math.pow(
              -2 * t + 2,
              3
          ) / 2;
}


/* =========================================================
   RED CHARACTER - KNEEL + FORWARD BEND POSE
   ========================================================= */

function updateRedPose(t) {

    const e = easeInOutCubic(t);
    const data = redCharacter.userData;


    /* =====================================================
       KAMAR / PELVIS KO NICHE KARO
       ===================================================== */

    data.pelvis.position.y = THREE.MathUtils.lerp(
        2.9,
        2.15,
        e
    );


    /* =====================================================
       UPPER BODY KO AAGE JHUKAO
       
       X = forward/backward bend
       Y = left/right rotation
       Z = side tilt

       Isliye Z ko 0 rakha hai taaki character
       side mein tedha na ho.
       ===================================================== */

    data.chest.rotation.set(
        THREE.MathUtils.lerp(0, 1.30, e),
        0,
        0
    );


    /* =====================================================
       HEAD KO BODY KE SAATH NATURAL POSITION MEIN RAKHO
       ===================================================== */

    data.head.rotation.set(
        THREE.MathUtils.lerp(0, 0.15, e),
        0,
        0
    );


    /* =====================================================
       LEFT HIP
       ===================================================== */

    data.leftLeg.hip.rotation.set(
        THREE.MathUtils.lerp(0, -0.45, e),
        0,
        THREE.MathUtils.lerp(0, -0.05, e)
    );


    /* =====================================================
       RIGHT HIP
       ===================================================== */

    data.rightLeg.hip.rotation.set(
        THREE.MathUtils.lerp(0, -0.45, e),
        0,
        THREE.MathUtils.lerp(0, 0.05, e)
    );


    /* =====================================================
       LEFT KNEE - PROPER BEND
       ===================================================== */

    data.leftLeg.knee.rotation.set(
        THREE.MathUtils.lerp(0, 1.85, e),
        0,
        0
    );


    /* =====================================================
       RIGHT KNEE - PROPER BEND
       ===================================================== */

    data.rightLeg.knee.rotation.set(
        THREE.MathUtils.lerp(0, 1.85, e),
        0,
        0
    );


    /* =====================================================
       LEFT ANKLE
       ===================================================== */

    data.leftLeg.ankle.rotation.set(
        THREE.MathUtils.lerp(0, -0.35, e),
        0,
        0
    );


    /* =====================================================
       RIGHT ANKLE
       ===================================================== */

    data.rightLeg.ankle.rotation.set(
        THREE.MathUtils.lerp(0, -0.35, e),
        0,
        0
    );


    /* =====================================================
       LEFT SHOULDER
       
       Upper body aage jhukne ke saath arm bhi
       naturally neeche/aage jayega.
       ===================================================== */

    data.leftArm.shoulder.rotation.set(
        THREE.MathUtils.lerp(0, -0.30, e),
        0,
        THREE.MathUtils.lerp(0, -0.15, e)
    );


    /* =====================================================
       RIGHT SHOULDER
       ===================================================== */

    data.rightArm.shoulder.rotation.set(
        THREE.MathUtils.lerp(0, -0.30, e),
        0,
        THREE.MathUtils.lerp(0, 0.15, e)
    );


    /* =====================================================
       LEFT ELBOW
       ===================================================== */

    data.leftArm.elbow.rotation.set(
        THREE.MathUtils.lerp(0, -0.35, e),
        0,
        0
    );


    /* =====================================================
       RIGHT ELBOW
       ===================================================== */

    data.rightArm.elbow.rotation.set(
        THREE.MathUtils.lerp(0, -0.35, e),
        0,
        0
    );

}

/* =========================================================
   BLUE POSITIONING
   ========================================================= */

function updateBlueCharacter(delta) {

    if (!blueMoving) {
        return;
    }


    blueTime += delta;


    /*
       Smooth forward/backward movement.

       IMPORTANT:
       We move the WHOLE blue character,
       not individual body parts.
    */

    const movement =
        Math.sin(
            blueTime *
            blueMovementSpeed
        ) *
        blueMovementDistance;


    blueCharacter.position.z =
        blueStartZ + movement;


    /*
       Tiny natural body movement.
    */

    const body =
        blueCharacter.userData;


    body.chest.rotation.x =
        Math.sin(
            blueTime * 2
        ) * 0.015;
}


/* =========================================================
   START G PAY ANIMATION
   ========================================================= */

function startGPayAnimation() {

    if (animationStarted) {
        return;
    }


    animationStarted = true;

    animationFinished = false;

    animationProgress = 0;

    blueMoving = false;

    blueTime = 0;


    /*
       Blue first moves to position behind red.
    */

    const targetBlueZ =
        -0.9;


    const startBlueZ =
        blueCharacter.position.z;


    const startX =
        blueCharacter.position.x;


    const targetX =
        0.65;


    const startTime =
        performance.now();


    const positioningDuration =
        1000;


    function positionBlue(now) {

        const elapsed =
            now - startTime;


        const t =
            Math.min(
                elapsed /
                positioningDuration,
                1
            );


        const e =
            easeInOutCubic(t);


        blueCharacter.position.z =
            THREE.MathUtils.lerp(
                startBlueZ,
                targetBlueZ,
                e
            );


        blueCharacter.position.x =
            THREE.MathUtils.lerp(
                startX,
                targetX,
                e
            );


        if (t < 1) {

            requestAnimationFrame(
                positionBlue
            );

        } else {

            startRedAnimation();
        }
    }


    requestAnimationFrame(
        positionBlue
    );
}


/* =========================================================
   RED ANIMATION
   ========================================================= */

function startRedAnimation() {

    const startTime =
        performance.now();


    const duration =
        2300;


    function animateRed(now) {

        const elapsed =
            now - startTime;


        const t =
            Math.min(
                elapsed /
                duration,
                1
            );


        animationProgress =
            t;


        updateRedPose(t);


        if (t < 1) {

            requestAnimationFrame(
                animateRed
            );

        } else {

            animationFinished = true;

            blueMoving = true;

            showPaymentSuccess();
        }
    }


    requestAnimationFrame(
        animateRed
    );
}


/* =========================================================
   PAYMENT SUCCESS
   ========================================================= */

function showPaymentSuccess() {

    setTimeout(() => {

        if (resultText) {

            resultText.textContent =
                "Payment Successful ✓";

        }

        if (gameEnd) {

            gameEnd.style.display =
                "flex";
        }

    }, 700);
}


/* =========================================================
   RESET CHARACTER
   ========================================================= */

function resetCharacters() {

    animationStarted = false;

    animationFinished = false;

    animationProgress = 0;

    blueMoving = false;

    blueTime = 0;


    /* RED */

    const data =
        redCharacter.userData;

    data.pelvis.position.y = 2.9;

    data.chest.rotation.set(
        0,
        0,
        0
    );

    data.head.rotation.set(
        0,
        0,
        0
    );


    data.leftLeg.hip.rotation.set(
        0,
        0,
        0
    );

    data.rightLeg.hip.rotation.set(
        0,
        0,
        0
    );

    data.leftLeg.knee.rotation.set(
        0,
        0,
        0
    );

    data.rightLeg.knee.rotation.set(
        0,
        0,
        0
    );

    data.leftLeg.ankle.rotation.set(
        0,
        0,
        0
    );

    data.rightLeg.ankle.rotation.set(
        0,
        0,
        0
    );


    data.leftArm.shoulder.rotation.set(
        0,
        0,
        0
    );

    data.rightArm.shoulder.rotation.set(
        0,
        0,
        0
    );

    data.leftArm.elbow.rotation.set(
        0,
        0,
        0
    );

    data.rightArm.elbow.rotation.set(
        0,
        0,
        0
    );


    /* BLUE */

    blueCharacter.position.set(
        1.0,
        0,
        blueStartZ
    );

    blueCharacter.userData.chest.rotation.set(
        0,
        0,
        0
    );
}


/* =========================================================
   UI ELEMENTS
========================================================= */




/* =========================================================
   STEP FUNCTIONS
========================================================= */

function showStep(element) {

    if (!element) return;

    element.classList.add("active");
}


function hideStep(element) {

    if (!element) return;

    element.classList.remove("active");
}


function hideAllSteps() {

    hideStep(question);
    hideStep(paymentOptions);
    hideStep(gameEnd);
}


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    hideAllSteps();

    showStep(question);
}


/* =========================================================
   YES BUTTON
========================================================= */

if (yesBtn) {

    yesBtn.addEventListener("click", function () {

        console.log("YES clicked");

        hideAllSteps();

        showStep(gameEnd);

        if (resultText) {

            resultText.textContent =
                "किस्त पहले ही भरी हुई है।";
        }

    });
}


/* =========================================================
   NO BUTTON
========================================================= */

if (noBtn) {

    noBtn.addEventListener("click", function () {

        console.log("NO clicked");

        hideStep(question);
        hideStep(gameEnd);

        showStep(paymentOptions);

    });
}


/* =========================================================
   CASH BUTTON
========================================================= */

if (cashBtn) {

    cashBtn.addEventListener("click", function () {

        console.log("CASH clicked");

        hideStep(paymentOptions);

        showStep(gameEnd);

        if (resultText) {

            resultText.textContent =
                "आपने पैसे देकर किस्त भरने का विकल्प चुना।";
        }

    });
}


/* =========================================================
   G PAY BUTTON
========================================================= */

if (gpayBtn) {

    gpayBtn.addEventListener("click", function () {

        console.log("G PAY clicked");

        hideStep(paymentOptions);

        /*
         * Three.js G Pay animation
         */

        if (typeof startGPayAnimation === "function") {

            startGPayAnimation();

        } else {

            showStep(gameEnd);

            if (resultText) {

                resultText.textContent =
                    "G Pay विकल्प चुना गया।";
            }

        }

    });
}


/* =========================================================
   RESTART BUTTON
========================================================= */

if (restartBtn) {

    restartBtn.addEventListener("click", function () {

        console.log("RESTART clicked");


        /* Characters reset */

        if (typeof resetCharacters === "function") {

            resetCharacters();
        }


        /* Animation reset */

        if (typeof animationStarted !== "undefined") {

            animationStarted = false;
        }


        /* UI reset */

        hideAllSteps();

        showStep(question);

    });
}


/* =========================================================
   KEYBOARD - G PAY
========================================================= */

window.addEventListener("keydown", function (event) {

    if (event.key.toLowerCase() === "g") {

        if (typeof startGPayAnimation === "function") {

            hideStep(paymentOptions);

            startGPayAnimation();
        }

    }

});


/* =========================================================
   INITIAL STATE
========================================================= */

startGame();
/* =========================================================
   STEP CONTROL
========================================================= */

function hideElement(element) {

    if (!element) return;

    element.classList.remove("active");
}


function showElement(element) {

    if (!element) return;

    element.classList.add("active");
}


/* =========================================================
   SHOW STEP 1
========================================================= */

function showQuestion() {

    showElement(question);

    hideElement(paymentOptions);

    hideElement(gameEnd);
}


/* =========================================================
   SHOW PAYMENT OPTIONS
========================================================= */

function showPaymentOptions() {

    hideElement(question);

    showElement(paymentOptions);

    hideElement(gameEnd);
}


/* =========================================================
   SHOW GAME END
========================================================= */

function showGameEnd(message) {

    hideElement(question);

    hideElement(paymentOptions);

    showElement(gameEnd);

    if (resultText) {

        resultText.textContent = message;
    }
}


/* =========================================================
   YES BUTTON
========================================================= */

if (yesBtn) {

    yesBtn.addEventListener(
        "click",
        () => {

            console.log(
                "YES button clicked"
            );

            showGameEnd(
                "किस्त पहले ही भरी हुई है।"
            );
        }
    );
}


/* =========================================================
   NO BUTTON
========================================================= */

if (noBtn) {

    noBtn.addEventListener(
        "click",
        () => {

            console.log(
                "NO button clicked"
            );

            showPaymentOptions();
        }
    );
}


/* =========================================================
   CASH BUTTON
========================================================= */

if (cashBtn) {

    cashBtn.addEventListener(
        "click",
        () => {

            console.log(
                "Cash payment selected"
            );

            showGameEnd(
                "आपने पैसे देकर किस्त भरने का विकल्प चुना।"
            );
        }
    );
}


/* =========================================================
   G PAY BUTTON
========================================================= */

if (gpayBtn) {

    gpayBtn.addEventListener(
        "click",
        () => {

            console.log(
                "G Pay selected"
            );

            hideElement(paymentOptions);

            /*
             * Three.js animation start
             */
            if (
                typeof startGPayAnimation ===
                "function"
            ) {

                startGPayAnimation();

            } else {

                /*
                 * अगर animation function
                 * उपलब्ध नहीं है तो सीधे end
                 */
                showGameEnd(
                    "G Pay विकल्प चुना गया।"
                );
            }
        }
    );
}


/* =========================================================
   RESTART BUTTON
========================================================= */

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            console.log(
                "Game restarted"
            );


            /* Characters वापस initial position */
            if (
                typeof resetCharacters ===
                "function"
            ) {

                resetCharacters();
            }


            /* Animation state reset */
            if (
                typeof animationStarted !==
                "undefined"
            ) {

                animationStarted = false;
            }


            /* Step 1 वापस दिखाओ */
            showQuestion();
        }
    );
}


/* =========================================================
   KEYBOARD SHORTCUT
   G = G PAY ANIMATION
========================================================= */

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() === "g"
        ) {

            console.log(
                "G key pressed"
            );


            if (
                typeof startGPayAnimation ===
                "function"
            ) {

                hideElement(
                    paymentOptions
                );

                startGPayAnimation();
            }
        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            typeof camera !==
            "undefined"
        ) {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();
        }


        if (
            typeof renderer !==
            "undefined"
        ) {

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );
        }

    }
);


/* =========================================================
   CLOCK
========================================================= */

const clock =
    new THREE.Clock();


/* =========================================================
   MAIN ANIMATION LOOP
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        clock.getDelta();


    /* -----------------------------------------
       BLUE CHARACTER MOVEMENT
    ----------------------------------------- */

    if (
        typeof updateBlueCharacter ===
        "function"
    ) {

        updateBlueCharacter(
            delta
        );
    }


    /* -----------------------------------------
       IDLE ANIMATION
    ----------------------------------------- */

    if (
        typeof animationStarted !==
        "undefined" &&
        !animationStarted
    ) {

        const idle =
            Math.sin(
                performance.now() *
                0.0015
            ) * 0.008;


        if (
            typeof blueCharacter !==
            "undefined" &&
            blueCharacter.userData &&
            blueCharacter.userData.chest
        ) {

            blueCharacter
                .userData
                .chest
                .rotation.x = idle;
        }


        if (
            typeof redCharacter !==
            "undefined" &&
            redCharacter.userData &&
            redCharacter.userData.chest
        ) {

            redCharacter
                .userData
                .chest
                .rotation.x = idle;
        }
    }


    /* -----------------------------------------
       RENDER
    ----------------------------------------- */

    if (
        typeof renderer !==
        "undefined" &&
        typeof scene !==
        "undefined" &&
        typeof camera !==
        "undefined"
    ) {

        renderer.render(
            scene,
            camera
        );
    }
}


/* =========================================================
   INITIAL GAME STATE
========================================================= */

showQuestion();


/* =========================================================
   START GAME
========================================================= */

animate();


/* =========================================================
   EXTRA 3D GROUND SHADOW
========================================================= */

const shadowPlaneGeometry =
    new THREE.PlaneGeometry(
        30,
        30
    );

const shadowPlaneMaterial =
    new THREE.ShadowMaterial({
        opacity: 0.20
    });

const shadowPlane =
    new THREE.Mesh(
        shadowPlaneGeometry,
        shadowPlaneMaterial
    );

shadowPlane.rotation.x =
    -Math.PI / 2;

shadowPlane.position.y =
    0.015;

shadowPlane.receiveShadow =
    true;

scene.add(
    shadowPlane
);

function smoothPart(
    geometry,
    material,
    position = [0, 0, 0]
) {

    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );

    mesh.position.set(
        position[0],
        position[1],
        position[2]
    );

    mesh.castShadow = true;

    mesh.receiveShadow = true;

    return mesh;
}

function capsule(
    radius,
    length,
    material
) {

    const group =
        new THREE.Group();


    const cylinder =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                radius,
                radius,
                length,
                32
            ),
            material
        );

    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    group.add(
        cylinder
    );


    const top =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                radius,
                32,
                20
            ),
            material
        );

    top.position.y =
        length / 2;

    top.castShadow = true;
    top.receiveShadow = true;

    group.add(
        top
    );


    const bottom =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                radius,
                32,
                20
            ),
            material
        );

    bottom.position.y =
        -length / 2;

    bottom.castShadow = true;
    bottom.receiveShadow = true;

    group.add(
        bottom
    );


    return group;
}