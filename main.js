function calcVictoryPoints() {
    const FIRST_PLACE_AWARD_VP = 5;
    const SECOND_PLACE_AWARD_VP = 2;
    const MILESTONE_VICTORY_POINTS = 5;
    const MIN_INT_BESIDES_FOR_CARDS = 0; // all VP sub-totals except from cards must be positive
    const MAX_INT = 999; // placeholder maximum integer value
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
        // let elements = document.querySelectorAll('[id*=' + key + ']'); // keeping for reference should delete later
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

        // const citiesChildren = document.getElementById('cities').children;
        // for (i = 0; i < citiesChildren.length; i++) {
        //     const citiesChild = citiesChildren[i];
        //     if (citiesChild.tagName.toString().toLowerCase() === "input") {
        //         adjustNumberToWithinRange(citiesChild, MIN_INT_BESIDES_FOR_CARDS, MAX_ADJACENT_GREENERIES);
        //         totalVictoryPoints += Number(citiesChild.value);
        //     }
        // }

        // points from cards can be anywhere from -inf to +inf, so the number does not need to be validated within a range
        totalVictoryPoints += Number(document.getElementById("cards" + "_" + key).value);

        document.getElementById("victory_points" + "_" + key).innerHTML = totalVictoryPoints.toString();
    }

    
};

function clearAwardSelection(awardToClear) {
    if (awardToClear === 1) {
        document.getElementById('winner1').checked = false;
        document.getElementById('contender1').checked = false;
    } else if (awardToClear === 2) {
        document.getElementById('winner2').checked = false;
        document.getElementById('contender2').checked = false;
    } else if (awardToClear === 3) {
        document.getElementById('winner3').checked = false;
        document.getElementById('contender3').checked = false;
    }

    calcVictoryPoints();
};

function addCity() {
    
    citiesElement = document.getElementById("cities");

    // To keep input IDs unique, this calculates how many cities have already been added and adds 1 for the city being added.
    // Each added city adds four elements (<label>, <input>, and 2x <br>), so the count needs to be divided by 4 to know how many cities have been added so far.
    cityId = ((citiesElement.childElementCount / 4) + 1);

    newLabel = document.createElement('label');
    attributeId = "city_" + cityId;
    
    newLabel.setAttribute("for", attributeId);
    newLabel.innerHTML = "City " + cityId.toString() + ": ";
    
    newInput = document.createElement('input');
    newInput.setAttribute("type", "number");
    newInput.setAttribute("id", attributeId);
    newInput.setAttribute("name", attributeId);
    newInput.setAttribute("min", "0");
    newInput.setAttribute("max", "99");
    newInput.setAttribute("onblur", "calcVictoryPoints()");

    citiesElement.appendChild(newLabel);
    citiesElement.appendChild(newInput);
    citiesElement.appendChild(document.createElement("br"));
    citiesElement.appendChild(document.createElement("br"));
};

function allNumbersToIntegers() {
    allInputElements = document.querySelectorAll("input");
    allNumberInputElements = [];
    for (i = 0; i < allInputElements.length; i++) {
        if (allInputElements[i].type.toLowerCase() === "number") {
            allInputElements[i].value = Math.floor(Number(allInputElements[i].value));
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