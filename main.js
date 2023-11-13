function calcVictoryPoints() {
    const FIRST_PLACE_AWARD_VP = 5;
    const SECOND_PLACE_AWARD_VP = 2;
    const MILESTONE_VICTORY_POINTS = 5;
    const MIN_INT_BESIDES_FOR_CARDS = 0; // all VP sub-totals except from cards must be non-negative
    const MAX_INT = 999; // maximum value allowed in HTML file
    const MAX_MILESTONES = 3; // a player cannot claim more than 3 milestones
    const MAX_ADJACENT_GREENERIES = 6; // a city cannot have more than 6 greeneries adjacent to it

    let pointsByColor = new Map();
    pointsByColor.set("black", 0);
    pointsByColor.set("blue", 0);
    pointsByColor.set("green", 0);
    pointsByColor.set("red", 0);
    pointsByColor.set("yellow", 0);

    allNumbersToIntegers();

    for (let [key, value] of pointsByColor) {
        let totalVictoryPoints = 0;
        let terraform_rating = document.getElementById("terraform_rating_" + key);
        adjustNumberToWithinRange(terraform_rating, MIN_INT_BESIDES_FOR_CARDS, MAX_INT);
        totalVictoryPoints += Number(terraform_rating.value);

        if (document.getElementById("winner1" + "_" + key).checked) {
            totalVictoryPoints += FIRST_PLACE_AWARD_VP;
        } else if (document.getElementById("contender1" + "_" + key).checked) {
            totalVictoryPoints += SECOND_PLACE_AWARD_VP;
        }

        if (document.getElementById("winner2" + "_" + key).checked) {
            totalVictoryPoints += FIRST_PLACE_AWARD_VP;
        } else if (document.getElementById("contender2_" + key).checked) {
            totalVictoryPoints += SECOND_PLACE_AWARD_VP;
        }

        if (document.getElementById("winner3" + "_" + key).checked) {
            totalVictoryPoints += FIRST_PLACE_AWARD_VP;
        } else if (document.getElementById("contender3" + "_" + key).checked) {
            totalVictoryPoints += SECOND_PLACE_AWARD_VP;
        }

        const milestonesClaimed = document.getElementById("milestones" + "_" + key);
        adjustNumberToWithinRange(milestonesClaimed, MIN_INT_BESIDES_FOR_CARDS, MAX_MILESTONES);
        totalVictoryPoints += (Number(milestonesClaimed.value) * MILESTONE_VICTORY_POINTS);

        const greeneries = document.getElementById("greeneries" + "_" + key);
        adjustNumberToWithinRange(greeneries, MIN_INT_BESIDES_FOR_CARDS, MAX_INT);
        totalVictoryPoints += Number(greeneries.value);

        const citiesChildren = document.getElementById('cities' + "_" + key).children;
        for (i = 0; i < citiesChildren.length; i++) {
            const citiesChild = citiesChildren[i];
            if (citiesChild.tagName.toString().toLowerCase() === "input") {
                adjustNumberToWithinRange(citiesChild, MIN_INT_BESIDES_FOR_CARDS, MAX_ADJACENT_GREENERIES);
                totalVictoryPoints += Number(citiesChild.value);
            }
        }

        // points from cards can be anywhere from -inf to +inf, so the number does not need to be validated within a range
        totalVictoryPoints += Number(document.getElementById("cards" + "_" + key).value);
        
        document.getElementById("victory_points" + "_" + key).innerHTML = totalVictoryPoints.toString();
    }

    
};

function validateAwardSelections(awardToValidate) {
    let winnerElements = document.querySelectorAll('[id*="winner' + awardToValidate.toString() + '"]');
    let winners = 0;
    for (let i = 0; i < winnerElements.length; i++) {
        if (winnerElements[i].checked) {
            winners++;
        }
    }
    if (winners > 1) {
        clearAwardContenders(awardToValidate);
    }

    calcVictoryPoints();
};

function clearAwardContenders(awardToClear) {
    let contenders = document.querySelectorAll('[id*="contender' + awardToClear.toString() + '"]');
    for (let contender of contenders) {
        contender.checked = false;
    }
};

function clearAwardSelection(awardToClear) {
    let awardWinnerElements = document.querySelectorAll('[id*="winner' + awardToClear.toString() + '"]');
    let awardContenderElements = document.querySelectorAll('[id*="contender' + awardToClear.toString() + '"]');
    for (let i = 0; i < Math.max(awardWinnerElements.length, awardContenderElements.length); i++) {
        awardWinnerElements[i].checked = false;
        awardContenderElements[i].checked = false;
    }

    calcVictoryPoints();
};

function addCity(color) {
    
    citiesElement = document.getElementById("cities" + "_" + color);

    // To keep input IDs unique, this calculates how many cities have already been added and adds 1 for the city being added.
    // Each added city adds three elements (<label>, <input>, and <br>), so the count needs to be divided by 3 to know how many cities have been added so far.
    cityId = ((citiesElement.childElementCount / 3) + 1);

    attributeId = "city_" + cityId;

    newLabel = document.createElement('label');
    newLabel.setAttribute("for", attributeId);
    newLabel.innerHTML = cityId.toString() + ": ";
    
    newInput = document.createElement('input');
    newInput.setAttribute("type", "number");
    newInput.setAttribute("id", attributeId);
    newInput.setAttribute("name", attributeId);
    newInput.setAttribute("min", "0");
    newInput.setAttribute("max", "6");
    newInput.setAttribute("value", "0");
    newInput.setAttribute("oninput", "calcVictoryPoints()");

    citiesElement.appendChild(newLabel);
    citiesElement.appendChild(newInput);
    citiesElement.appendChild(document.createElement("br"));
};

function removeCity(color) {
    citiesElement = document.getElementById("cities" + "_" + color);
    for (let i = 0; i < 3; i++) { // each city is represented by 3 child elements, so this needs to delete the last 3 children
        citiesElement.removeChild(citiesElement.lastChild);
    }
};

function allNumbersToIntegers() {
    allInputElements = document.querySelectorAll("input");
    allNumberInputElements = [];
    for (i = 0; i < allInputElements.length; i++) {
        currentInputElement = allInputElements[i];
        if (currentInputElement.type.toLowerCase() === "number" && currentInputElement.value !== "") {
            currentInputElement.value = Math.floor(Number(currentInputElement.value));
        }
    }
};

function adjustNumberToWithinRange(element, min, max) {
    if (Number(element.value) > max) {
        element.value = max;
    } else if (Number(element.value) < min) {
        element.value = min;
    }
};