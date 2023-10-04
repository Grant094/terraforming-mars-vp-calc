function calcVictoryPoints() {
    const FIRST_PLACE_AWARD_VP = 5;
    const SECOND_PLACE_AWARD_VP = 2;
    const MILESTONE_VICTORY_POINTS = 5;
    let totalVictoryPoints = 0;
    totalVictoryPoints += Number(document.getElementById("terraform_rating").value);
    if (document.getElementById("winner1").checked) {
        totalVictoryPoints += FIRST_PLACE_AWARD_VP;
    } else if (document.getElementById("contender1").checked) {
        totalVictoryPoints += SECOND_PLACE_AWARD_VP;
    }

    if (document.getElementById("winner2").checked) {
        totalVictoryPoints += FIRST_PLACE_AWARD_VP;
    } else if (document.getElementById("contender2").checked) {
        totalVictoryPoints += SECOND_PLACE_AWARD_VP;
    }

    if (document.getElementById("winner3").checked) {
        totalVictoryPoints += FIRST_PLACE_AWARD_VP;
    } else if (document.getElementById("contender3").checked) {
        totalVictoryPoints += SECOND_PLACE_AWARD_VP;
    }

    totalVictoryPoints += Number(document.getElementById("greeneries").value);

    totalVictoryPoints += (Number(document.getElementById("milestones").value) * MILESTONE_VICTORY_POINTS);

    const citiesChildren = document.getElementById('cities').children;
    for (i = 0; i < citiesChildren.length; i++) {
        if (citiesChildren[i].tagName.toString().toLowerCase() === "input") {
            totalVictoryPoints += Number(citiesChildren[i].value);
        }
    }

    totalVictoryPoints += Number(document.getElementById("cards").value);

    document.getElementById("total_victory_points").innerHTML = "Total Victory Points: " + totalVictoryPoints.toString();
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