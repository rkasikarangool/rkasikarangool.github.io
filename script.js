//Experience page filter adapted from W3Schools Filter Elements https://www.w3schools.com/howto/howto_js_filter_elements.asp
var categoryFilter = document.getElementById("category");
var priceFilter = document.getElementById("price-filter");
var resultsCount = document.getElementById("results-count");
var cards = document.getElementsByClassName("exp-card");

function updateExperiences() {
	var category = categoryFilter.value;
	var priceRange = priceFilter.value;
	var visibleCount = 0;

	for (var i = 0; i < cards.length; i++) {
		var card = cards[i];

		//Check if experience class matches the category
		var matchesCat = category === "all" || card.className.includes(category);

		//Reads the price of the experience and converts it to a number
		var priceText = card.getElementsByClassName("card-price-tag")[0].textContent;
		var cardPrice = Number(priceText.replace("€", ""));

		var matchesPrice = true;
		if (priceRange === "under-25") {
			matchesPrice = cardPrice < 25;
		} else if (priceRange === "25-50") {
			matchesPrice = cardPrice >= 25 && cardPrice <= 50;
		} else if (priceRange === "over-50") {
			matchesPrice = cardPrice > 50;
		}

		if (matchesCat && matchesPrice) {
			card.style.display = "flex";
			visibleCount++;
		} else {
			card.style.display = "none";
		}
	}

	resultsCount.textContent = "Showing " + visibleCount + " of " + cards.length + " experiences";
}

if (categoryFilter && priceFilter) {
	categoryFilter.addEventListener("change", updateExperiences);
	priceFilter.addEventListener("change", updateExperiences);
}

//Toggle Favourite button adapted from W3Schools Toggle Class https://www.w3schools.com/howto/howto_js_toggle_class.asp
function toggleFavourite(button) {
	var card = button.parentElement.parentElement;

	card.classList.toggle("favourite");
	button.classList.toggle("saved");

	if (button.textContent === "Save") {
		button.textContent = "Saved";
	} else {
		button.textContent = "Save";
	}

	updateExperiences();
}

//Contact form
function formChecker(event) {
	event.preventDefault();

	var name = document.getElementById("formName").value.trim();
	var email = document.getElementById("formEmail").value.trim();
	var phone = document.getElementById("formPhone").value.trim();
	var queryType = document.getElementById("formQuery").value;
	var message = document.getElementById("formMessage").value.trim();

	//Required fields
	if (name === "" || email === "" || phone === "" || queryType === "" || message === "") {
		alert("Please fill in all fields.");
		return;
	}

	//Valid email format
	if (email.includes("@") === false || email.includes(".") === false) {
		alert("Please enter a valid email address.");
		return;
	}

	//Valid phone number
	if (isNaN(phone) || phone.length < 7 || phone.length > 15) {
		alert("Please enter a valid phone number (7 to 15 digits, numbers only).");
		return;
	}

	//Minimum message length
	if (message.length < 20) {
		alert("Your message must be at least 20 characters long.");
		return;
	}

	//Pop-up confirmation and clear form
	alert("Thanks " + name + "! We got your message about " + queryType + " and will reply to " + email + " soon.");
	document.getElementById("myForm").reset();
}

//Destination image slider made adopting code from https://www.w3schools.com/howto/howto_js_slideshow.asp under Automatic Slideshow
var slideIndex = 0;
showSlides();

function showSlides() {
	var i;
	var slides = document.getElementsByClassName("slideImg");
	var dots = document.getElementsByClassName("dot");

	//To prevent .style.display = "block", which repeats in the console when on pages without .slideImg
	if (slides.length === 0) {
		return;
	}

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}

	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active-dot", "");
	}

	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active-dot";

	setTimeout(showSlides, 3000);
}