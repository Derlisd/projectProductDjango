from django.shortcuts import render,get_object_or_404
from django.http import JsonResponse
from .models import Product,Precios,Brand
from django.db.models import Q

# Create your views here.
def index(request):
    return render(request,'index.html')

def get_product(request):
    products = list(Product.objects.values())
    data = data = {'data':[]}
    if( len(products)> 0):
        data = {'data':products}
    return JsonResponse(data,safe=False)
def get_precios(request,id):
    precios =  list(Precios.objects.filter(productobj_id=id).values())
    data = {'data':[]}
    if(len(precios)>0):
        data = {'data':precios}
    return JsonResponse(data,safe=False)
def get_brands(request):
    brands =  list(Brand.objects.values())
    data = {'data':[]}
    if(len(brands) >0):
        data = {'data':brands}
    return JsonResponse(brands,safe=False)
def insert_product(request):
    try:
        descripcion = request.POST['descripcion'].upper()
        codigo_interno = request.POST['codigo_interno']
        codigo_barra = request.POST['codigo_barra'].upper()
        brand = get_object_or_404(Brand, id=request.POST['marca'])# Obtener la instancia de Brand
        product =  Product.objects.filter(Q(descripcion=descripcion) |  Q(codigo_interno=codigo_interno) |  Q(ean=codigo_barra))
        
        if(len(product) > 0):
            return JsonResponse({'data':{'status':False,'message':'El producto ya existe'}},safe=False)

        if(len(request.POST['descripcion']) > 90):
            return JsonResponse({'data':{'status':False,'message':'El nombre del producto no debe superar 90 caracteres'}},safe=False)
        
        Product.objects.create(
        codigo_interno= codigo_interno,
        ean= codigo_barra,
        descripcion= descripcion,
        brandobj= brand

        )
        return JsonResponse({'data':{'status':True,'message':'Registro guardado exitosamente'}},safe=False)
    except Exception as e:
        return JsonResponse({'data':{'status':False,'message':'Error al registrar el producto, favor intente nuevamente'}},safe=False)

       
def update_product(request):
    try:
        product_id = request.POST['producto_id']
        descripcion = request.POST['descripcion'].upper()
        codigo_interno = request.POST['codigo_interno']
        codigo_barra = request.POST['codigo_barra'].upper()

        brand = get_object_or_404(Brand, id=request.POST['marca'])# Obtener la instancia de Brand
        
        val_descripcion =  Product.objects.filter(descripcion=descripcion)
        val_codigo_interno =  Product.objects.filter(codigo_interno=codigo_interno)
        val_codigo_barra =  Product.objects.filter(ean=codigo_barra)

        if(len(val_descripcion) > 0):
            return JsonResponse({'data':{'status':False,'message':'Ya existe un producto con la descripción'}},safe=False)
        if(len(val_codigo_interno) > 0):
            return JsonResponse({'data':{'status':False,'message':'Ya existe un producto con el código interno'}},safe=False)
        if(len(val_codigo_barra) > 0):
            return JsonResponse({'data':{'status':False,'message':'Ya existe un producto con el código de barra '}},safe=False)

        if(len(request.POST['descripcion']) > 90):
            return JsonResponse({'data':{'status':False,'message':'El nombre del producto no debe superar 90 caracteres'}},safe=False)
        product = get_object_or_404(Product, id=product_id)
        product.codigo_interno = codigo_interno
        product.ean = codigo_barra
        product.descripcion = descripcion
        product.descripcion = descripcion
        product.brandobj = brand
        product.save()

        return JsonResponse({'data':{'status':True,'message':'Registro actualizado exitosamente'}},safe=False)

    except Exception as e:
        return JsonResponse({'data':{'status':False,'message':'Error al actualizar el producto, favor intente nuevamente ' +str(e)}},safe=False)

def find_product(request,id):
    product =  list(Product.objects.filter(id=id).values())
    return JsonResponse({'data':product},safe=True)

def delete_product(request,id):
    try:
        product = get_object_or_404(Product, id=id)
        product.delete()
        return JsonResponse({'data':{'status':True,'message':'Registro eliminado exitosamente'}},safe=False)
    except Exception as e:
        return JsonResponse({'data':{'status':False,'message':'Error al eliminar el producto, favor intente nuevamente'+str(e)}},safe=False)

def insert_brand(request):
    brand = request.POST['marca_descripcion'].upper()
    try:
        Brand.objects.create(brand=brand)
        return JsonResponse({'data':{'status':True,'message':'Registro guardado exitosamente'}},safe=False)
    except Exception as e:
        return JsonResponse({'data':{'status':False,'message':'Error al registrar la marca, favor intente nuevamente'}},safe=False)


def insert_precio(request):
    try:
        vigencia = request.POST['vigencia']
        precio = request.POST['precio']
        producto_id = request.POST['producto_id']

        product = get_object_or_404(Product, id=producto_id)# Obtener la instancia de Brand
        
        Precios.objects.create(
        precio= precio,
        vigencia= vigencia,
        productobj= product
        )
        return JsonResponse({'data':{'status':True,'message':'Registro guardado exitosamente'}},safe=False)
    except Exception as e:
        return JsonResponse({'data':{'status':False,'message':'Error al registrar el producto, favor intente nuevamente'}},safe=False)
