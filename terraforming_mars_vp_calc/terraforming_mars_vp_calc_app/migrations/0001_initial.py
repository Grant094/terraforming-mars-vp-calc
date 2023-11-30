# Generated by Django 4.2.7 on 2023-11-30 20:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=20)),
                ('color', models.CharField(choices=[('BLA', 'Black'), ('BLU', 'Blue'), ('GRE', 'Green'), ('RED', 'Red'), ('YEL', 'Yellow')], default='BLA', max_length=3)),
                ('victory_points', models.IntegerField(default=20)),
                ('megacredits', models.IntegerField(default=0)),
                ('was_winner', models.BooleanField(default=False)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='terraforming_mars_vp_calc_app.game')),
            ],
        ),
    ]