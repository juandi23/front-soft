import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/account/authentication.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonFormComponent } from '@components/abstract/common-form.component';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { ModelService } from '@services/common/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { Product } from '@models/products/product.model';
import { Media } from '@models/media/media.model';
import { PaginatedCollection } from '@models/collection/paginated-collection';
import { Category } from '@models/categories/category.model';
import { debounce } from 'lodash';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { readFile } from '@functions/files';
import { Lightbox } from 'ngx-lightbox';
import { Specification } from '@models/products/product-specification.model';
import { Feature } from '@models/products/product-feature.model';
import { Size } from '@models/products/product-size.model';
import { Color } from '@models/products/product-color.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: 'products' },
    CommonApiService,
    CommonVerbsApiService,
  ],
})
export class EditFormComponent
  extends CommonFormComponent<Product, Product>
  implements OnInit {
  editing = false;
  productId: string | null = null;
  media: Media[] = [];
  productSpecifications: Specification[] = [];
  productFeatures: Feature[] = [];
  productSizes: Feature[] = [];
  productColors: Color[] = [];


  updated = false;
  initDataLoaded = false;
  TRANSLATE_KEY = 'MODEL_BOTS.MODULES.CRON-JOBS.COMPONENTS.EDIT-FORM.'

  specificationGroup: UntypedFormGroup;
  featureGroup: UntypedFormGroup;
  sizeGroup: UntypedFormGroup;
  colorGroup: UntypedFormGroup;

  wholesaleMode = false;

  constructor(
    private route: ActivatedRoute,
    @Inject('ProductService')
    private productService: ModelService<Product>,
    builder: UntypedFormBuilder,
    api: CommonApiService,
    toastr: ToastrService,
    private api2: CommonVerbsApiService,
    private router: Router,
    private http: HttpClient,
    public authenticationService: AuthenticationService,
    private lightbox: Lightbox,
  ) {
    super(builder, api, toastr);
    this.group = this.builder.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      price: [null, [Validators.required]],
      wholesalePrice: [null],
      wholesaleMinQuantity: [null],
      availableQuantity: [null, [Validators.required]],
      discount: [null],
      wholesaleDiscount: [null],
      categories: [[], [Validators.required]],
      tags: [[]],
      media: [[], [Validators.required]],
      specifications: [[]],
      features: [[]],
      sizes: [[]],
      colors: [[]],
    });


    this.specificationGroup = this.builder.group({
      label: ['', Validators.required],
      value: ['', [Validators.required]],
    });

    this.featureGroup = this.builder.group({
      value: ['', [Validators.required]],
    });
    this.sizeGroup = this.builder.group({
      value: ['', [Validators.required]],
    });
    this.colorGroup = this.builder.group({
      value: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
  }

  specificationSubmit = false;
  featureSubmit = false;
  sizeSubmit = false;
  colorSubmit = false;

  ngOnInit(): void {
    this.getCategories();
    this.listCatSearch = true;
    this.getTags();
    this.listTagSearch = true;
    const subscribe = this.productService.model$.subscribe(product => {
      if (product) {
        this.init(product);
      }
      this.initDataLoaded = true;
    });
    this.unsubscribe.push(subscribe);

    const subscribeForm = this.submitEvent.subscribe(model => {
      if (model) {
        this.productService.set(model);
      }
    });
    this.unsubscribe.push(subscribeForm);
  }

  attachOrDetach(): void {
    if (this.wholesaleMode) {
      this.wholesaleMode = false;
      this.group.patchValue({
        wholesalePrice: null,
        wholesaleMinQuantity: null,
      });
    } else {
      this.wholesaleMode = true;
    }
  }

  get f() {
    return this.group.controls;
  }

  get specificationF() {
    return this.specificationGroup.controls;
  }

  get featureF() {
    return this.featureGroup.controls;
  }
  get sizeF() {
    return this.sizeGroup.controls;
  }
  get colorF() {
    return this.colorGroup.controls;
  }


  private init(product: Product) {
    this.editing = true;
    this.productId = product.id;
    this.media = product.media;
    this.productSpecifications = product.specifications ? JSON.parse(JSON.stringify(product.specifications)) : [];
    this.productFeatures = product.features ? JSON.parse(JSON.stringify(product.features)) : [];
    this.productSizes = product.sizes ? JSON.parse(JSON.stringify(product.sizes)) : [];
    this.productColors = product.colors ? JSON.parse(JSON.stringify(product.colors)) : [];
    if(product.wholesalePrice && product.wholesaleMinQuantity){
      this.wholesaleMode = true;
    }
    this.group.patchValue({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      wholesalePrice: product.wholesalePrice,
      wholesaleMinQuantity: product.wholesaleMinQuantity,
      wholesaleDiscount: product.wholesaleDiscount,
      discount: product.discount,
      availableQuantity: product.availableQuantity,
      categories: product.categories?.map(e => e.id),
      tags: product.tags?.map(e => e.id),
      media: product.media?.map(e => e.id),
      specifications: product.specifications,
      features: product.features,
      sizes: product.sizes,
      colors: product.colors,
    });
  }


  listCatSearch = false;
  allCategories: Category[];
  categorySearch = null;
  categoriesPage = 1;
  totalCategories: number;
  categoriesPerPage: number;
  private getCategories = debounce(
    () => {
      this.api2
        .get<PaginatedCollection<Category>>(
          'categories',
          {
            page: this.categoriesPage,
            limit: 10,
            orderBy: 'createdAt',
            direction: 'DESC',
            q: this.categorySearch,
          },
          []
        )
        .subscribe(r => {
          this.allCategories = r.data;
          this.totalCategories = r.meta.total;
          this.categoriesPerPage = r.meta.per_page;
        });
    },
    500,
    {}
  );
  onListCategorySearch(q: any) {
    this.categoriesPage = 1;
    this.categorySearch = q.term.toLowerCase();
    this.listCatSearch = true;
    this.getCategories();
  }
  onCatsPageChange(e: any) {
    this.categoriesPage = e;
    this.listCatSearch = true;
    this.getCategories();
  }



  listTagSearch = false;
  allTags: Category[];
  tagSearch = null;
  tagsPage = 1;
  totalTags: number;
  tagsPerPage: number;
  private getTags = debounce(
    () => {
      this.api2
        .get<PaginatedCollection<Category>>(
          'tags',
          {
            page: this.tagsPage,
            limit: 10,
            orderBy: 'createdAt',
            direction: 'DESC',
            q: this.tagSearch,
          },
          []
        )
        .subscribe(r => {
          this.allTags = r.data;
          this.totalTags = r.meta.total;
          this.tagsPerPage = r.meta.per_page;
        });
    },
    500,
    {}
  );
  onListTagSearch(q: any) {
    this.tagsPage = 1;
    this.tagSearch = q.term.toLowerCase();
    this.listTagSearch = true;
    this.getTags();
  }
  onTagsPageChange(e: any) {
    this.tagsPage = e;
    this.listTagSearch = true;
    this.getTags();
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


  onSelect(event: NgxDropzoneChangeEvent) {
    const file = event.addedFiles[0];
    if (file) {
      readFile(file).then(() => {
        const subscribe = this.api
          .form<Media[]>(`media/upload`, {
            file: file,
            source: 'PRODUCT',
            bytesSize: file.size
          })
          .subscribe(
            r => {
              this.group.patchValue({
                media: [...this.group.get('media').value, r[0].id]
              });
              this.media.unshift(r[0]);
            },
            error => {
              this.toastr.error(error?.error?.message || 'Ocurrió un error.');
            }
          );
        this.unsubscribe.push(subscribe);
      });
    }
  }


  dettachMedia(media: Media, index: number) {
    const mediaForm = this.group.get('media').value;
    const formIndex = mediaForm.findIndex(e => e.id === media.id);
    mediaForm.splice(formIndex, 1);
    this.group.patchValue({
      media: mediaForm
    });
    this.media.splice(Number(index), 1);
  }


  ngSubmitSpecification(): void {
    this.specificationSubmit = true;
    if (this.specificationGroup.valid) {
      const body = this.specificationGroup.getRawValue();
      this.group.patchValue({
        specifications: [...this.group.get('specifications').value, body]
      });
      this.productSpecifications.unshift(body);
      this.specificationGroup.reset();
      this.specificationSubmit = false;
    }
  }

  dettachSpecification(s: Specification, index: number) {
    const specificationForm = this.group.get('specifications').value;
    const formIndex = specificationForm.findIndex(e => e.id === s.id);
    specificationForm.splice(formIndex, 1);
    this.group.patchValue({
      specifications: specificationForm
    });
    this.productSpecifications.splice(Number(index), 1);
  }


  ngSubmitFeature(): void {
    this.featureSubmit = true;
    if (this.featureGroup.valid) {
      const body = this.featureGroup.getRawValue();
      this.group.patchValue({
        features: [...this.group.get('features').value, body]
      });
      this.productFeatures.unshift(body);
      this.featureGroup.reset();
      this.featureSubmit = false;
    }
  }

  dettachFeature(s: Feature, index: number) {
    const featureForm = this.group.get('features').value;
    const formIndex = featureForm.findIndex(e => e.id === s.id);
    featureForm.splice(formIndex, 1);
    this.group.patchValue({
      features: featureForm
    });
    this.productFeatures.splice(Number(index), 1);
  }


  ngSubmitSize(): void {
    this.sizeSubmit = true;
    if (this.sizeGroup.valid) {
      const body = this.sizeGroup.getRawValue();
      this.group.patchValue({
        sizes: [...this.group.get('sizes').value, body]
      });
      this.productSizes.unshift(body);
      this.sizeGroup.reset();
      this.sizeSubmit = false;
    }
  }

  dettachSize(s: Size, index: number) {
    const sizeForm = this.group.get('sizes').value;
    const formIndex = sizeForm.findIndex(e => e.id === s.id);
    sizeForm.splice(formIndex, 1);
    this.group.patchValue({
      sizes: sizeForm
    });
    this.productSizes.splice(Number(index), 1);
  }


  ngSubmitColor(): void {
    this.colorSubmit = true;
    if (this.colorGroup.valid && this.currentColorMedia) {
      const subscribe = this.api
        .form<Media[]>(`media/upload`, {
          file: this.currentColorMedia,
          source: 'PRODUCT',
          bytesSize: this.currentColorMedia.size
        })
        .subscribe(
          r => {
            const body = this.colorGroup.getRawValue();
            const color = {
              value: body.value,
              color: body.color,
              media: [r[0]]
            };
            this.group.patchValue({
              colors: [...this.group.get('colors').value, color]
            });
            this.productColors.unshift(color);
            this.colorGroup.reset();
            this.colorSubmit = false;
          },
          error => {
            this.toastr.error(error?.error?.message || 'Ocurrió un error.');
          }
        );
      this.unsubscribe.push(subscribe);
    }
  }


  addMediaColor(event: NgxDropzoneChangeEvent, index: string): void {
    const file = event.addedFiles[0];
    if (file) {
      readFile(file).then(() => {
        const subscribe = this.api
        .form<Media[]>(`media/upload`, {
          file: file,
          source: 'PRODUCT',
          bytesSize: file.size
        })
        .subscribe(
          r => {
            this.productColors[Number(index)].media.push(r[0]);
            this.group.patchValue({
              colors: this.productColors
            });
            console.log(this.productColors, this.group.get('colors').value);
          },
          error => {
            this.toastr.error(error?.error?.message || 'Ocurrió un error.');
          }
        );
      this.unsubscribe.push(subscribe);
      });
    }
  }

  dettachMediaColor(index: number, index2: number){
    this.productColors[index].media.splice(Number(index2), 1);
    this.group.patchValue({
      colors: this.productColors
    });
  }


  dettachColor(s: Color, index: number) {
    const colorForm = this.group.get('colors').value;
    const formIndex = colorForm.findIndex(e => e.id === s.id);
    colorForm.splice(formIndex, 1);
    this.group.patchValue({
      colors: colorForm
    });
    this.productColors.splice(Number(index), 1);
  }


  currentColorMedia: any;
  onSelectColorMedia(event: NgxDropzoneChangeEvent) {
    const file = event.addedFiles[0];
    if (file) {
      readFile(file).then(() => {
        this.currentColorMedia = file;
      });
    }
  }


  ngClassValidateColor(group: UntypedFormGroup, name: string): string {
    if (!this.colorSubmit) return '';
    return group.controls[name].errors ? 'is-invalid' : 'is-valid';
  }

  ngClassValidateSize(group: UntypedFormGroup, name: string): string {
    if (!this.sizeSubmit) return '';
    return group.controls[name].errors ? 'is-invalid' : 'is-valid';
  }


  ngClassValidateSpecification(group: UntypedFormGroup, name: string): string {
    if (!this.specificationSubmit) return '';
    return group.controls[name].errors ? 'is-invalid' : 'is-valid';
  }


  ngClassValidateFeature(group: UntypedFormGroup, name: string): string {
    if (!this.featureSubmit) return '';
    return group.controls[name].errors ? 'is-invalid' : 'is-valid';
  }

  override ngSubmit(): void {
    this.submit = true;
    if (this.group.valid) {
      this.group.patchValue({
        colors: this.productColors
      });
      const body = this.group.getRawValue();
      if((body.wholesalePrice && !body.wholesaleMinQuantity) || (!body.wholesalePrice && body.wholesaleMinQuantity)){
        this.toastr.error('The Wholesale price is required when you fill a wholesale min qquantity and vice versa');
        this.toastr.error('The Wholesale price is required when you fill a wholesale min qquantity and vice versa', null, {
          positionClass: 'toast-bottom-center'
        });
        return;
      }
      if(body.wholesalePrice >= body.price){
        this.toastr.error('The Wholesale price must be lower than the normal price');
        this.toastr.error('The Wholesale price must be lower than the normal price', null, {
          positionClass: 'toast-bottom-center'
        });
        return;
      }
      if(body.wholesaleMinQuantity >= body.availableQuantity){
        this.toastr.error('The Wholesale Min Quantity must be lower than the Available Quantity');
        this.toastr.error('The Wholesale Min Quantity must be lower than the Available Quantity', null, {
          positionClass: 'toast-bottom-center'
        });
        return;
      }
      body.uploadByUserId = this.authenticationService.authService.model.id;
      const id = get(body, 'id', null);
      let subscribe: Observable<any>;
      let path = '/';
      if (id !== null) {
        path += `${id}`;
        subscribe = this.api.put<Product>(path, body);
      } else {
        subscribe = this.api.post<Product>(path, body);
      }
      subscribe.subscribe({
        complete: () => (this.submit = false),
        error: err => {
          this.toastr.error(
            err?.error?.message || err?.message || 'Ocurrió un error.'
          );
        },
        next: response2 => {
          this.toastr.success('Cambios Aplicados.');
          this.subject$.next(response2);
          this.submitEvent.emit(response2);
          if (this.isCreateSubject$.value) {
            this.group.reset();
          }
          this.router.navigate([`admin/products`]);
        },
      });
    }
  }
}
