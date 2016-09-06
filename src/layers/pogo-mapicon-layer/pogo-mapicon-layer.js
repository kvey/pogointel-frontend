import {Layer} from 'deck.gl';
import {Model, Program, Geometry, loadTextures, Texture2D} from 'luma.gl';
const glslify = require('glslify');

const ATTRIBUTES = {
  instancePositions: {size: 4, '0': 'x', '1': 'y', '2': 'unused', '3': 'num'},
  instanceColors: {size: 3, '0': 'red', '1': 'green', '2': 'blue'}
};

function makeTextureFromSolidColor(gl, [r = 1, g = 0, b = 0, a = 1]) {
  return new Texture2D(gl, {
    pixels: new Uint8Array([1, 0, 0, 1]),
    width: 1,
    height: 1,
    format: gl.RGBA,
    magFilter: gl.NEAREST,
    minFilter: gl.NEAREST
  });
}



//console.log( Array.from(Array(150).keys()).map((v) => '/src/resources/icons/' + v + '.png') )
export default class PogoMapIconLayer extends Layer {

  static get attributes() {
    return ATTRIBUTES;
  }

  /*
   * @classdesc
   * ScatterplotLayer
   *
   * @class
   * @param {object} props
   * @param {number} props.radius - point radius
   */
  constructor(props) {
    super(props);
  }

  initializeState() {
    const {gl} = this.state;
    const {attributeManager} = this.state;

    this.setState({
      model: this.getModel(gl)
    });


   loadTextures(gl, {
     urls: ['/src/resources/icons/tile_151x1.png']
   }).then(function(textures){
     this.setUniforms({uSampler: textures[0]});
   }.bind(this));

    attributeManager.addInstanced(ATTRIBUTES, {
      instancePositions: {update: this.calculateInstancePositions},
      instanceColors: {update: this.calculateInstanceColors}
    });
  }


  willReceiveProps(oldProps, newProps) {
    super.willReceiveProps(oldProps, newProps);
    if(!oldProps.data.equals(newProps.data)) {
      this.updateAttributes(this.props)
      console.log("updated");
    }
  }

  getModel(gl) {
    const {attributeManager} = this.state;



    return new Model({
      isInstanced: true,
      program: new Program(gl, {
        vs: glslify('./pogo-mapicon-layer-vertex.glsl'),
        fs: glslify('./pogo-mapicon-layer-fragment.glsl'),
        id: 'pogo-mapicon'
      }),
      geometry: new Geometry({
        positions:  new Float32Array(
          [
            1.0, 1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
          ]),
        tex_coords: {
          size: 2,
          value: new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0/151, 1.0,
            1.0/151, 0.0
          ])},
        indices: new Uint16Array([0, 1, 2, 2, 3, 0])
      }),
      uniforms: {
        uSampler: makeTextureFromSolidColor(gl, [1.0, 0.3, 0.3, 1.0])
      },
    });
  }


  calculateInstancePositions(attribute) {
    const {data} = this.props;
    const {value, size} = attribute;
    let i = 0;
    for (const point of data) {
      value[i + 0] = point.position.x;
      value[i + 1] = point.position.y;
      value[i + 2] = point.position.z;
      value[i + 3] = point.position.num;
      i += size;
    }
  }

  calculateInstanceColors(attribute) {
    const {data} = this.props;
    const {value, size} = attribute;
    let i = 0;
    for (const point of data) {
      value[i + 0] = point.color[0];
      value[i + 1] = point.color[1];
      value[i + 2] = point.color[2];
      i += size;
    }
  }

}
