from django.urls import path

from . import views


urlpatterns   = [
    path('',views.index,name='index'),
    
    path('product/',views.get_product,name='get_product'),
    path('find_product/<int:id>',views.find_product,name='find_product'),
    path('update_product/',views.update_product,name='update_product'),
    path('insert_product/',views.insert_product,name='insert_product'),
    path('delete_product/<int:id>',views.delete_product,name='delete_product'),

    path('precios/<int:id>',views.get_precios,name='get_precios'),
    path('insert_precio/',views.insert_precio,name='insert_precio'),

    path('brands/',views.get_brands,name='get_brands'),
    path('insert_brand/',views.insert_brand,name='insert_brand'),



]