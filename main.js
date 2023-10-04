function calcVictoryPoints() {
    const FIRST_PLACE_AWARD_VP = 5;
    const SECOND_PLACE_AWARD_VP = 2;
    const MILESTONE_VICTORY_POINTS = 5;
    let totalVictoryPoints = 0;
    totalVictoryPoints += Number(document.getElementById("terraform_rating").value);
    if (document.getElementById("winner1").checked) {
        totalVictoryPoints += FIRST_PLACE_AWARD_VP;
    } else if (document.getElementById("contender1").checked) {
        totalVictoryPoints += 2;
    }

    if (document.getElementById("winner2").checked) {
        totalVictoryPoints += FIRST_PLACE_AWARD_VP;
    } else if (document.getElementById("contender2").checked) {
        totalVictoryPoints += 2;
    }

    if (document.getElementById("winner3").checked) {
        totalVictoryPoints += FIRST_PLACE_AWARD_VP;
    } else if (document.getElementById("contender3").checked) {
        totalVictoryPoints += 2;
    }

    totalVictoryPoints += (Number(document.getElementById("milestones").value) * MILESTONE_VICTORY_POINTS);
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
};