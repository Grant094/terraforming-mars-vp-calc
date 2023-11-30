from django.db import models

# Create your models here.
class Game(models.Model):
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"Game at {self.timestamp}"

class Person(models.Model):
    name = models.TextField(max_length=200, unique=True)
    def __str__(self):
        return f"{self.name}"

class Score(models.Model):
    BLACK = "BLA"
    BLUE = "BLU"
    GREEN = "GRE"
    RED = "RED"
    YELLOW = "YEL"
    COLOR_CHOICES = [
        (BLACK, "Black"),
        (BLUE, "Blue"),
        (GREEN, "Green"),
        (RED, "Red"),
        (YELLOW, "Yellow"),
    ]
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    color = models.CharField(
        max_length=3,
        choices=COLOR_CHOICES,
        default=BLACK,
    )
    victory_points = models.IntegerField(default=20)
    megacredits = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.person.name} with {self.victory_points} VP and {self.megacredits} MC at {self.game.timestamp}"