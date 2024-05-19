import { Component, Inject } from '@angular/core';
import { getMenuByRole, getRouteByRole } from '@functions/routing';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationApiService } from '@services/account/authentication-api.service';
import { AuthenticationService } from '@services/account/authentication.service';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { CollectionComponent } from '@components/abstract/collection.component';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
import { Location } from '@angular/common';
import { MenuItem } from '@models/layout/menu.model';
import { ModelService } from '@services/common/model.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Product } from '@models/products/product.model';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { alertFire } from '@functions/alerts';
import { ApiResponse } from '@models/common/api-response.model';
import { User } from '@models/account/user.model';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  providers: [
    CollectionService,
    { provide: 'API_SERVICE', useValue: 'products' },
    CommonApiService,
  ],
})
export class ListPageComponent extends CollectionComponent<Product> {
  breadCrumbs = [
    { label: 'Products', active: true },
  ];
  statusControl = new FormControl('0');
  TRANSLATE_KEY= 'ADMIN.USERS.PAGES.LIST.'
  pricevalue = 10000;
  minVal = 20000;
  maxVal = 240000;
  products = [];
  priceoption: Options = {
    floor: 10000,
    ceil: 300000,
    translate: (value: number): string => {
      return '$' + value;
    },
  };


  private subject$: BehaviorSubject<Product | null> =
    new BehaviorSubject<Product | null>(null);

  constructor(
    router: Router,
    location: Location,
    api: CommonApiService,
    service: CollectionService<Product>,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private apiAuth: AuthenticationApiService,
    @Inject('AuthService')
    public authService: ModelService<User>,
    @Inject('MenuService')
    public menuService: ModelService<MenuItem[]>,
    private modal: NgbModal,
    public authenticationService: AuthenticationService,
    private lightbox: Lightbox,
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
    const subscribe = this.statusControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        const endValue = [value !== '0'];
        this.service.setFilterValue({
          key: 'archivedInd',
          values: endValue,
        });
      });
    this.unsubscribe.push(subscribe);

    const subscribe1 = this.service.clear$
      .pipe(takeUntil(this.destroy$))
      .subscribe(options => {
        this.statusControl.patchValue('0', {
          emitEvent: false,
        });
      });
    this.unsubscribe.push(subscribe1);
  }


  deleteProduct(id: string) {
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
            this.toastr.success('Cambios Aplicados.');
            this.service.init(this.service.options);
          },
          e => {
            this.toastr.error(e?.error.message || 'Error.');
          }
        );
      }
    });
  }

  unArchive(id: string) {
    alertFire(`Are you sure you want to UNARCHIVE ?`).then(
      result => {
        if (result.value) {
          this.api
            .put<ApiResponse>(`/restore/${id}`)
            .subscribe({
              next: r => {
                this.toastr.success('Cambios Aplicados')
                this.service.init(this.service.options);
              },
              error: e => this.toastr.error(e?.error?.message || 'Error'),
            });
        }
      }
    );
  }


  archive(id: string) {
    alertFire(`Are you sure you want to archive this member?`).then(
      result => {
        if (result.value) {
          this.api
            .put<ApiResponse>(`/archive/${id}`)
            .subscribe({
              next: r => {
                this.toastr.success('Cambos Aplicados.')
                this.service.init(this.service.options);
              },
              error: e => this.toastr.error(e?.error?.message || 'Error.'),
            });
        }
      }
    );
  }


  lightboxImage(url: string, caption = '') {
    const src = url;
    const thumb = 'tumb';
    const album =
      caption === ''
        ? { src: src, thumb: thumb }
        : { src: src, caption: caption, thumb: thumb };
    const _albums = [];
    _albums.push(album);
    this.lightbox.open(_albums, 0);
  }

  discountLessFilter(e: any, val: number){
  }


  discountMoreFilter(e: any, val: number){
  }


  productValorationFilter(e: any, val: number){
  }


}
