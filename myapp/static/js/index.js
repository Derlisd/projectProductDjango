    $(document).ready( async ()=>{
        //const Product = await responseAjax('./product/')
        $('.datepicker').datepicker({
            format: 'mm/dd/yyyy',
            startDate: '-3d'
        });
        BuildTableProduct()
        const Brands = await  responseAjax('./brands/')
        loadBrand(Brands)

    })
    
      /**
     * 
     PRODUCTS
     */
     const deleteProduct = async (id)=>{
        let res  = await responseAjax(`./delete_product/${id}`)
        if(res.data.status){
            cleanForm()
            BuildTableProduct()
            alertSwal('success','Eliminado',res.data.message)
        }else{
            alertSwal('error','Se produjo un error',res.data.message)
        }
    }
    const updateProduct = async(data)=>{
        let res  = await responseAjax('./update_product/',data)
        if(res.data.status){
            cleanForm()
            BuildTableProduct()
            alertSwal('success','Actualizado',res.data.message)
        }else{
            alertSwal('error','Se produjo un error',res.data.message)
        }
    }
    const insertProduct = async (data)=>{
        let res  = await responseAjax('./insert_product/',data)
        if(res.data.status){
            cleanForm()
            BuildTableProduct()
            alertSwal('success','Guardado',res.data.message)
        }else{
            alertSwal('error','Se produjo un error',res.data.message)
        }
    }
    
    $('#mytable').on('click','.btn_update',async (e)=>{
        $('#btn_save').hide()
        $('#btn_update').attr('hidden',false)
        $('#btn_add_precio').attr('hidden',false)
        let id = e.target.id ;
        let res = await responseAjax(`./find_product/${id}`)
        let product = res.data[0]
   
        $('#txt_descripcion').val(product.descripcion)
        $('#txt_codigo_interno').val(product.codigo_interno)
        $('#txt_codigo_barra').val(product.ean)
        $('#cbo_marca').val(product.brandobj_id)
        $('#txt_id_product').val(id)

    })
    $('#btn_update').click(()=>{
        let data = getData();
        if(data.descripcion == ''){
            return alertSwal('info','Atención','Ingrese la descripción')
        }
        if(data.codigo_interno == ''){
            return alertSwal('info','Atención','Ingrese el código interno')
        }
        if(data.codigo_barra == ''){
            return  alertSwal('info','Atención','Ingrese el código de barra')
        }
        if(data.marca == ''){
            return alertSwal('info','Atención','Seleccione la marca')
        }
        Swal.fire({
            title: "Deseas actualizar el registro?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Actualizar",
          }).then((result) => {
            if (result.isConfirmed) {
                updateProduct(data);
            }
          });
    })
    $('#mytable').on('click','.btn_delete',async (e)=>{
        let id = e.target.id ;
        Swal.fire({
            title: "Deseas eliminar el registro?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
            }
          });
       
   })
 
    $('#btn_save').click((e)=>{
        let data = getData();
        if(data.descripcion == ''){
            return alertSwal('info','Atención','Ingrese la descripción')
        }
        if(data.codigo_interno == ''){
            return alertSwal('info','Atención','Ingrese el codigo interno')
        }
        if(data.codigo_barra == ''){
            return  alertSwal('info','Atención','Ingrese el codigo de barra')
        }
        if(data.marca == ''){
            return alertSwal('info','Atención','Seleccione la marca')
        }
        Swal.fire({
            title: "Deseas guardar el registro?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar",
          }).then((result) => {
            if (result.isConfirmed) {
                insertProduct(data);
            }
          });

    })

    /**
     * 
     BRANDS
     */
    const loadBrand = (brands)=>{
        let template = '<option value="">Seleccione la marca<\option>'
        if(brands.length > 0){
            brands.forEach(brand => {
                template += `<option value=${brand.id}>${brand.brand}<\option>`
            });
        }
        $('#cbo_marca').html(template)
    }
    const insertMarca = async (data)=>{
        let res  = await responseAjax('./insert_brand/',data)
        if(res.data.status){
            alertSwal('success','Guardado','Registro guardo exitosamente')
            const Brands = await  responseAjax('./brands/')
            loadBrand(Brands)
            $('#modal_marca').modal('hide')
        }else{
            alertSwal('error','Se produjo un error',res.data.message)
        }
    }
    $('#btn_add_marca').click(()=>{
        $('#txt_marca').val('')
        $('#modal_marca').modal('show')
    })

    $('#btn_save_marca').click(()=>{
        let data = getData()
        if(data.marca_descripcion == ''){
            return alertSwal('info','Atención','Ingrese la descripción')
        }
        Swal.fire({
            title: "Deseas guardar el registro?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar",
          }).then((result) => {
            if (result.isConfirmed) {
                insertMarca(data);
            }
          });
    })

    /**
     * 
     Precios
     */
    const insertPrecio = async (data)=>{
        let res  = await responseAjax('./insert_precio/',data)
        if(res.data.status){
            cleanForm()
            BuildTableProduct()
            alertSwal('success','Guardado','Registro guardo exitosamente')
            $('#modal_precio').modal('hide')
        }else{
            alertSwal('error','Se produjo un error',res.data.message)
        }
    }
    $('#btn_add_precio').click(async ()=>{
        $('#modal_precio').modal('show')
        $('#table_precio tbody').html('');
        let producto_id = $('#txt_id_product').val()
        let res = await responseAjax(`./precios/${producto_id}`)
        let precios = res.data
        let template = ''
        if(precios.length > 0){
            precios.forEach(precio => {
                template += `<tr><th>${precio.precio}</th><th>${precio.vigencia}</th></tr>`
            });
        }
        $('#table_precio tbody').html(template)

    })
    $('#btn_save_precio').click(()=>{
        let data = getData()
        if(data.precio == ''){
            return alertSwal('info','Atención','Ingrese el precio')
        }
        if(data.vigencia == ''){
            return alertSwal('info','Atención','Seleccione la fecha de vigencia')
        }
        Swal.fire({
            title: "Deseas guardar el registro?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar",
          }).then((result) => {
            if (result.isConfirmed) {
                insertPrecio(data);
            }
          });
    })
     /**
     * 
     UTILS
     */
    const getData = ()=>{
        let descripcion = $('#txt_descripcion').val()
        let codigo_barra = $('#txt_codigo_barra').val()
        let codigo_interno = $('#txt_codigo_interno').val()
        let marca = $('#cbo_marca').val()
        let producto_id = $('#txt_id_product').val()
        //Modal Marcas
        let marca_descripcion = $('#txt_marca').val()
        //Modal Precios
        let precio = $('#txt_precio').val()
        let vigencia = $('#date_vigencia').val()
        let data = {
            'descripcion':descripcion,
            'codigo_barra':codigo_barra,
            'codigo_interno':codigo_interno,
            'marca':marca,
            'marca_descripcion':marca_descripcion,
            'producto_id':producto_id,
            'precio':precio,
            'vigencia':vigencia
        }
        return data
    }
    async function responseAjax(url,data = []){
        var result ;
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
        try {
            result = await   $.ajax({
                headers: {
                    'X-CSRFToken': csrfToken
                  },
                url: url,
                type:'POST',
                data:data,
                dataType : 'json'
            });  
            
        } catch (error) {
            console.log('error',error)
        }
        return  result;
        
    }
    const  alertSwal = (icono, titulo, texto) => {
        Swal.fire({ icon: icono,title: titulo,text: texto});
    }
    
    /**
     * 
     DATATALBLES
     */
    const formatDetail  = async (d)=> {
            //Aca hace la solicitud de los precios de los productos
           let res = await responseAjax(`./precios/${d.id}`)
           let precios = res.data
            let template = ''
            if(precios.length > 0){
                precios.forEach(precio => {
                    template +=`<p>  Precio:${precio.precio} Vigencia:${precio.vigencia}<\p>`
                });
            }else{
                template = '<p>Lista de precios vacia<\p>'

            }
            return template;
        
    }
 
    const BuildTableProduct = ()=>{
        // Destruye la instancia de DataTable existente
        $('#mytable').DataTable().destroy();
        const table = new DataTable('#mytable', {
            ajax: './product/',
            columns: [
                {
                    class: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                },
                { data: 'codigo_interno' },
                { data: 'ean' },
                { data: 'descripcion' },
                {
                    data: null,
                    render: function(data, type, row) {
                        return `
                                <div class="row">
                                    <button class="btn btn-primary btn_update fas fa-edit" id= ${data.id}></button>
                                    <button class="btn btn-secondary btn_delete fas fa-trash-alt" id= ${data.id}></button>
                                </div>`;
                    }
                }
            ],
            order: [[1, 'asc']],
            paging: true,
            sort: true,
            pageLength: 6,
            ordering: false,
            searching: true,
            orderCellsTop: true,
            fixedHeader: true,
            language: espanol,
    
        });
        // Array to track the ids of the details displayed rows
        const detailRows = [];
        
        table.on('click', 'tbody td.dt-control', async function () {
            let tr = event.target.closest('tr');
            let row = table.row(tr);
            let idx = detailRows.indexOf(tr.id);
        
            if (row.child.isShown()) {
                tr.classList.remove('details');
                row.child.hide();
        
                // Remove from the 'open' array
                detailRows.splice(idx, 1);
            }else {
                tr.classList.add('details');
                row.child( await formatDetail(row.data())).show();
        
                // Add to the 'open' array
                if (idx === -1) {
                    detailRows.push(tr.id);
                }
            }
        });
        
        // On each draw, loop over the `detailRows` array and show any child rows
        table.on('draw', () => {
            detailRows.forEach((id, i) => {
                let el = document.querySelector('#' + id + ' td.dt-control');
        
                if (el) {
                    el.dispatchEvent(new Event('click', { bubbles: true }));
                }
            });
        });
    }

    const cleanForm = async ()=>{
        $('#btn_save').css('display','block')
        $('#btn_update').attr('hidden',true)
        $('#btn_add_precio').attr('hidden',true)
        $('#txt_descripcion').val('')
        $('#txt_codigo_barra').val('')
        $('#txt_codigo_interno').val('')
        $('#txt_id_product').val('')
        $('#txt_precio').val('')
        $('#date_vigencia').val('')
        const Brands = await  responseAjax('./brands/')
        loadBrand(Brands)
        
    }
    let espanol = {
        sProcessing: "Procesando...",
        sLengthMenu: "Mostrar _MENU_ registros",
        sZeroRecords: "No se encontraron resultados",
        sEmptyTable: "Ningún dato disponible en esta tabla",
        sInfo:
          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
        sInfoPostFix: "",
        sSearch: "Buscar:",
        sUrl: "",
        sInfoThousands: ",",
        sLoadingRecords: "Cargando...",
        oPaginate: {
          sFirst: "Primero",
          sLast: "Último",
          sNext: "Siguiente",
          sPrevious: "Anterior",
        },
        oAria: {
          sSortAscending: ": Activar para ordenar la columna de manera ascendente",
          sSortDescending:
            ": Activar para ordenar la columna de manera descendente",
        },
        buttons: {
          copy: "Copiar",
          colvis: "Visibilidad",
        },
      };

