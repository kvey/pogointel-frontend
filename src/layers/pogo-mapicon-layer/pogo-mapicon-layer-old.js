import {Layer} from 'deck.gl';
import {Model, Program, Geometry} from 'luma.gl';
const glslify = require('glslify');

const ATTRIBUTES = {
  instancePositions: {size: 3, '0': 'x', '1': 'y', '2': 'unused'},
  instanceColors: {size: 3, '0': 'red', '1': 'green', '2': 'blue'}
};

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

    attributeManager.addInstanced(ATTRIBUTES, {
      instancePositions: {update: this.calculateInstancePositions},
      instanceColors: {update: this.calculateInstanceColors}
    });
  }

  didMount() {
    this.updateUniforms();
  }

  willReceiveProps(oldProps, newProps) {
    super.willReceiveProps(oldProps, newProps);
    this.updateUniforms();
  }

  getModel(gl) {
    const NUM_SEGMENTS = 16;
    const PI2 = Math.PI * 2;

    let positions = [];
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      positions = [
        ...positions,
        Math.cos(PI2 * i / NUM_SEGMENTS),
        Math.sin(PI2 * i / NUM_SEGMENTS),
        0
      ];
    }

    return new Model({
      program: new Program(gl, {
        vs: glslify('./pogo-mapicon-layer-vertex.glsl'),
        fs: glslify('./pogo-mapicon-layer-fragment.glsl'),
        id: 'pogo-mapicon'
      }),
      geometry: new Geometry({
        drawMode: 'TRIANGLE_FAN',
        positions: new Float32Array(positions)
      }),
      isInstanced: true
    });
  }

  updateUniforms() {
    this.calculateRadius();
    const {radius} = this.state;
    this.setUniforms({
      radius
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

  calculateRadius() {
    // use radius if specified
    if (this.props.radius) {
      this.state.radius = this.props.radius;
      return;
    }

    const pixel0 = this.project({lon: -122, lat: 37.5});
    const pixel1 = this.project({lon: -122, lat: 37.5002});

    const dx = pixel0.x - pixel1.x;
    const dy = pixel0.y - pixel1.y;

    this.state.radius = Math.max(Math.sqrt(dx * dx + dy * dy), 2.0);
  }

}
