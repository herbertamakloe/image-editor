const fileInput = document.querySelector(".file_input"),
	imagePreview = document.querySelector(".image_preview img"),
	filterOptions = document.querySelectorAll(".filter button"),
	rotateOptions = document.querySelectorAll(".rotate button"),
	filterName = document.querySelector(".filter_info .name"),
	filterValue = document.querySelector(".filter_info .value"),
	filterSlider = document.querySelector(".slider input"),
	chooseImageBtn = document.querySelector(".choose_image");

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

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImageBtn.addEventListener("click", () => fileInput.click());
imagePreview.addEventListener("click", () => {
	if (imagePreview) {
		fileInput.click();
	} else {
		return null;
	}
});
