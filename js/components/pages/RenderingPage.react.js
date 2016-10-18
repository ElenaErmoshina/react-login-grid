/*
 * Rendering page
 *
 * The Rendering page shows status of rendered files
 * Route: /rendering
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactDataGrid from 'react-data-grid';
import ReactDataGridCss from 'react-data-grid/themes/react-data-grid.css';
import ReactDataGridPlugins from 'react-data-grid/addons';
import BootstrapCss from 'bootstrap/dist/css/bootstrap.css'
import Select from 'react-select';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
  ProgressBar
} from 'react-bootstrap';



class Rendering extends Component {   
  render() {
    var that = this;
    var _rows = [{
          id: 0,
          dropTime: '10/1/16 11:22',
          name: 'pre-render',
          pack: null,
          rate: null,
          user: 'sky',
          status: { state: 'prerender' },
          actions: 'prerender',
        },{
          id: 1,
          dropTime: '10/15/16 5:02',
          name: 'rendering',
          pack: 'Ghost Voices',
          rate: 44000,
          user: 'sky',
          status: { state: 'rendering', progress: 58 },
          actions: 'rendering',
        },{
          id: 2,
          dropTime: '10/6/16 1:20',
          name: 'post-render',
          pack: 'Tera Piano',
          rate: 24000,
          user: 'sky',
          status: { state: 'postrender', time: '3 minutes' },
          actions: 'postrender',
        }];

    // The state
   this.state = {
      loading: false,
      rate: '48000',
      pack: '12,2',
      rows: _rows,
      originalRows: _rows,
    };

    // Formaters
    var StatusFormatter = React.createClass({
          render: function() {
            var returnEl = null;

            if(this.props.value.state === 'rendering') {
              returnEl = (
                <ProgressBar active
                  label={this.props.value.progress + '%'}
                  now={this.props.value.progress} />
              );
            } else if (this.props.value.state === 'postrender') {
              returnEl =  this.props.value.time;
            }

            return (
              <div className="progress-cell">
                {returnEl}
              </div>
            );
          }
        });

    var ActionFormatter = React.createClass({
      render:function() {
        var percentComplete = this.props.value + '%';
        var returnEl = null;

        if(this.props.value === 'postrender') {
          returnEl = (
            <ButtonGroup>
              <Button className="btn-table" bsSize="small"><span className="glyphicon glyphicon-play"></span></Button>
              <Button className="btn-table" bsSize="small"><span className="glyphicon glyphicon-remove"></span></Button>
              <Button className="btn-table" bsSize="small"><span className="glyphicon glyphicon-arrow-down"></span></Button>
            </ButtonGroup>
          );
        } else if(this.props.value === 'prerender') {
          returnEl = (
            <ButtonGroup>
              <Button className="btn-table" bsSize="small"><span className="glyphicon glyphicon-arrow-up"></span></Button>
              <Button className="btn-table" bsSize="small"><span className="glyphicon glyphicon-remove"></span></Button>
            </ButtonGroup>
          );
        } else if(this.props.value === 'rendering') {
          returnEl = (
            <ButtonGroup>
              <Button className="btn-table" bsSize="small"><span className="glyphicon glyphicon-remove"></span></Button>
            </ButtonGroup>
          );
        }

        return (
          <div className="actions">
            {returnEl}
          </div>
        );
      }
    });

    var PackFormatter = React.createClass({
      render:function() {
        var returnEl = null;

        if(this.props.value === null) {
          returnEl = (
            <DropdownButton bsSize="small" bsStyle="primary" title="Pack" id="bg-nested-dropdown">
              <MenuItem eventKey="1">Dropdown link</MenuItem>
              <MenuItem eventKey="2">Dropdown link</MenuItem>
            </DropdownButton>
          );
        } else {
          returnEl = this.props.value;
        }

        return (
          <div className="pack"> 
            {returnEl}
          </div>
        );
      }
    });

    var RateFormatter = React.createClass({
      render:function() {
        var returnEl = null;

        if(this.props.value === null) {
          returnEl = (
            <DropdownButton bsSize="small" bsStyle="primary" title="Rate" id="bg-nested-dropdown">
              <MenuItem eventKey="1">Dropdown link</MenuItem>
              <MenuItem eventKey="2">Dropdown link</MenuItem>
            </DropdownButton>
          );
        } else {
          returnEl = this.props.value;
        }

        return (
          <div className="rate"> 
            {returnEl}
          </div>
        );
      }
    });

    // Columns
    var columns = [
        {
          key: 'dropTime',
          name: 'Drop Time'
          , sortable: true
        },
        {
          key: 'name',
          name: 'File'
          , sortable: true
        },
        {
          key: 'pack',
          name: 'Pack'
          , sortable: true
          , formatter: PackFormatter
        },
        {
          key: 'rate',
          name: 'Rate'
          , sortable: true
          , formatter: RateFormatter
        },
        {
          key: 'user',
          name: 'User'
          , sortable: true
        },
        {
          key: 'status',
          name: 'Status'
          , formatter: StatusFormatter
        },
        {
          key: 'actions',
          name: 'Actions'
          , formatter: ActionFormatter
        }];

        //A rowGetter function is required by the grid to retrieve a row for a given index
    var rowGetter = function(i){
      return that.state.rows[i];;
    };

    // Sort
    var handleGridSort = function(sortColumn, sortDirection){
          var comparer = function(a, b) {
            if(sortDirection === 'ASC'){
              return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if(sortDirection === 'DESC'){
              return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
          }

          var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

          this.setState({rows : rows});
    }.bind(this);

    return (
        <ReactDataGrid
        onGridSort={handleGridSort}
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={_rows.length}
        minHeight={500} />
    );
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Rendering);
