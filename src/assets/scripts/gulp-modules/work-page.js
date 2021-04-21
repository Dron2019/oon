/* eslint-disable */
/* HOVER CONSTRUCTOR START */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("three"), require("gsap/TweenMax")) : "function" == typeof define && define.amd ? define(["three", "gsap/TweenMax"], t) : e.hoverEffect = t(e.THREE, e.TweenMax)
}(this, function(THREE, t) {
    return t = t && t.hasOwnProperty("default") ? t.default : t,
        function(n) {
            function i() {
                for (var e = arguments, t = 0; t < arguments.length; t++)
                    if (void 0 !== e[t]) return e[t]
            }
            // console.log("%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ", "color: #bada55; font-size: 0.8rem");
            var parent = n.parent,
                displacement = n.displacementImage,
                image1 = n.image1,
                image2 = n.image2,
                images = n.images,
                imagesRatio = i(n.imagesRatio, 1),
                d = i(n.intensity1, n.intensity, 1),
                l = i(n.intensity2, n.intensity, 1),
                u = i(n.angle, Math.PI / 4),
                v = i(n.angle1, u),
                m = i(n.angle2, 3 * -u),
                c = i(n.speedIn, n.speed, 1.6),
                p = i(n.speedOut, n.speed, 1.2),
                hover = i(n.hover, !0),
                h = i(n.easing, Expo.easeOut),
                y = i(n.video, !1);
            if (parent)
                if (image1 && image2 && displacement) {
                    var scene = new THREE.Scene,
                    camera = new THREE.OrthographicCamera(parent.offsetWidth / -2, parent.offsetWidth / 2, parent.offsetHeight / 2, parent.offsetHeight / -2, 1, 1e3);
                    camera.position.z = 1;
                    var webGlRenderer = new THREE.WebGLRenderer({
                        antialias: !1,
                        alpha: !0
                    });
                    webGlRenderer.setPixelRatio(2), 
                    webGlRenderer.setClearColor(16777215, 0), 
                    webGlRenderer.setSize(parent.offsetWidth, parent.offsetHeight), 
                    parent.appendChild(webGlRenderer.domElement);
                    var render = function() {
                            webGlRenderer.render(scene, camera)
                        },
                        textureLoader = new THREE.TextureLoader;
                    textureLoader.crossOrigin = "";
                    var E, W, V = textureLoader.load(displacement, render);
                    if (V.magFilter = V.minFilter = THREE.LinearFilter, y) {
                        var M = function() {
                          requestAnimationFrame(M), webGlRenderer.render(scene, camera)
                        };
                        M(), (y = document.createElement("video")).autoplay = !0, y.loop = !0, y.src = image1, y.load();
                        var P = document.createElement("video");
                        P.autoplay = !0, P.loop = !0, P.src = image2, P.load();
                        var texture1 = new THREE.VideoTexture(y),
                            texture2 = new THREE.VideoTexture(P);
                        texture1.magFilter = texture2.magFilter = THREE.LinearFilter, texture1.minFilter = texture2.minFilter = THREE.LinearFilter, P.addEventListener("loadeddata", function() {
                            P.play(), 
                            (texture2 = new THREE.VideoTexture(P)).magFilter = THREE.LinearFilter, 
                            texture2.minFilter = THREE.LinearFilter, shaderMaterial.uniforms.texture2.value = texture2
                        }, !1), y.addEventListener("loadeddata", function() {
                            y.play(), 
                            (texture1 = new THREE.VideoTexture(y)).magFilter = THREE.LinearFilter, texture1.minFilter = THREE.LinearFilter, 
                            shaderMaterial.uniforms.texture1.value = texture1
                        }, !1)
                    } else {
                      texture1 = textureLoader.load(image1, render), 
                      texture2 = textureLoader.load(image2, render), 
                      texture1.magFilter = texture2.magFilter = THREE.LinearFilter,
                      texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
                    }
                    var ratio = imagesRatio;
                    parent.offsetHeight / parent.offsetWidth < ratio ? (E = 1, W = parent.offsetHeight / parent.offsetWidth / ratio) : (E = parent.offsetWidth / parent.offsetHeight * ratio, W = 1);
                    var shaderMaterial = new THREE.ShaderMaterial({
                        uniforms: {
                            intensity1: {
                                type: "f",
                                value: d
                            },
                            intensity2: {
                                type: "f",
                                value: l
                            },
                            dispFactor: {
                                type: "f",
                                value: 0
                            },
                            angle1: {
                                type: "f",
                                value: v
                            },
                            angle2: {
                                type: "f",
                                value: m
                            },
                            texture1: {
                                type: "t",
                                value: texture1
                            },
                            texture2: {
                                type: "t",
                                value: texture2
                            },
                            disp: {
                                type: "t",
                                value: V
                            },
                            res: {
                                type: "vec4",
                                value: new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, E, W)
                            },
                            dpr: {
                                type: "f",
                                value: window.devicePixelRatio
                            }
                        },
                        vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",
                        fragmentShader: "\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform float dpr;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\nuniform vec4 res;\nuniform vec2 parent;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n\n  vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;\n  vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);\n\n\n  vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n",
                        transparent: !0,
                        opacity: 1
                    }),
                    geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1),
                    material = new THREE.Mesh(geometry, shaderMaterial);
                    // x.add(D), g && (r.addEventListener("mouseenter", _), r.addEventListener("touchstart", _), r.addEventListener("mouseleave", z), r.addEventListener("touchend", z)), window.addEventListener("resize", function(t) { r.offsetHeight / r.offsetWidth < U ? (E = 1, W = r.offsetHeight / r.offsetWidth / U) : (E = r.offsetWidth / r.offsetHeight * U, W = 1), D.material.uniforms.res.value = new e.Vector4(r.offsetWidth, r.offsetHeight, E, W), w.setSize(r.offsetWidth, r.offsetHeight), L() }), 
                    this.next = next,
                    this.previous = prev
                    scene.add(material), 
                    hover && (parent.addEventListener("mouseenter1", next), 
                    parent.addEventListener("touchstart1", next), 
                    parent.addEventListener("mouseleave1", prev), 
                    parent.addEventListener("touchend", prev)),
                        window.addEventListener("resize", function(t) {
                          parent.offsetHeight / parent.offsetWidth < ratio ? 
                          (E = 1, W = parent.offsetHeight / parent.offsetWidth / ratio) : 
                          (E = parent.offsetWidth / parent.offsetHeight * ratio, W = 1),
                          material.material.uniforms.res.value = new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, E, W), 
                          webGlRenderer.setSize(parent.offsetWidth, parent.offsetHeight),
                          render()
                        }),
                    this.next = next,
                    this.previous = prev
                } else console.warn("One or more images are missing");
            else console.warn("Parent missing");

            function next(evt) {
                t = gsap;
                image2 = evt.target.closest('[data-hover-image]').dataset.hoverImage;
                texture1 = textureLoader.load(image1, render), 
                texture2 = textureLoader.load(image2, render), 
                texture1.magFilter = texture2.magFilter = THREE.LinearFilter,
                texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
                shaderMaterial.uniforms.texture2.value = texture2;
                t.to(shaderMaterial.uniforms.dispFactor, c, {
                    value: 1,
                    ease: h,
                    onUpdate: render,
                    onComplete: render
                })
            }

            function prev(evt) {
                t = gsap;
                image1 = evt.target.closest('[data-hover-image]').dataset.hoverImage;
                texture1 = textureLoader.load(image1, render), 
                texture2 = textureLoader.load(image2, render), 
                texture1.magFilter = texture2.magFilter = THREE.LinearFilter,
                texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
                shaderMaterial.uniforms.texture1.value = texture1;
                t.to(shaderMaterial.uniforms.dispFactor, p, {
                    value: 0,
                    ease: h,
                    onUpdate: render,
                    onComplete: render
                })
              }
            
        }
});
//# sourceMappingURL=hover-effect.umd.js.map
/*HOVER CONSTRUCTOR END */





let frontScreenEffect = undefined;
const blockForEffect = document.querySelectorAll('.front-block');
function setImagesRatio() {
    if (window.screen.width < 576) return (568 / 380);
    if (window.screen.width < 769) return (window.screen.width / window.screen.height);
    return (9 / 16);
}


/**
 * Подбор картинки для первого єкрана страниц преимуществ
 * Берется датасет mobile-src, при отсутсвии просто сс
 */
function getImgForFronBlock() {
    let desktopImage = document.querySelector('.front-block__bg').getAttribute('src');
    let mobImage = document.querySelector('.front-block__bg').dataset.mobileSrc;
    if (mobImage !== undefined && window.screen.width < 576) return mobImage;
    return desktopImage;

}
window.addEventListener('load',function(evt){
  Array.from(blockForEffect).forEach((el) => {
      const img = document.querySelector('.front-block__bg');
      Expo = new BezierEasing(0.48, 0.01, 0.5, 1);
      frontScreenEffect = new hoverEffect({
          parent: el.querySelector('.front-block__canvas-wrap'),
         parent: el.querySelector('.front-block__canvas-wrap'),
          intensity: 0.1,
          // angle: Math.PI / 6,
          // intensity: el.dataset.intensity || 0.7,
          speedIn: el.dataset.speedin || 0.8,
          speedOut: el.dataset.speedout || 0.8,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          imagesRatio: img.naturalHeight / img.naturalWidth,
          image1: getImgForFronBlock(),
          image2: getImgForFronBlock(),
          displacementImage: el.dataset.displacement,
      });
  });
  
  frontScreenEffect.canvas = document.querySelector('canvas');
  frontScreenEffect.value = 0;
  frontScreenEffect.canvas.addEventListener('click',switchDistortionEffect );
  
});



function switchDistortionEffect(evt){
  if (frontScreenEffect.value <= 0) {
        frontScreenEffect.next(evt);
        frontScreenEffect.value = !frontScreenEffect.value;
    } else {
        frontScreenEffect.value = !frontScreenEffect.value;
        frontScreenEffect.previous(evt);
    }
}

const hoverImages = document.querySelectorAll('[data-hover-image]')
hoverImages[0].classList.add('active');
switchClassOnSvgSprite(hoverImages[0].querySelector('use'),'active');

hoverImages.forEach(listItem => {
  listItem.addEventListener('mouseenter',switchDistortionEffect)
  listItem.addEventListener('mouseenter',switchActiveList);
});

let indexForAutoplayInterval = 1;
const autoPlayInterval = 3500;
const autoPlay = setInterval(() => {
  const hoverImage = hoverImages[indexForAutoplayInterval];
  const src = hoverImage.querySelector('use').getAttribute('xlink:href');
  switchClassOnSvgSprite(hoverImage.querySelector('use'),'active');
  document.querySelector('.active[data-hover-image]').classList.remove('active');
  hoverImage.classList.add('active');
  switchDistortionEffect({target:hoverImage})
  indexForAutoplayInterval===hoverImages.length-1 ? indexForAutoplayInterval = 0 :  indexForAutoplayInterval++;
}, autoPlayInterval);


function switchActiveList(){
    switchClassOnSvgSprite(this.querySelector('use'),'active');
    document.querySelector('.active[data-hover-image]').classList.remove('active');
    this.classList.add('active');
    clearInterval(autoPlay);
  }
  
  function switchClassOnSvgSprite(useElement, nameOfClass){
    const src = useElement.getAttribute('xlink:href');
    const activeSymbol = document.querySelector('symbol.'+nameOfClass);
    activeSymbol && document.querySelector('symbol.active').classList.remove('active');
    document.querySelector(src).classList.add('active');
}




