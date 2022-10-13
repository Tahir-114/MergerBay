import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    
    
    var result: string;

    // current time
    let now = new Date().getTime();
    let _date = new Date(value);

    // time since message was sent in seconds
    let delta = (now - _date.getTime()) / 1000;

    // format string
    if (delta < 10) {
      result = 'now';
    } else if (delta < 60) { // sent in last minute
      result =  Math.floor(delta) + ' Seconds Ago';
    } else if (delta < 3600) { // sent in last hour
      result =  Math.floor(delta / 60) + ' Minutes Ago';
    } else if (delta < 86400) { // sent on last day
      result =  Math.floor(delta / 3600) + ' Hours Ago';
    } else { // sent more than one day ago
      result =  Math.floor(delta / 86400) + ' Days Ago';
    }

    return result;
  }
}