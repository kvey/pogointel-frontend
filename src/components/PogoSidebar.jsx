import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import _ from 'lodash'
import autobind from 'autobind-decorator';

import mon from '../resources/data/mon.en';

const monWithNum = _.mapValues(mon, (v, k, o) => _.merge(v, {'Num': k}))
const monByGroup = _.groupBy(_.values(monWithNum), "EvolutionGroup");

class PogoSidebarMon extends Component {

  @autobind handleMonClick(){
    this.props.onMonClick(parseInt( this.props.mon['Num'] ));
  }

  render(){
    const m = this.props.mon;

    return (
      <div className="PogoSidebar__mon"
        onClick={this.handleMonClick} >
        <div className="PogoSidebar__mon--name">
          {m['Name']}
        </div>
        <div className="PogoSidebar__mon--image">
          <img src={"/src/resources/icons/"+m['Num']+".png"}/>
        </div>
        <div className={"PogoSidebar__type-icon "+
                        "PogoSidebar__type-"+_.lowerCase(m['Type1'])}>
          {m['Type1']}
        </div>
        <div className={"PogoSidebar__type-icon "+
                        "PogoSidebar__type-"+_.lowerCase(m['Type2'])}>
          {m['Type2']}
        </div>
      </div>
    )
  }
}



export default class PogoSidebar extends Component {

  render() {
    return (
      <div className="PogoSidebar">
        {_.values(_.mapValues(monByGroup, (monGroup) =>
          <div className="PogoSidebar__group">
            {_.map(monGroup, (m) =>
              <PogoSidebarMon mon={m} onMonClick={this.props.onMonClick}/>
             )}
          </div>
         ))}
      </div>
    );
  }
}
