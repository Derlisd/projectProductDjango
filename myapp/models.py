from django.db import models

# Create your models here.
class Brand(models.Model):
    brand = models.CharField(max_length=255)

class Product(models.Model):
    codigo_interno = models.IntegerField()
    ean = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    brandobj = models.ForeignKey(Brand, on_delete=models.CASCADE)

class Precios(models.Model):
    productobj = models.ForeignKey(Product, on_delete=models.CASCADE)
    precio = models.FloatField()
    vigencia = models.DateField()