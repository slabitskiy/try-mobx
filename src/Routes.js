import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { Home } from './containers';
import App from './App';

import store from './stores';

const Routes = () => (
	<App>
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path='/' component={Home} exact />
					<Route component={Home} />
				</Switch>
			</BrowserRouter>
		</Provider>
	</App>
);

export default Routes;