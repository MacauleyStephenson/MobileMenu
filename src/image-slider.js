"use strict";

const imageSlider = (() => {
	const images = [
		{
			url: "assets/images/kate-stone-matheson-uy5t-CJuIK4-unsplash.jpg",
			alt: "A mostly white cat sleeping beneath bed covers.",
			"credit link": "https://unsplash.com/@kstonematheson",
			"credit name": "Kate Stone Matheson on Unsplash"
		},
		{
			url: "assets/images/daria-shatova-46TvM-BVrRI-unsplash.jpg",
			alt: "A small cat laying upside down, staring into the camera with their paws stretched out.",
			"credit link": "https://unsplash.com/@dariasha911",
			"credit name": "Daria Shatova on Unsplash"
		},
		{
			url: "assets/images/jae-park-7GX5aICb5i4-unsplash.jpg",
			alt: "A white and tan cat looking into the camera with their mouth open mid-meow.",
			"credit link": "https://unsplash.com/@jaehunpark",
			"credit name": "Jae Park on Unsplash"
		},
		{
			url: "assets/images/justin-sinclair-0ptOFauN7n8-unsplash.jpg",
			alt: "Two calico cats, one walking towards the camera and the other sitting and staring at a wall.",
			"credit link": "https://unsplash.com/@justinsinclair",
			"credit name": "Justin Sinclair on Unsplash"
		},
		{
			url: "assets/images/marko-blazevic-zBvVuRJ71vU-unsplash.jpg",
			alt: "A gray cat standing on their hind legs, with their front paws bent in front of them.",
			"credit link": "https://unsplash.com/@kerber",
			"credit name": "Marko Blažević on Unsplash"
		},
	];

	images.forEach((image, index) => {


		const dot = document.createElement("span");
		dot.className = "dot";
		dot.setAttribute("role", "button");
		dot.setAttribute("tabindex", "0");
		dot.setAttribute("aria-label", `select image ${index + 1}`);
		document.querySelector(".slider-dots").appendChild(dot);
	})

	const dots = document.getElementsByClassName("dot");
	const setActiveDot = (indexInput) => {
		Array.from(dots).forEach((dot) => {
			dot.classList.remove("active-dot");
		});
		dots[indexInput].classList.add("active-dot");
	};

	const selectImageByDot = (selection, e) => {
		imageIndex = selection;
		resetCycle();
	};

	Array.from(dots).forEach((dot, index) => {
		dot.addEventListener("click", () => {
			selectImageByDot(index);
		});

		dot.addEventListener("keydown", (e) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				selectImageByDot(index);
			}
		});
	});

	const nextArrow = document.querySelector(".next-arrow");
	const previousArrow = document.querySelector(".previous-arrow");
	const selectImageByArrow = (e) => {
		console.log(e.currentTarget);
		if (e.currentTarget === nextArrow) {
			increaseImageIndex();
			resetCycle();
		} else if (e.currentTarget === previousArrow) {
			decreaseImageIndex();
			resetCycle();
		}
	};

	nextArrow.addEventListener("click", selectImageByArrow);
	nextArrow.addEventListener("keydown", (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			selectImageByArrow(e);
		}
	});
	previousArrow.addEventListener("click", selectImageByArrow);
	previousArrow.addEventListener("keydown", (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			selectImageByArrow(e);
		}
	});

	let imageIndex = 0;
	const currentImage = document.querySelector(".current-image");
	const displayImage = () => {
		const imageCredit = document.querySelector("#credit-link");
		currentImage.setAttribute("src", images[imageIndex].url);
		currentImage.setAttribute("alt", images[imageIndex].alt);
		imageCredit.setAttribute("href", images[imageIndex]["credit link"]);
		imageCredit.textContent = images[imageIndex]["credit name"];

		setActiveDot(imageIndex);
	};

	const increaseImageIndex = () => {
		if (imageIndex === images.length - 1) {
			imageIndex = 0;
		} else {
			imageIndex++;
		};
	};

	const decreaseImageIndex = () => {
		if (imageIndex === 0) {
			imageIndex = images.length - 1;
		} else {
			imageIndex -= 1;
		};
	};

	let cycleState;
	const changeCycleState = (e) => {
		if (!cycleState) {
			cycleState = setInterval(function () {
				increaseImageIndex();
				displayImage();
			}, 5000);
		} else {
			clearInterval(cycleState);
			cycleState = null;
		}
	};

	const resetCycle = () => {
		if (cycleState) {
			changeCycleState();
		};
		displayImage();
		changeCycleState();
	}

	// run first slide and start cycle on page load
	displayImage();
	changeCycleState();

	currentImage.addEventListener("click", changeCycleState);
	currentImage.addEventListener("keydown", (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			changeCycleState(e);
		}
	})
})();

export { imageSlider }