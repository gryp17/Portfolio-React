import React from "react";
import classNames from "classnames";

import Gallery from "./gallery";

const ProjectInfo = (props) => {
	const {project} = props;

	if (!project) {
		return null;
	}

	let style = {
		backgroundColor: project.background,
		color: project.color
	};

	let technologies = project.technologies.map((technology, index) => {
		return <li key={index}>{technology}</li>;
	});

	return (
		<div className={classNames('project-info', project.class)} style={style}>
			<h2 className="project-title" dangerouslySetInnerHTML={{__html: project.title}}></h2>

			<Gallery images={project.images}/>

			<div className="project-development">
				<strong>
					Development: {project.development}
				</strong>
			</div>

			<div className="project-description" dangerouslySetInnerHTML={{__html: project.template}}></div>

			<div className="project-technologies">
				<strong>Technologies used:</strong>
				<ul>
					{technologies}
				</ul>
			</div>

			<div className="project-links">
				{project.link &&
					<a href={project.link} target="_blank" title="View/Download project">
						<img src="public/img/cloud.png"/>
					</a>
				}

				{project.source &&
					<a href={project.source} target="_blank" title="View source code">
						<img src="public/img/source.png"/>
					</a>
				}
			</div>
		</div>
	)
}

export default ProjectInfo;