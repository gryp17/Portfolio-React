import React from "react";
import classNames from "classnames";

class Gallery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIndex: 0,
			width: 0
		};

		this.resizeGallery = this.resizeGallery.bind(this);
		this.goTo = this.goTo.bind(this);
		this.goToPrevious = this.goToPrevious.bind(this);
		this.goToNext = this.goToNext.bind(this);
	}


	componentDidMount() {
		this.resizeGallery();
		window.addEventListener("resize", this.resizeGallery);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeGallery);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.images && prevProps.images[0] && prevProps.images[0] !== this.props.images[0]) {
			this.setState({
				currentIndex: 0
			});
		}
	}

	/**
	 * Updates the width state property and resets the currentIndex every time the screen resizes
	 */
	resizeGallery() {
		if (this.element) {
			let width = this.element.getBoundingClientRect().width;
			
			this.setState({
				currentIndex: 0,
				width: width
			});
		}
	}

	/**
	 * Goes to the provided image index
	 * @param {Number} index
	 */
	goTo(index) {
		let imagesCount = this.props.images.length;

		if (index < 0) {
			index = imagesCount - 1;
		} else if (index === imagesCount) {
			index = 0;
		}

		this.setState({
			currentIndex: index
		});
	}

	/**
	 * Shows the previous image
	 */
	goToPrevious() {
		this.goTo(this.state.currentIndex - 1);
	}

	/**
	 * Shows the next image
	 */
	goToNext() {
		this.goTo(this.state.currentIndex + 1);
	}

	/**
	 * Renders the image navigation arrows
	 * @returns {Object}
	 */
	renderArrows() {
		if (this.props.images.length <= 1) {
			return;
		}

		return (
			<div className="arrows">
				<button
					type="button"
					onClick={this.goToPrevious}>
					<img src="public/img/arrow-white.png"/>
				</button>

				<button
					type="button"
					onClick={this.goToNext}>
					<img src="public/img/arrow-white.png"/>
				</button>
			</div>
		);
	}

	/**
	 * Renders image thumbnails
	 * @returns {Object}
	 */
	renderThumbnails() {
		if (this.props.images.length <= 1) {
			return;
		}

		let thumbnails = this.props.images.map((image, index) => {
			return (
				<div
					key={index}
					className={classNames('thumb', {'active': index === this.state.currentIndex})}
					onClick={this.goTo.bind(null, index)}
					style={{backgroundImage: 'url('+image+')'}}></div>
			)
		});

		return (
			<div className="thumbnails">
				{thumbnails}
			</div>
		);
	}

	/**
	 * Renders the gallery images
	 * @returns {Object}
	 */
	renderImages() {
		let { images } = this.props;
		
		return images.map((image, index) => {

			let imageStyles = {
				width: this.state.width,
				backgroundImage: 'url('+image+')'
			};

			return (
				<div
					key={index}
					className={classNames('image', {'active': index === this.state.currentIndex})}
					style={imageStyles}>
				</div>
			);
		});
	}

	render() {
		let trackWidth = this.props.images.length * this.state.width;

		let trackStyles = {
			width: trackWidth,
			transform: 'translate3d('+this.state.currentIndex * this.state.width * -1 +'px, 0px, 0px)'
		};

		return (
			<div className="gallery" ref={(element) => this.element = element}>

				{trackStyles.width > 0 &&
					<React.Fragment>
						<div className="track" style={trackStyles}>
							{this.renderImages()}
						</div>

						{this.renderArrows()}
					</React.Fragment>
				}

				{this.renderThumbnails()}
			</div>
		);
	}
}

export default Gallery;