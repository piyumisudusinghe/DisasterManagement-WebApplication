export class ChatMessage{
  $key?:string;
  email?:string;
  userName?:string;
  message?:string;
  reciever?:string;
  time_sent?:Date= new Date();
}
