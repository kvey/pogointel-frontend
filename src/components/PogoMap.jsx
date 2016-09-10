import 'babel-polyfill';
import document from 'global/document';
import window from 'global/window';
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import MapGL from 'react-map-gl';
//import ScatterplotOverlay from 'react-map-gl/src/overlays/scatterplot.react';
import {DeckGLOverlay, ScatterplotLayer} from 'deck.gl'
import assign from 'object-assign';
import rasterTileStyle from 'raster-tile-style';


import PogoMapIconLayer from '../layers/pogo-mapicon-layer'

import _ from 'lodash';

import regenRuntime from 'regenerator-runtime/runtime'

import autobind from 'autobind-decorator';


const PROP_TYPES = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

class DeckGLWithDeconstructor extends DeckGLOverlay {
  componentWillUnmount(){
    console.log("UNMOUNTING");
    try {
    this.state.gl.getExtension('WEBGL_lose_context').loseContext();
    } catch (e) {
      console.debug("intentional context loss");
    }

  }
}


export default class PogoMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: props.width,
        height: props.height,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: 3,
        //bearing: 180,
        //pitch: 60,
        startDragLngLat: null,
        isDragging: false,
        ...props.viewport
      }
      //mapStyle: buildStyle({stroke: '#FF00FF', fill: 'green'})
    };
  }

  componentWillReceiveProps(nextProps){
   const {locations} = nextProps;

   const points = Immutable.fromJS(locations.map(function(l){
     return {color: [88, 9, 124],
             //radius: 0.5,
             position: {'x': Number( l.get('lng') ),
                        'y': Number( l.get('lat') ),
                        'z': 0,
                        'num': Number( l.get('num') )

             }};
   }));


    this.setState({
      points: points
    })
  }

  @autobind
  _onChangeViewport(opt) {
    if (this.props.onChangeViewport) {
      return this.props.onChangeViewport(opt);
    }
    this.setState({
      viewport: Object.assign(this.state.viewport, opt)
    });
  }

  @autobind
  _onClickFeatures(features) {
    window.console.log(features);
  }

 _renderScatterplotLayer() {
   const {viewport, points} = this.state

   return new PogoMapIconLayer({
     width: viewport.width,
     height: viewport.height,
     latitude: viewport.latitude,
     longitude: viewport.longitude,
     zoom: viewport.zoom,
     id: 'scatterplotLayer',
     data: points,
     //isPickable: true,
     //onHover: this._handleScatterplotHovered,
     //onClick: this._handleScatterplotClicked
   });
 }

  render() {
    const viewport = {
      // mapStyle: this.state.mapStyle,
      ...this.state.viewport,
      ...this.props
    };

    if (!this.state.points) {
      return <div/>;
    }

    return (
      <MapGL
        { ...viewport }
        onChangeViewport={ this._onChangeViewport }
        onClickFeatures={ this._onClickFeatures }
      >

       <DeckGLWithDeconstructor
         key={this.state.points.size}
         id="deckgl-overlay"
         { ...viewport}
         mapState={viewport}
         layers={[
           this._renderScatterplotLayer()
         ]}
       />

      </MapGL>
    );
  }
}

PogoMap.propTypes = PROP_TYPES;
