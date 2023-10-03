function calcVictoryPoints() {
    let totalVictoryPoints = 0;
    totalVictoryPoints += Number(document.getElementById("terraform_rating").value);
    totalVictoryPoints += (Number(document.getElementById("milestones").value) * 5);
    document.getElementById("total_victory_points").innerHTML = "Total Victory Points: " + totalVictoryPoints.toString();
};