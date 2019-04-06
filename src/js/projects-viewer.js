import React from "react";
import classNames from "classnames";
import ProjectInfo from "./project-info";

class ProjectsViewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedProject: null
		}

		this.element = React.createRef();
	}

	componentDidMount() {
		//select the first project when the component loads
		if (this.props.projects && this.props.projects.length > 0) {
			this.selectProject(this.props.projects[0], {
				currentTarget: $(this.element.current).find(".project").first()
			});
		}
	}

	/**
	 * Renders the projects list
	 * @param {Array} projects
	 * @returns {Object}
	 */
	renderProjectsList(projects) {
		let items = projects.map((project, index) => {
			let style = {
				backgroundColor: project.background,
				color: project.color
			};

			return (
				<div
					key={index} 
					className={classNames('project', project.class)} 
					style={style} 
					dangerouslySetInnerHTML={{__html: project.title}}
					onClick={this.selectProject.bind(this, project)}>
				</div>
			)
		});
		
		return (
			<div className="projects-list">
				{items}
			</div>
		);
	}

	/**
	 * Sets the selected project
	 * @param {Object} project
	 * @param {Object} e
	 */
	selectProject(project, e) {
		//stop all animations on all projects and return their width to default
		$(this.element.current).find(".project").stop().animate({
			width: "220px"
		}, 200);

		//stretch only the clicked element and render the project data
		$(e.currentTarget).stop().animate({
			"width": "265px"
		}, 500);

		//select the project
		setTimeout(() => {
			this.setState({
				selectedProject: project
			})
		}, 500);
	}

	render() {
		const {projects} = this.props;
		const {selectedProject} = this.state;

		return (
			<div className="projects-viewer" ref={this.element}>
				{this.renderProjectsList(projects)}

				<ProjectInfo project={selectedProject}/>
			</div>
		)
	}
}

export default ProjectsViewer;