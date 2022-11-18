"use strict";

import "./styles.css";
import { upperNavLinks } from "./navbar";
import { imageSlider } from "./image-slider";

const themeOptions = (() => {
	const themeToggle = document.querySelector(".theme-toggle");
	const githubLogo = document.querySelector(".github-logo");

	const changeTheme = () => {
		if (document.documentElement.getAttribute("theme") === "dark") {
			document.documentElement.setAttribute("theme", "light");
			themeToggle.setAttribute("aria-checked", "true");
			githubLogo.setAttribute("src", "assets/images/logos/GitHub-Mark-32px.png")
		} else {
			document.documentElement.setAttribute("theme", "dark");
			themeToggle.setAttribute("aria-checked", "false");
			githubLogo.setAttribute("src", "assets/images/logos/GitHub-Mark-Light-32px.png");
		};
	};

	changeTheme();
	themeToggle.addEventListener("click", changeTheme);
})();