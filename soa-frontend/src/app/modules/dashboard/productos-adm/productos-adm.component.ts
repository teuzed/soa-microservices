import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Producto } from '../../../models/producto.model';
import { ProductosAdminService } from '../../../services/productos-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-adm',
  templateUrl: './productos-adm.component.html',
  styleUrls: ['./productos-adm.component.scss'],
})
export class ProductosAdmComponent implements OnInit {
  displayedColumns: string[] = ['index', 'id', 'name', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Producto>();
  currentPage: number = 0; // Para almacenar la página actual
  nuevoProducto: Producto = { id: 0, name: '', price: 0, stock: 0, description:"" , img:""  };
  mostrarFormulario: boolean = false;  // Controla si se muestra el formulario

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productosService: ProductosAdminService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productosService.obtenerProductos().subscribe(
      (productos) => {
        console.log('Productos:', productos);
        this.dataSource.data = productos;
        this.dataSource.paginator = this.paginator;

        // Restaurar la página actual después de cargar los productos
        if (this.paginator) {
          this.paginator.pageIndex = this.currentPage; // Restaurar la página actual
        }
      },
      (error) => {
        Swal.fire('Error', 'No se pudo obtener los productos', 'error');
        console.error('Error al obtener productos:', error);
      }
    );
  }


  abrirFormularioNuevoProducto(): void {
    this.mostrarFormulario = true;  // Muestra el formulario
    this.nuevoProducto = { id: 0, name: '', price: 0, stock: 0, description:"" , img:'' };  // Resetea el formulario
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;  // Oculta el formulario
  }

  guardarNuevoProducto(): void {
    if (this.nuevoProducto.name && this.nuevoProducto.price > 0 && this.nuevoProducto.stock >= 0) {
      this.productosService.guardarProducto(this.nuevoProducto).subscribe(
        (productoCreado) => {
          Swal.fire('Producto creado', 'El producto ha sido creado exitosamente', 'success');
          this.obtenerProductos();  // Recarga la lista de productos
          this.cerrarFormulario();  // Cierra el formulario
        },
        (error) => {
          Swal.fire('Error', 'No se pudo crear el producto', 'error');
          console.error('Error al guardar el producto:', error);
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos correctamente', 'error');
    }
  }

  editarProducto(producto: Producto): void {
    // Guardamos la página actual antes de la edición
    this.currentPage = this.paginator.pageIndex;

    Swal.fire({
      title: 'Editar Producto',
      html: `
        <label for="name">Nombre:</label>
        <input id="name" class="swal2-input" value="${producto.name}">
        <label for="price">Precio:</label>
        <input id="price" type="number" class="swal2-input" value="${producto.price}">
        <label for="stock">Stock:</label>
        <input id="stock" type="number" class="swal2-input" value="${producto.stock}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const price = +(document.getElementById('price') as HTMLInputElement).value;
        const stock = +(document.getElementById('stock') as HTMLInputElement).value;

        if (!name || price <= 0 || stock < 0) {
          Swal.showValidationMessage('Todos los campos son obligatorios y deben ser válidos');
          return null;
        }
        return { ...producto, name, price, stock };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProducto = result.value;
        if (updatedProducto) {
          this.productosService.actualizarProducto(updatedProducto.id, updatedProducto).subscribe(
            () => {
              Swal.fire('Actualizado', 'El producto ha sido actualizado', 'success');

              // Actualizamos el producto en la tabla sin reordenar
              const index = this.dataSource.data.findIndex(p => p.id === updatedProducto.id);
              if (index !== -1) {
                this.dataSource.data[index] = updatedProducto; // Actualiza el producto en su lugar
                this.dataSource._updateChangeSubscription(); // Actualiza la tabla sin cambiar el orden
              }
            },
            (error) => {
              Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
              console.error('Error al actualizar el producto:', error);
            }
          );
        }
      }
    });
  }

   // Confirmar eliminación de un producto
   confirmarEliminacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto será eliminado permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarProducto(id);
      }
    });
  }

  // Eliminar producto
  eliminarProducto(id: number): void {
    this.productosService.eliminarProducto(id).subscribe(
      () => {
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
        this.obtenerProductos(); // Recargar los productos después de la eliminación
      },
      (error) => {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
        console.error('Error al eliminar el producto:', error);
      }
    );
  }

  getIndex(index: number): number {
    const currentPage = this.paginator?.pageIndex || 0;
    const pageSize = this.paginator?.pageSize || 5;
    return currentPage * pageSize + index + 1;
  }

  // Aquí podemos manejar la paginación para cambiar de página cuando se navega
  cambiarPagina(event: any): void {
    this.currentPage = event.pageIndex; // Guardamos la página actual al cambiar de página
  }
}
