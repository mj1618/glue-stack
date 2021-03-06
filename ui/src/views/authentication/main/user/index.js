import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Add from "material-ui-icons/Add";
import Refresh from "material-ui-icons/Refresh";
import { CircularProgress } from "material-ui/Progress";
import { findAll } from "api/user";
import { connect } from "api/connector";

import List from "./list";
import { Create, Edit } from "./form";

class UserIndex extends Component {
	render() {
		const { match, findAll, singleView, toggleSideBar } = this.props;

		return (
			<div className="row no-gutters">
				<Route
					path={`${match.path}`}
					exact={singleView}
					render={props => (
						<div className="col h-100vh">
							<AppBar position="static">
								<Toolbar>
									<IconButton
										onClick={toggleSideBar}
										color="contrast"
										aria-label="Menu"
									>
										<MenuIcon />
									</IconButton>
									<Typography color="inherit" type="title" className="mr-auto">
										Users
									</Typography>
									<IconButton color="contrast" onClick={findAll.call}>
										{findAll.pending ? (
											<span>
												<CircularProgress color="inherit" size={14} />
											</span>
										) : (
											<Refresh />
										)}
									</IconButton>
									<Link to={`${match.path}/create`}>
										<IconButton color="contrast">
											<Add />
										</IconButton>
									</Link>
								</Toolbar>
							</AppBar>
							<List listURL={match.path} findAll={findAll} />
						</div>
					)}
				/>
				<Switch>
					<Route
						path={`${match.path}/create`}
						render={props => (
							<Create
								{...props}
								className="col h-100vh"
								refreshList={singleView ? undefined : findAll.call}
							/>
						)}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props => (
							<Edit
								{...props}
								className="col h-100vh"
								refreshList={singleView ? undefined : findAll.call}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default componentQueries({
	queries: [
		({ width }) => ({
			singleView: width < 1000,
		}),
	],
	config: { pure: false },
})(
	connect({
		findAll: {
			params: props => ({}),
			promise: findAll,
		},
	})(UserIndex)
);
