import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionComponent } from '@components/abstract/collection.component';
import { User } from '@models/auth.models';
import { MenuItem } from '@models/layout/menu.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationApiService } from '@services/account/authentication-api.service';
import { AuthenticationService } from '@services/auth.service';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
import { ModelService } from '@services/common/model.service';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Employees } from '@models/employe-models';
import { takeUntil } from 'rxjs';
import { Entrevista } from '@models/entrevista-models';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  extends CollectionComponent<Entrevista> {
  TRANSLATE_KEY=''
  constructor(
    router: Router,
    location: Location,
    api: CommonApiService,
    service: CollectionService<Entrevista>,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private apiAuth: AuthenticationApiService,
    @Inject('AuthService')
    public authService: ModelService<Entrevista>,
    @Inject('MenuService')
    public menuService: ModelService<MenuItem[]>,
    private modal: NgbModal,
    public authenticationService: AuthenticationService
  ) {
    super(
      router,
      location,
      ``,
      api,
      service,
      10,
      { column: 'createdAt', direction: 'DESC' },
    );
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.service.collection$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log('data', data);
    });
  }

  deleteEntrevista(id: string) {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#07B59A',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        this.api.delete(`/${id}`).subscribe(
          () => {
            this.toastr.success('Registro Eliminado.');
            this.service.init(this.service.options);
          },
          e => {
            this.toastr.error(e?.error.message || 'Error');
          }
        );
      }
    });
  }
}
