window.webGLStart = function() {

  var pgl = PhiloGL;

  var canvas = document.getElementById('lesson02-canvas');

  var app = new pgl.Application(canvas);

  var gl = app.gl;

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  var program = pgl.Program.fromHTMLTemplates(app, 'shader-vs', 'shader-fs');

  program.use();

  program.setBuffers({
    'triangle': {
      attribute: 'aVertexPosition',
      value: new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]),
      size: 3
    },

    'triangleColors': {
      attribute: 'aVertexColor',
      value: new Float32Array([1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1]),
      size: 4
    },

    'square': {
      attribute: 'aVertexPosition',
      value: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0]),
      size: 3
    },

    'squareColors': {
      attribute: 'aVertexColor',
      value: new Float32Array([0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1]),
      size: 4
    }
  });

  var camera = new pgl.PerspectiveCamera({
    aspect: canvas.width/canvas.height,
  });

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //Draw Triangle
  camera.view.$translate(-1.5, 0, -7);
  program.setUniform('uMVMatrix', camera.view);
  program.setUniform('uPMatrix', camera.projection);
  program.setBuffer('triangle');
  program.setBuffer('triangleColors');
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  //Draw Square
  camera.view.$translate(3, 0, 0);
  program.setUniform('uMVMatrix', camera.view);
  program.setUniform('uPMatrix', camera.projection);
  program.setBuffer('square');
  program.setBuffer('squareColors');
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

};
