﻿import React, { Component } from "react";
import * as PropTypes from "prop-types";
import Head from "next/head";
import Script from "next/script"
import { hotjar } from 'react-hotjar'

function getTagElement([key, value]) {
	if (key === "title") {
		return (
			<title key={key}>{value}</title>
		);
	}
	if (key === "canonicalLink") {
		return (
			<link key={key} rel={"canonical"} href={value} hrefLang="nl" />
		);
	}
	// Opengraph uses [property], but everything else uses [name]
	if (key.indexOf("og:") === 0) {
		return (
			<meta key={key} property={key} content={value} />
		);
	}
	return (
		<meta key={key} name={key} content={value} />
	);
}
export default class HeadComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}

	componentDidMount() {
		this.setState({
			loaded: document.readyState === "complete"
		});
		
		document.addEventListener("readystatechange", () => {
			this.setState({
				loaded: document.readyState === "complete"
			});
		});
		hotjar.initialize(3255480, 6);
	}

	render() {
		const gasource = "https://www.googletagmanager.com/gtag/js?id="+process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
		return <>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
				<meta lang="en" />
				<link rel="icon" href="/images/logo/favicon@32x.png" />
				<link rel="alternate icon" href="/images/logo/favicon.svg" />
				<link rel="apple-touch-icon" href="/images/logo/favicon@180x.png" />
				<link rel="dns-prefetch" href="https://cdn.materialdesignicons.com" />
				{this.props.socialTags && Object.entries(this.props.socialTags).map(getTagElement)}
				{this.state.loaded && <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@3.9.97/css/materialdesignicons.min.css" />}
				{this.state.loaded && <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />}
			</Head>
			<Script id="tawktoscriptwrapper" dangerouslySetInnerHTML={{
				__html: `var Tawk_API=Tawk_API||{ }, Tawk_LoadStart=new Date();
					(function(){
					var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
					s1.async=true;
					s1.src='https://embed.tawk.to/637f4648daff0e1306d92f61/1gikil3cb';
					s1.charset='UTF-8';
					s1.setAttribute('crossOrigin','*');
					s0.parentNode.insertBefore(s1,s0);})();`,
			}}>
			</Script>
			<Script id="gascriptloader" src={gasource}></Script>
			<Script id="gascriptwrapper" dangerouslySetInnerHTML={{
				__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
					page_path: window.location.pathname,
					});
				`
			}}>
			</Script>
		</>;
	}
}

HeadComponent.propTypes = {
	socialTags: PropTypes.object
};