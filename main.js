let allColors = ["black", "blue", "green", "red", "yellow"];

function calcVictoryPoints() {
    const FIRST_PLACE_AWARD_VP = 5;
    const SECOND_PLACE_AWARD_VP = 2;
    const MILESTONE_VICTORY_POINTS = 5;
    const MIN_INT_BESIDES_FOR_CARDS = 0; // all VP sub-totals except from cards must be non-negative
    const MAX_INT = 999; // maximum value allowed in HTML file
    const MAX_MILESTONES = 3; // a player cannot claim more than 3 milestones
    const MAX_ADJACENT_GREENERIES = 6; // a city cannot have more than 6 greeneries adjacent to it

    allNumbersToIntegers();

    for (let color of allColors) {
        let megacredits = document.getElementById(`megacredits_${color}`);
        adjustNumberToWithinRange(megacredits, MIN_INT_BESIDES_FOR_CARDS, MAX_INT);
        let totalVictoryPoints = 0;
        let terraform_rating = document.getElementById("terraform_rating_" + color);
        adjustNumberToWithinRange(terraform_rating, MIN_INT_BESIDES_FOR_CARDS, MAX_INT);
        totalVictoryPoints += Number(terraform_rating.value);

        if (document.getElementById("winner1" + "_" + color).checked) {
            totalVictoryPoints += FIRST_PLACE_AWARD_VP;
        } else if (document.getElementById("contender1" + "_" + color).checked) {
            totalVictoryPoints += SECOND_PLACE_AWARD_VP;
        }

        if (document.getElementById("winner2" + "_" + color).checked) {
            totalVictoryPoints += FIRST_PLACE_AWARD_VP;
        } else if (document.getElementById("contender2_" + color).checked) {
            totalVictoryPoints += SECOND_PLACE_AWARD_VP;
        }

        if (document.getElementById("winner3" + "_" + color).checked) {
            totalVictoryPoints += FIRST_PLACE_AWARD_VP;
        } else if (document.getElementById("contender3" + "_" + color).checked) {
            totalVictoryPoints += SECOND_PLACE_AWARD_VP;
        }

        const milestonesClaimed = document.getElementById("milestones" + "_" + color);

        let milestoneElements = document.querySelectorAll("[id*='milestones_']");
        let totalMilestonesClaimed = 0;
        for (let element of milestoneElements) {
            totalMilestonesClaimed += Number(element.value);
        }

        let maxMilestonesClaimableByThisColor = MAX_MILESTONES - totalMilestonesClaimed + Number(milestonesClaimed.value);

        milestonesClaimed.max = maxMilestonesClaimableByThisColor;

        adjustNumberToWithinRange(milestonesClaimed, MIN_INT_BESIDES_FOR_CARDS, maxMilestonesClaimableByThisColor);

        // if a milestones claimed value somehow gets out of range, zero all of them
        if (Number(milestonesClaimed.value) < 0 || Number(milestonesClaimed.value) > 3) {
            for (let element of milestoneElements) {
                element.value = 0;
            }
        }

        totalVictoryPoints += (Number(milestonesClaimed.value) * MILESTONE_VICTORY_POINTS);

        const greeneries = document.getElementById("greeneries" + "_" + color);
        adjustNumberToWithinRange(greeneries, MIN_INT_BESIDES_FOR_CARDS, MAX_INT);
        totalVictoryPoints += Number(greeneries.value);

        const citiesChildren = document.getElementById('cities' + "_" + color).children;
        for (i = 0; i < citiesChildren.length; i++) {
            const citiesChild = citiesChildren[i];
            if (citiesChild.tagName.toString().toLowerCase() === "input") {
                adjustNumberToWithinRange(citiesChild, MIN_INT_BESIDES_FOR_CARDS, MAX_ADJACENT_GREENERIES);
                totalVictoryPoints += Number(citiesChild.value);
            }
        }

        // points from cards can be anywhere from -inf to +inf, so the number does not need to be validated within a range
        totalVictoryPoints += Number(document.getElementById("cards" + "_" + color).value);
        
        document.getElementById("victory_points" + "_" + color).innerHTML = totalVictoryPoints.toString();
    }

    crownWinner();
};

function crownWinner() {
    let winningColors = highestOfResource("megacredits_", highestOfResource("victory_points_"));

    // empty all crown cells before crowning one or more winners
    for (let element of document.querySelectorAll('[id*="crown_"]')) {
        element.innerHTML = "";
    }

    for (let color of winningColors) {
        document.getElementById(`crown_${color}`).innerHTML = "W";
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
    newLabel.setAttribute("class", "adjacent_greeneries");
    newLabel.innerHTML = cityId.toString() + ": ";
    
    newInput = document.createElement('input');
    newInput.setAttribute("type", "number");
    newInput.setAttribute("id", attributeId);
    newInput.setAttribute("name", attributeId);
    newInput.setAttribute("class", "adjacent_greeneries");
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

function highestOfResource(resourceSelector, existingWinners = allColors) {
    let elements = document.querySelectorAll(`[id*="${resourceSelector}"]`);
    let winningAmount = 0;
    let winningColors = [];
    
    for (let element of elements) {
        let color = element.id.split("_").pop();
        // console.log(document.getElementById(`playerCell_${color}`).querySelector(`#show_yellow`));
        if (document.getElementById(`playerCell_${color}`).querySelector(`#show_${color}`)) {
            // this means the relevant color has a show button, which is only added if the color is hidden
            // and if the color has been hidden, it should be skipped
            continue;
        }
        let amount = 0;

        if (resourceSelector === "victory_points_") {
            amount = Number(element.innerHTML);
        } else if (resourceSelector === "megacredits_") {
            amount = Number(element.value);
        }

        
        if (!(existingWinners.includes(color))) {
            continue;
        }

        if (amount > winningAmount) {
            winningAmount = amount;
            winningColors = [];
            winningColors.push(color);
        } else if (amount === winningAmount) {
            winningColors.push(color);
        }
    }
    
    return winningColors;
};

function hideColor(color) {
    for (let element of document.querySelectorAll(`[id*="_${color}"]`)) {
        element.style.width = '1em';
        if ((element.tagName.toLowerCase() === "td" && !(element.getAttribute("name").toString().includes("victory_points_"))) ||
            (element.tagName.toLowerCase() === "th" && element.id.toLowerCase().includes("playercell_"))) {
            continue;
        } else if ((element.tagName.toLowerCase() === "th" && element.id.toLowerCase().includes("crown_")) ||
            element.tagName.toLowerCase() === "td" && element.getAttribute("name").toString().includes("victory_points_")) {
            element.innerHTML = "";
        } else {
            element.style.display = 'none';
        }
    }

    let showButton = document.createElement('button');
    showButton.setAttribute("type", "button");
    showButton.setAttribute("id", `show_${color}`);
    showButton.setAttribute("class", "show_color");
    showButton.setAttribute("onclick", `showColor('${color}')`);
    showButton.innerHTML = "+";
    
    document.getElementById(`playerCell_${color}`).appendChild(showButton);

    crownWinner();
};

function showColor(color) {
    for (let element of document.querySelectorAll(`[id*="_${color}"]`)) {
        element.style.width = "";
        if (element.tagName.toLowerCase() === "td" && !(element.getAttribute("name").toString().includes("victory_points_")) ||
            element.tagName.toLowerCase() === "th" ||
            element.tagName.toLowerCase() === "td" && element.getAttribute("name").toString().includes("victory_points_")) {
            continue;
        } else {
            element.style.display = 'inline';
        }
    }

    document.getElementById(`show_${color}`).remove();

    calcVictoryPoints();
};