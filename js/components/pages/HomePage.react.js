/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';

class HomePage extends Component {
	render() {
    const dispatch = this.props.dispatch;
    const { loggedIn } = this.props.data;

    return (
			<article>
				<div>
					<section className="text-section">
						{/* Change the copy based on the authentication status */}
						{loggedIn ? (
							<h1>Welcome to Roland Cloud Rendering, you are logged in!</h1>
						) : (
							<h1>Welcome to Roland Cloud Rendering!</h1>
						)}
						<p>This application demonstrates what a React.js based register/login workflow might look like on the Frontend. I used <a href="https://github.com/mxstbr/react-boilerplate">react-boilerplate</a> as a starting point — the app thus uses Redux, PostCSS, react-router, ServiceWorker, AppCache, bcrypt and lots more. See the full source code on <a href="https://github.com/mxstbr/login-flow">Github</a>!</p>
						<p>The default username is <code>AzureDiamond</code> and the default password is <code>hunter2</code>, but feel free to register new users! The registered users are saved to localStorage, so they'll persist across page reloads.</p>
						{loggedIn ? (
							<div>
								<Link to="/dashboard" className="btn btn--dash">Dashboard</Link>
								<Link to="/rendering" className="btn btn--dash">Rendering</Link>
							</div>
						) : (
							<div>
								<Link to="/login" className="btn btn--login">Login</Link>
								<Link to="/register" className="btn btn--register">Register</Link>
							</div>
						)}
					</section>
					
				</div>
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
export default connect(select)(HomePage);
