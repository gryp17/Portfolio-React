import React from "react";
import ReactDOM from "react-dom";
import ProjectsViewer from "./projects-viewer";

import "../scss/index.scss";

class Portfolio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			projects: null
		}

		this.config = {
			domain: window.location.href,
			projectTemplatesDir: "public/templates/",
			projectImagesDir: "public/img/projects/"
		}

		this.preloadProjects = this.preloadProjects.bind(this);
	}

	componentDidMount() {
		//remove the 000webs branding...
		$("body").find("a[title='Hosted on free web hosting 000webhost.com. Host your own website for FREE.']").remove();

		$.get({
			url: 'public/projects.json'
		}).then((projects) => {
			this.preloadProjects(projects);
		});
	}

	/**
	 * Preloads all project images and templates
	 * @param {Array} projects
	 */
	preloadProjects(projects) {
		const config = this.config;

		if (!projects || projects.length === 0) {
			return;
		}

		let templateRequests = [];

		//preload all projects images and prepare the template requests
		let preloadedProjects = projects.map((project) => {
			templateRequests.push($.get({url: config.projectTemplatesDir+project.template}));

			project.images = project.images.map((image) => {
				let img = new Image();
				img.src = config.domain + config.projectImagesDir + image;
				return img.src;
			});

			return project;
		});

		//preload all templates		
		Promise.all(templateRequests).then((templates) => {
			templates.forEach((template, index) => {
				preloadedProjects[index].template = template;
			})

			this.setState({
				projects: preloadedProjects
			});
		});

	}

	render() {
		return (
			<div className="portfolio">
				{this.state.projects ? 
					<React.Fragment>
						<header>
							test
						</header>

						<ProjectsViewer projects={this.state.projects}/>
					</React.Fragment>
					:
					<div className="uil-ring-css">
						<div></div>
					</div>
				}
			</div>
		)
	}
}

ReactDOM.render(<Portfolio/>, document.getElementById("root"));