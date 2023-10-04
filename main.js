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