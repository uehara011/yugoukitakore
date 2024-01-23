        // Cannon.jsの初期化
        var world = new CANNON.World();
        world.gravity.set(0, -9.82, 0);
    
        // Three.jsの初期化
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0,3,0);
        var renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: false,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.physicallyCorrectLights = false;
        renderer.shadowMap.enabled = false;
        renderer.outputEncoding = THREE.GammaEncoding;

        document.body.appendChild(renderer.domElement);
    
        // 地面の作成
        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({ 
            mass: 0 ,
            shape: groundShape,
            material: new CANNON.Material({
                restitution: 0.4,
            }),
        });
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        groundBody.position.set(0, 1, 0);
        world.addBody(groundBody);
    
        var groundGeometry = new THREE.PlaneGeometry(100, 100);
        var groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.rotation.x = -Math.PI / 2;
        scene.add(groundMesh);


        //以下テスト用
        var ss = "ExtraSmallSize";
        var s = "SmallSize";
        var m = "MediumSize";
        var l = "LargeSize";
        var ll = "ExtraLargeSize";
        var ballmass = 2;

        var demoTank = [ss, ss, ll];
        var demoH =100;
        //ここまで
        /*
        S -> Speed
        D -> Defense
        H -> Hitpoint
        A -> Attack
        C -> number of Cannon

        HはDHcost_xを掛け合わせたもの
        DはDHcost_xを足したもの
        */

        //一段目設定　D,S
        if(demoTank[0] == ss){
            var S = 0.6;
            var DHcost_1 = 1;
        }else if(demoTank[0] == s){
            var S = 0.48;
            var DHcost_1 = 2;
        }else if(demoTank[0] == m){
            var S = 0.36;
            var DHcost_1 = 3;
        }else if(demoTank[0] == l){
            var S = 0.24;
            var DHcost_1 = 4;
        }else{
            var S = 0.12;
            var DHcost_1 = 5;
        }

        //二段目設定　H
        if(demoTank[1] == ss){
            var DHcost_2 = 1;
        }else if(demoTank[1] == s){
            var DHcost_2 = 2;
        }else if(demoTank[1] == m){
            var DHcost_2 = 3;
        }else if(demoTank[1] == l){
            var DHcost_2 = 4;
        }else{
            var DHcost_2 = 5;
        }

        //三段目設定　A,C
        if(demoTank[2] == ss){
            var C = 5;
            var A = ballmass*1;
            var DHcost_3 = 1;
        }else if(demoTank[2] == s){
            var C = 4;
            var A = ballmass*2;
            var DHcost_3 = 2;
        }else if(demoTank[2] == m){
            var C = 3;
            var A = ballmass*3;
            var DHcost_3 = 3;
        }else if(demoTank[2] == l){
            var C = 2;
            var A = ballmass*4;
            var DHcost_3 = 4;
        }else{
            var C = 1;
            var A = ballmass*5;
            var DHcost_3 = 5;
        }

        var D = DHcost_1 * DHcost_2 * DHcost_3;
        var H = DHcost_1 + DHcost_2 + DHcost_3;

        // 球の生成と管理
        var balls = [];


        // キーボードイベントのリスナー
        document.addEventListener('keydown', onDocumentKeyDown);

        function onDocumentKeyDown(event) {
            switch (event.key) {
                case 'i':
                    if(balls.length < C){
                        createBall(0,500,-1000);
                    }
                    break;
                case ',':
                    if(balls.length < C){
                        createBall(0,500,2000);
                    }
                    break;
                case 'l':
                    if(balls.length < C){
                        createBall(2000,500,0);
                    }
                    break;
                case 'j':
                    if(balls.length < C){
                        createBall(-2000,500,0);
                    }
                    break;
            }
        }
    
        camera.position.z=5;
        // メインループ
        function animate() {
            requestAnimationFrame(animate);
            
            // 物理演算の更新
            world.step(1 / 60);
    
            // 生成された球の更新
            for (var i = balls.length - 1; i >= 0; i--) {

                // ボールが存在し、かつ Three.js オブジェクトも存在する場合
                if (balls[i] && balls[i].mesh) {
                    // ボールの Three.js オブジェクトの位置を、対応する Cannon.js ボディの位置に合わせる
                    balls[i].mesh.position.copy(balls[i].body.position);

                    // ボールの Three.js オブジェクトの回転を、対応する Cannon.js ボディの回転に合わせる
                    balls[i].mesh.quaternion.copy(balls[i].body.quaternion);

                    //特定のy座標に到達したら削除
                    if (balls[i].body.position.y < 1.5) {
                        world.remove(balls[i].body);
                        scene.remove(balls[i].mesh);
                        balls.splice(i, 1);
                    }

                } else {
                    // ボールが存在しないか、Three.js オブジェクトが存在しない場合、配列から削除
                    if (balls[i] && balls[i].mesh) {
                        scene.remove(balls[i].mesh);
                    }
                    balls.splice(i, 1);
                }
            }
    
            renderer.render(scene, camera);
        }
    
        // 初期球の生成
        var ballposi = new CANNON.Vec3(0, 2, 0);

        function createBall(x,y,z) {
            var ballBody = new CANNON.Body({
                mass: A,
                shape: new CANNON.Sphere(0.25),
                material: new CANNON.Material({
                    restitution: 1,
                }),
                position: ballposi
            });
    
            var ballMesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.25, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xff0000 })
            );

            // Three.js Mesh と Cannon.js Body を関連付け
            ballMesh.userData.physicsBody = ballBody;
            ballBody.threeMesh = ballMesh;

            ballBody.velocity.set(0, 0, 0); // 例として初速度を設定
            ballBody.applyForce(new CANNON.Vec3(x,y,z), new CANNON.Vec3(0, 0, 0)); // 力の与え方

    
            world.addBody(ballBody);
            scene.add(ballMesh);
            balls.push({ mesh: ballMesh, body: ballBody });
        }
   
        animate();
