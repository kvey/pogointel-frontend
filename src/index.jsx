import document from 'global/document';
import window from 'global/window';
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import MapGL from 'react-map-gl';
import assign from 'object-assign';
import locations from 'example-cities';
import rasterTileStyle from 'raster-tile-style';

import _ from 'lodash'
import d3 from 'd3'

import autobind from 'autobind-decorator';

import PogoMap from './components/PogoMap.jsx';
import PogoSidebar from './components/PogoSidebar.jsx';

var tileSource = '//maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
var mapStyle = Immutable.fromJS(rasterTileStyle([tileSource]));



export default class App extends Component {

  constructor(props) {
    super(props);
    window.addEventListener('resize', this._onWindowResize);
    this.state = {width: window.innerWidth};
    d3.csv("./src/resources/data/sample.csv", function(data){

      const allData = Immutable.fromJS( _.map(data, function(d) {
        return {
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lng),
          num: parseInt(d.num)}}));

      this.setState({data: allData,
                     filteredData: allData});
    }.bind(this));
  }

  @autobind _onWindowResize() {
    this.setState({width: window.innerWidth});
  }

  @autobind _handleMonClick(monNum) {
    this.setState({
      filteredData: this.state.data.filter((m) => m.get('num') == monNum )
    });
  }

  render() {
    const common = {
      width: window.innerWidth,
      height: window.innerHeight,
      viewport: {
        latitude: 37.7,
        longitude: -122.4,
        zoom: 1
      },
      mapStyle: mapStyle,
    };

    return (
      <div>
        <PogoMap
          width={ this.state.width - 30 }
          height={ this.state.height }
          locations={ this.state.filteredData }
          { ...common } />
        <PogoSidebar
          onMonClick={this._handleMonClick}
        />
      </div>
    );
  }
}


var ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = "src/style.css";
document.getElementsByTagName("head")[0].appendChild(ss);

var reactContainer = document.createElement('div');
document.body.style.margin = '0';
document.body.appendChild(reactContainer);
ReactDOM.render(<App/>, reactContainer);
