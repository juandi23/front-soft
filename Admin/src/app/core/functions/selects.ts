import Swal from 'sweetalert2';
import { SweetAlertResult } from 'sweetalert2';

export function getYears(
  start: number,
  end: number = new Date().getFullYear()
): any[] {
  const years: any[] = [];
  while (start <= end) {
    years.push({
      key: start,
      value: start,
    });
    start++;
  }
  return years;
}
