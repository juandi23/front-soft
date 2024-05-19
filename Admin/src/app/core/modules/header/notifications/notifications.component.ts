import * as moment from 'moment';

import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken, onMessage } from "firebase/messaging";

import { AuthenticationService } from '@services/account/authentication.service';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonComponent } from '@components/abstract/common-component.component';
import { MessageEmitterService } from '@services/common/message-emitter.service';
import { ModelService } from '@services/common/model.service';
import { NotificationModel } from '@models/notifications/notification.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { debounce } from 'lodash';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: '' },
    CommonApiService,
  ],
})
export class NotificationsComponent extends CommonComponent implements OnInit {
  app: FirebaseApp;
  // @Input() modelBot: ModelBot;
  @Input() companyId: string;
  unreads = 0;
  search: string;
  mainData: {
    data: NotificationModel[];
    current_page: number;
    page: number;
    per_page: number;
    total: number;
  } = {
      data: [],
      current_page: 1,
      page: 1,
      per_page: 8,
      total: 0
    };
  mode = 'by-user';
  formattedNotifications: { date: string; belongNotifications: NotificationModel[] }[] = [];

  //For Background Notifications
  private broadcastChannel: BroadcastChannel;

  constructor(
    public authenticationService: AuthenticationService,
    private api: CommonApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private messageEmitterService: MessageEmitterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDataNotifications();
    this.app = initializeApp(environment.firebaseConfig);
    this.firebaseSubscribe();
    this.getFirebaseToken();
  }

  firebaseSubscribe() {
    const token = localStorage.getItem('firebaseToken');
    if (token === null) {
      this.getFirebaseToken();
    } else {
      const firebaseTokenDate = localStorage.getItem('firebaseTokenDate');
      const date1 = moment(firebaseTokenDate, 'DD-MM-YYYY');
      const date2 = moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY');
      const diff = date2.diff(date1, 'days');
      if (diff > 2) {
        this.getFirebaseToken();
      }
    }
    const messaging = getMessaging(this.app);
    onMessage(messaging, (payload) => {
      this.showAlertNewMessage(payload);
      this.getDataNotifications();
      if(payload?.data?.roomId && payload?.notification.title.toLocaleLowerCase().includes('summary')){
        this.messageEmitterService.emitEvent({type: 'roomSummaryNotification', data: payload.data.roomId});
      }
     else if(payload?.data?.fineTuningId && payload?.notification.title.toLocaleLowerCase().includes('progress'))
      {
        this.messageEmitterService.emitEvent({type: 'FineTuningNotification', data: payload.data.fineTuningId});
      }
    });

    this.broadcastChannel = new BroadcastChannel('notificationsChannel');
    this.broadcastChannel.onmessage = (event) => {
      this.showAlertNewMessage(event.data);
      this.getDataNotifications();
      if(event?.data?.data?.roomId && event?.data.notification.title.toLocaleLowerCase().includes('summary')){
        this.messageEmitterService.emitEvent({type: 'roomSummaryNotification', data: event.data.data.roomId});
      }
      else if(event?.data?.data?.fineTuningId && event?.data.notification.title.toLocaleLowerCase().includes('progress'))
      {
        this.messageEmitterService.emitEvent({type: 'FineTuningNotification', data: event.data.data.fineTuningId});
      }
    };
  }


  getFirebaseToken() {
    const messaging = getMessaging(this.app);
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey }).then((currentToken) => {
          if (currentToken) {
            localStorage.setItem('firebaseToken', currentToken);
            localStorage.setItem('firebaseTokenDate', moment().format('DD-MM-YYYY'));
            const params = {
              token: currentToken,
              update: 0,
              realTimeNotifications: 1
            };
            this.api.post('devices/store-token', params).subscribe(() => { },
              err => {
                console.log('Ocurrió un error while saving the token. ', err);
              })
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('Ocurrió un error while retrieving token. ', err);
        });
      }
    });
  }


  showAlertNewMessage(messageData: any) {
    if ('Notification' in window) {
      const body = messageData.notification.body;
      if (Notification.permission === 'granted') {
        const notification = new Notification(messageData.notification.title, {
          body: body,
          icon: 'https://robin-ai.xyz//assets/images/logos/icon-dark-250x250.png',
        });
        notification.onclick = function () {
          notification.close();
        };
      } else {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            const notification = new Notification(
              messageData.notification.title,
              {
                body: body,
                icon: 'https://robin-ai.xyz//assets/images/logos/icon-dark-250x250.png',
              }
            );
            notification.onclick = function () {
              notification.close();
            };
          }
        });
      }
    }
  }

  markAllAsRead(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡Esta acción no se puede deshacer!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#07B59A',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirm',
    }).then(result => {
      if (result.value) {
        this.api.post('notifications/set-all-read', {
          mode: this.mode
        }).subscribe(() => {
          this.paginate(this.mainData.current_page);
          this.toastr.success('Las notificaciones fueron marcadas como leídas.');
        });
      }
    });
  }


  getDataNotifications() {
    const userId = this.authenticationService.authService.model.id;
    if (userId) {
      const params = this.getParams();
      if (this.mode === 'by-user') {
        this.api.get('notifications/get-by-user', params).subscribe(r => {
          this.assignData(r);
        });
      } else if (this.mode === 'by-model') {
        this.api.get('notifications/get-by-model-bot', params).subscribe(r => {
          this.assignData(r);
        });
      } else if (this.mode === 'by-company') {
        this.api.get('notifications/get-by-company', params).subscribe(r => {
          this.assignData(r);
        });
      }
    }
  }

  assignData(r: any) {
    this.mainData = r[0];
    this.unreads = r[1];
    this.handleData();
    this.cdr.detectChanges();
  }


  getParams() {
    const params = {
      search: this.search,
      page: this.mainData?.page,
      userId: this.authenticationService.authService.model.id,
      // modelBotId: this.modelBot?.id,
      companyId: this.companyId,
    };
    return params;
  }


  handleData() {
    this.formattedNotifications = [];
    let initNotifications = this.mainData.data;
    initNotifications = initNotifications.sort(function a(a, b) {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    });

    const groups: { [index: string]: NotificationModel[] } =
      initNotifications.reduce(
        (groups: { [index: string]: NotificationModel[] }, message) => {
          const messageDate = new Date(message.data.date);
          const date = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate()).toISOString();
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(message);
          return groups;
        },
        {}
      );
    const groupArrays = Object.keys(groups).map(date => {
      return {
        date,
        belongNotifications: groups[date],
      };
    });
    this.formattedNotifications = groupArrays;

    //  TODAY
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const formatted_today = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();

    // YESTERDAY
    const today2 = new Date(timeElapsed);
    today2.setDate(today2.getDate() - 1);
    const formatted_yesterday = new Date(today2.getFullYear(), today2.getMonth(), today2.getDate()).toISOString();

    // 3 DAYS AGO
    const today3 = new Date(timeElapsed);
    today3.setDate(today3.getDate() - 2);
    const formatted_3dAgo = new Date(today3.getFullYear(), today3.getMonth(), today3.getDate()).toISOString();


    for (const i in this.formattedNotifications) {
      if (this.formattedNotifications[i].date === formatted_today) {
        this.formattedNotifications[i].date = 'TODAY';
      } else if (this.formattedNotifications[i].date === formatted_yesterday) {
        this.formattedNotifications[i].date = 'YESTERDAY';
      } else if (this.formattedNotifications[i].date === formatted_3dAgo) {
        this.formattedNotifications[i].date = '3 DAYS AGO';
      }
    }
  }


  paginate(next: number) {
    if (next) {
      this.mainData = { ...this.mainData, page: next };
    }
    this.getDataNotifications();
  }


  async markAsRead(id, asRead) {
    const params = {
      id: id,
      asRead: asRead ? 0 : 1,
      mode: this.mode,
      // modelBotId: this.modelBot?.id,
      companyId: this.companyId
    };

    this.api.post('notifications/set-read', params).subscribe(() => {
      this.paginate(this.mainData.current_page);
      if (!asRead) {
        this.toastr.success('La notificación se marcó como leída.');
      } else {
        this.toastr.success('La notificación se marcó como no leída.');
      }
    });
  }


  searchFunc = debounce(
    () => {
      this.getDataNotifications();
    },
    500,
    {}
  );


  modeChange(e: any) {
    this.getDataNotifications();
  }
}
