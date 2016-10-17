/*
 * Rendering page
 *
 * The Rendering page shows status of rendered files
 * Route: /rendering
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Rendering extends Component {
  render() {
    return (
      <article>
        <section className="text-section">
          <h1>Rendering page</h1>
        </section>
      </article>
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
