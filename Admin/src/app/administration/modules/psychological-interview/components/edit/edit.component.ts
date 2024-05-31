import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/account/authentication.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonFormComponent } from '@components/abstract/common-form.component';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { ModelService } from '@services/common/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { Media } from '@models/media/media.model';
import { Category } from '@models/categories/category.model';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { readFile } from '@functions/files';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: '' },
  CommonVerbsApiService
  ],
})
export class EditComponent extends CommonFormComponent<Category, Category>
implements OnInit {
editing = false;
categoryId: string | null = null;

categoryLogo: Media = {
  url: null,
  file: null,
  reference: 'logoMedia',
};

updated = false;
initDataLoaded = false;
TRANSLATE_KEY = 'MODEL_BOTS.MODULES.CRON-JOBS.COMPONENTS.EDIT-FORM.'

constructor(
  private route: ActivatedRoute,
  builder: UntypedFormBuilder,
  api: CommonApiService,
  toastr: ToastrService,
  private api2: CommonVerbsApiService,
  private router: Router,
  private http: HttpClient,
  public authenticationService: AuthenticationService,
) {
  super(builder, api, toastr);
  this.group = this.builder.group({
 
    nombre: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required],
    cargo: ['', Validators.required],
    experiencia: ['', Validators.required],
    habilidades: ['', Validators.required],
    pruebaPersonalidad: ['',  Validators.required],
    pruebaAptitud: ['', Validators.required],
    pruebaInteligencia: ['', Validators.required],
    conclusiones: ['', Validators.required],
    puntaje: ['', Validators.required],
    comportamiento: ['', Validators.required],
    competencias: ['', Validators.required],
    fortalezas: ['', Validators.required],
    recomendaciones: ['', Validators.required],
  });
}

ngOnInit(): void {

}


get f() {
  return this.group.controls;
}

private init(category: Category) {
  this.editing = true;
  if (category.logoMedia !== null) {
    this.categoryLogo = { ...this.categoryLogo, ...category.logoMedia };
  }
  this.group.patchValue({
    title: category.title,
    description: category.description,
  });
}


onSelect(event: NgxDropzoneChangeEvent, media: Media) {
  media.file = event.addedFiles[0];
  if (media.file) {
    readFile(media.file).then(() => {
      media.url = null;
      const subscribe = this.api
        .form<Media[]>(`media/upload`, {
          file: media.file,
          categoryId: this.categoryId,
          source: 'CATEGORY',
          bytesSize: media.file.size
        })
        .subscribe(
          r => {
            this.group.patchValue({
            });
          },
          error => {
            this.toastr.error(error?.error?.message || 'Ocurrió un error.');
          }
        );
      this.unsubscribe.push(subscribe);
    });
  }
}


override ngSubmit(): void {
  this.submit = true;
  if (this.group.valid) {
    const body = this.group.getRawValue();
    console.log(body);
    let subscribe: Observable<any>;
    let path = '/';
    subscribe = this.api.post<Category>(path, body);
    subscribe.subscribe({
      complete: () => (this.submit = false),
      error: err => {
        this.toastr.error(
          err?.error?.message || err?.message || 'Ocurrió un error.'
        );
      },
      next: response2 => {
        this.toastr.success('Changes applied.');
        this.subject$.next(response2);
        this.submitEvent.emit(response2);
        if (this.isCreateSubject$.value) {
          this.group.reset();
        }
        this.router.navigate([`admin/categories`]);
      },
    });
  }
}
}
