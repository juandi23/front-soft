export interface NotificationModel {
  id: string;
  created_at: string;
  data: NotificationData;
  notifiable_id: string;
  notifiable_type: string;
  read_at: string | null;
  type: string;
  updated_at: string;
  dataType?: number | string;
  entityData?: any; //Media | DataSet | YoutubeVideo
}


export interface NotificationData {
  content: string;
  date: string;
  modelBotId: string;
  fineTuningId: string;
  modelBotName: string;
  name: string;
  title: string;
  userName: string;
}
