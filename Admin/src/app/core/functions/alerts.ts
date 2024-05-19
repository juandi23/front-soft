import Swal from 'sweetalert2';
import { SweetAlertResult } from 'sweetalert2';

export function alertFire(text: string): Promise<SweetAlertResult> {
  return Swal.fire({
    title: '¿Estás seguro?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#07B59A',
    cancelButtonColor: '#f46a6a',
    confirmButtonText: 'Confirmar',
  });
}
