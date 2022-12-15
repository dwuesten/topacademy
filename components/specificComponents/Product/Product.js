import React, { Component } from "react";
import css from "./Product.module.scss";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import TeacherCard from "../TeacherCard/TeacherCard";
import Element from "../../genericComponents/Element/Element";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Product extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div {...storyblokEditable(this.props.blok)}>
				<Headermenu blok={this.props.menu.content}></Headermenu>
				<main>
					<Hero blok={this.props.blok} contentTypeTag="course" />
					<div className={css["course-page__main-content"]}>
						<div id="course-page__short-description" key="course-page__short-description" className={css["course-page__short-description"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>What will we learn</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document: this.props.blok.description })}</div>
							</section>
						</div>
						<div id="course-page__short-description" key="course-page__short-description" className={css["course-page__short-description"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>Teachers</h2>
								{this.props.blok.teachers && this.props.blok.teachers.map((teacher) => (
									<TeacherCard blok={teacher} key={teacher._uid} />
								))}
							</section>
						</div>
						<div id="course-page__short-description" key="course-page__short-description" className={css["course-page__short-description"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>Locations</h2>
								{this.props.blok.locations && this.props.blok.locations.map((location) => (
									<Element blok={location} key={location._uid} />
								))}
							</section>
						</div>
					</div>

					{this.props.blok.bottombloks && this.props.blok.bottombloks.map((nestedBlok) => (
						<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
					))}
				</main>
			</div>
		);

	}
}