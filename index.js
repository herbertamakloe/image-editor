const fileInput = document.querySelector(".file_input"),
	imagePreview = document.querySelector(".image_preview img"),
	filterOptions = document.querySelectorAll(".filter button"),
	rotateOptions = document.querySelectorAll(".rotate button"),
	filterName = document.querySelector(".filter_info .name"),
	filterValue = document.querySelector(".filter_info .value"),
	filterSlider = document.querySelector(".slider input"),
	resetFilterBtn = document.querySelector(".reset_filter"),
	chooseImageBtn = document.querySelector(".choose_image"),
	saveImageBtn = document.querySelector(".save_image");

let brightness = 100,
	saturation = 100,
	inversion = 0,
	grayscale = 0;

let rotate = 0,
	flipHorizontal = 1,
	flipVertical = 1;

const applyFilters = () => {
	imagePreview.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})`;
	imagePreview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
	let file = fileInput.files[0]; //getting user selected files
	if (!file) return; //return if user has not selected file
	// console.log(file);
	imagePreview.src = URL.createObjectURL(file); //passing file url as preview image src
	imagePreview.addEventListener("load", () => {
		document.querySelector(".container").classList.remove("disable");
		resetFilterBtn.click(); //clicking reset btn so the filter value reset if the user select new img
	});
};

filterOptions.forEach((option) => {
	option.addEventListener("click", () => {
		//adding click event listener to all filter buttons
		document.querySelector(".filter .active").classList.remove("active");
		option.classList.add("active");
		filterName.innerText = option.innerText;

		if (option.id === "brightness") {
			filterSlider.max = "200";
			filterSlider.value = brightness;
			filterValue.innerText = `${brightness}%`;
		} else if (option.id === "saturation") {
			filterSlider.max = "200";
			filterSlider.value = saturation;
			filterValue.innerText = `${saturation}%`;
		} else if (option.id === "inversion") {
			filterSlider.max = "100";
			filterSlider.value = inversion;
			filterValue.innerText = `${inversion}%`;
		} else {
			filterSlider.max = "100";
			filterSlider.value = grayscale;
			filterValue.innerText = `${grayscale}%`;
		}
	});
	console.log(option);
});

const updateFilter = () => {
	filterValue.innerText = `${filterSlider.value}%`;
	// console.log(filterSlider.value);

	const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

	if (selectedFilter.id === "brightness") {
		brightness = filterSlider.value;
	} else if (selectedFilter.id === "saturation") {
		saturation = filterSlider.value;
	} else if (selectedFilter.id === "inversion") {
		inversion = filterSlider.value;
	} else {
		grayscale = filterSlider.value;
	}

	applyFilters();
};

rotateOptions.forEach((option) => {
	option.addEventListener("click", () => {
		//adding cick event listeners to all rotate/flip btn
		// console.log(option);
		if (option.id === "left") {
			rotate -= 90; // if clicked btn is left rotate, decrease rotate value by -90
		} else if (option.id === "right") {
			rotate += 90;
		} else if (option.id === "vertical") {
			flipVertical = flipVertical === 1 ? -1 : 1;
		} else {
			flipHorizontal = flipHorizontal === 1 ? -1 : 1;
		}
		applyFilters();
	});
});

const resetFilter = () => {
	//resetting all variables to their default value
	brightness = 100;
	saturation = 100;
	inversion = 0;
	grayscale = 0;

	rotate = 0;
	flipHorizontal = 1;
	flipVertical = 1;

	filterOptions[0].click(); //clicking brightness button, so the brightness selected by default
	applyFilters();
};

const saveImage = () => {
	// console.log("Save Image button clicked");
	const canvas = document.createElement("canvas"); //creating canvas element
	const ctx = canvas.getContext("2d"); //canvas.getContext return a drawing context on the canvas
	canvas.width = imagePreview.naturalWidth; //setting canvas width to actual image width
	canvas.height = imagePreview.naturalHeight; //setting canvas heiht to actual image height

	//applying user selected filter to canvas
	ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
	ctx.translate(canvas.width / 2, canvas.height / 2); //translating canvas from center
	if (rotate !== 0) {
		//if rotate value isn't 0, rotate the canvas
		ctx.rotate((rotate * Math.PI) / 180);
	}
	ctx.scale(flipHorizontal, flipVertical); //flip canvas, horizontal/vertical
	ctx.drawImage(
		imagePreview,
		-canvas.width / 2,
		-canvas.height / 2,
		canvas.width,
		canvas.height
	);

	const link = document.createElement("a"); //creating <a> element tag
	link.download = "image.jpg"; //passing <a> tag download value to "image.jpg"
	link.href = canvas.toDataURL(); //passing <a> tag value to canvas data url
	link.click(); //clicking <a> tag so the image download
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImageBtn.addEventListener("click", () => fileInput.click());
imagePreview.addEventListener("click", () => {
	if (imagePreview.getAttribute("src") === "image-placeholder.svg") {
		fileInput.click();
	} else {
		return;
	}
});
resetFilterBtn.addEventListener("click", resetFilter);
saveImageBtn.addEventListener("click", saveImage);
