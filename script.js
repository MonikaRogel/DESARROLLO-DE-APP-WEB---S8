const productos = [
    { id: 1, nombre: "Laptop Gamer Pro", categoria: "Computadoras", precio: 1299.99, stock: 15, calificacion: 4.8 },
    { id: 2, nombre: "Smartphone X10", categoria: "Celulares", precio: 799.99, stock: 25, calificacion: 4.6 },
    { id: 3, nombre: "Tablet Air", categoria: "Tablets", precio: 499.99, stock: 8, calificacion: 4.4 },
    { id: 4, nombre: "Auriculares Bluetooth", categoria: "Audio", precio: 129.99, stock: 42, calificacion: 4.7 },
    { id: 5, nombre: "Monitor 4K 27''", categoria: "Monitores", precio: 399.99, stock: 12, calificacion: 4.9 },
    { id: 6, nombre: "Teclado Mecánico", categoria: "Periféricos", precio: 89.99, stock: 30, calificacion: 4.5 },
    { id: 7, nombre: "Mouse Inalámbrico", categoria: "Periféricos", precio: 49.99, stock: 55, calificacion: 4.3 },
    { id: 8, nombre: "Cámara Web HD", categoria: "Video", precio: 69.99, stock: 20, calificacion: 4.6 }
];


function cargarProductos() {
    const tabla = document.getElementById('tablaProductos');
    tabla.innerHTML = ''; 
    
    productos.forEach(producto => {

        let stockClass = 'text-success';
        if (producto.stock < 10) {
            stockClass = 'text-danger fw-bold';
        } else if (producto.stock < 20) {
            stockClass = 'text-warning';
        }
        

        const estrellas = '★'.repeat(Math.floor(producto.calificacion)) + 
                         '☆'.repeat(5 - Math.floor(producto.calificacion));
        
        const fila = `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td><span class="badge bg-info">${producto.categoria}</span></td>
                <td><strong>$${producto.precio.toFixed(2)}</strong></td>
                <td class="${stockClass}">${producto.stock} unidades</td>
                <td>
                    <span class="text-warning">${estrellas}</span>
                    <span class="small text-muted"> (${producto.calificacion})</span>
                </td>
            </tr>
        `;
        
        tabla.innerHTML += fila;
    });
}


function configurarAlerta() {
    const alertaBtn = document.getElementById('alertaBtn');
    
    alertaBtn.addEventListener('click', function() {

        const alertaHTML = `
            <div class="modal fade" id="alertaModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-warning">
                            <h5 class="modal-title">
                                <i class="bi bi-exclamation-triangle-fill"></i> ¡Alerta Especial!
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>🚀 <strong>¡Oferta exclusiva por tiempo limitado!</strong></p>
                            <p>Hoy todos nuestros productos tienen un <span class="text-danger fw-bold">20% de descuento</span>.</p>
                            <p>Usa el código: <code>TECH2023</code> al finalizar tu compra.</p>
                            <div class="alert alert-info">
                                <i class="bi bi-clock"></i> La oferta termina en 24 horas
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-warning" onclick="irAProductos()">
                                <i class="bi bi-cart"></i> Ver Productos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        

        document.body.insertAdjacentHTML('beforeend', alertaHTML);
        

        const alertaModal = new bootstrap.Modal(document.getElementById('alertaModal'));
        alertaModal.show();
        

        document.getElementById('alertaModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    });
}

function irAProductos() {

    bootstrap.Modal.getInstance(document.getElementById('alertaModal')).hide();
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}


function validarFormulario() {
    const formulario = document.getElementById('formularioContacto');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    const mensajeExito = document.getElementById('mensajeExito');
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    formulario.classList.remove('was-validated');
    [nombre, email, mensaje].forEach(campo => {
        campo.classList.remove('is-invalid', 'is-valid');
    });
    

    let esValido = true;
    

    if (nombre.value.trim() === '') {
        nombre.classList.add('is-invalid');
        esValido = false;
    } else {
        nombre.classList.add('is-valid');
    }
    
 
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid');
        esValido = false;
    } else {
        email.classList.add('is-valid');
    }
    

    if (mensaje.value.trim().length < 10) {
        mensaje.classList.add('is-invalid');
        esValido = false;
    } else {
        mensaje.classList.add('is-valid');
    }
    

    if (esValido) {
        formulario.classList.add('was-validated');
        mensajeExito.classList.remove('d-none');
        

        setTimeout(() => {
            alert(`¡Gracias ${nombre.value.trim()}!\nTu mensaje ha sido enviado.\nTe contactaremos pronto a ${email.value.trim()}`);
            

            setTimeout(() => {
                formulario.reset();
                [nombre, email, mensaje].forEach(campo => {
                    campo.classList.remove('is-valid');
                });
                mensajeExito.classList.add('d-none');
                formulario.classList.remove('was-validated');
            }, 3000);
        }, 1000);
        
        return false;
    } else {
        formulario.classList.add('was-validated');
        return false;
    }
}


function agregarEfectosTabla() {
    const tabla = document.querySelector('table');
    

    const filas = tabla.getElementsByTagName('tr');
    for (let fila of filas) {
        fila.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    }
}

function actualizarContadorProductos() {
    const totalProductos = productos.length;
    const totalStock = productos.reduce((sum, producto) => sum + producto.stock, 0);
    

    const infoProductos = document.createElement('div');
    infoProductos.className = 'alert alert-info mt-3';
    infoProductos.innerHTML = `
        <i class="bi bi-info-circle"></i>
        Mostrando <strong>${totalProductos}</strong> productos con un total de 
        <strong>${totalStock}</strong> unidades en inventario.
    `;
    
    document.querySelector('#productos .container').appendChild(infoProductos);
}


document.addEventListener('DOMContentLoaded', function() {

    configurarAlerta();
    

    const formulario = document.getElementById('formularioContacto');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        validarFormulario();
    });
    

    const cargarBtn = document.getElementById('cargarProductos');
    cargarBtn.addEventListener('click', function() {
        cargarProductos();
        actualizarContadorProductos();
        

        this.innerHTML = '<i class="bi bi-check-circle"></i> Productos Cargados';
        this.classList.remove('btn-success');
        this.classList.add('btn-secondary');
        this.disabled = true;
    });
    

    setTimeout(() => {
        if (document.getElementById('tablaProductos').innerHTML === '') {
            cargarProductos();
            actualizarContadorProductos();
            cargarBtn.innerHTML = '<i class="bi bi-check-circle"></i> Productos Cargados';
            cargarBtn.classList.remove('btn-success');
            cargarBtn.classList.add('btn-secondary');
            cargarBtn.disabled = true;
        }
    }, 2000);
    
 
    agregarEfectosTabla();
    

    document.getElementById('nombre').addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.remove('is-invalid');
        }
    });
    
    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value.trim())) {
            this.classList.remove('is-invalid');
        }
    });
    
    document.getElementById('mensaje').addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            this.classList.remove('is-invalid');
        }
    });
    
 
    console.log('🚀 Página interactiva cargada correctamente');
    console.log('✅ Bootstrap 5.3.2');
    console.log('✅ JavaScript ES6+');
    console.log('✅ Validación de formulario activa');
    console.log('✅ Carrusel funcional');
    console.log('✅ Tabla de productos dinámica');
});