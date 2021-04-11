import React, { useEffect } from 'react';
import './style/main.scss';
import { Menu } from './components/menu/menu';
import { List } from './components/restaurants/list';
import Cart from './components/cart/cart';
import Checkout from './components/checkout/checkout';
import Confirmation from './components/checkout/confirmation';
import Reorder from './components/checkout/reorder';
import { connect } from 'react-redux';
import { data } from './config';
import SpatialNavigation from 'react-js-spatial-navigation';
import { Switch, Route, useRouteMatch, withRouter, useLocation } from 'react-router-dom';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function App(props) {
	let match = useRouteMatch();
	const { clearCache, setUser } = props;

	let query = useQuery();

	useEffect(() => {
		const hhId = query.get('hhid');

		if (hhId) {
			const response = {
				status: 'OK',
				message: 'OK',
				data: {
					hhId: 98771,
					opcoId: 'TS1912025',
					name: 'jan@d1gital.net',
					firstName: 'Jan',
					lastName: 'Pleho',
					status: 1,
					address: '',
				},
			};

			setUser(response);

			// fetch(
			// 	'https://bls-eule.com/bls-a1at/xploretv-tools/mp/api/GetHouseHold/' + hhId,
			// ).then((res) => {
			// const response = {
			// 	status: 'OK',
			// 	message: 'OK',
			// 	data: {
			// 		hhId: 98771,
			// 		opcoId: 'TS1912025',
			// 		name: 'jan@d1gital.net',
			// 		firstName: 'Jan',
			// 		lastName: 'Pleho',
			// 		status: 1,
			// 		address: '',
			// 	},
			// };

			// setUser(res)
			// });
		}
	}, []);

	return (
		<div className='App'>
			<SpatialNavigation>
				<Menu />
				<Switch>
					<Route path={`${match.path}cart`}>
						<Cart />
					</Route>
					<Route path={`${match.path}checkout`}>
						<Checkout />
					</Route>
					<Route path={`${match.path}your-order`}>
						<Confirmation />
					</Route>
					<Route path={`${match.path}reorder`}>
						<Reorder />
					</Route>
					<Route path={`${match.path}`}>
						<List items={data.restaurants} />
					</Route>
				</Switch>
			</SpatialNavigation>
			<button className='clear-cache' onClick={clearCache}>
				clear cache
			</button>
		</div>
	);
}

const mapStateToProps = (state, props) => ({
	step: state.step,
});

const mapDispatchToProps = (dispatch) => {
	return {
		setStep: () => dispatch({ type: 'SET_STEP', payload: { step: Math.random() } }),
		clearCache: () => dispatch({ type: 'CLEAR_CACHE' }),
		setUser: (user) => dispatch({ type: 'SET_USER', payload: { user: user } }),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
