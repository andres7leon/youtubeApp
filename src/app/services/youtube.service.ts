import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  
  private youtubeUrl:string = 'https://www.googleapis.com/youtube/v3';
  private apiKey:string = 'AIzaSyBtoAZJrHNVnGFeZd1oVU6iBByxK0Z3Kqs';
  private playListId = 'UUok_yhjwg4WSx3s_2Yh8ZjQ';
  private nextPageToken:string;
  constructor(private _http: HttpClient) { }

  getVideos(){
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();

    params = params.set( 'part','snippet');
    params = params.set( 'maxResults','10');
    params = params.set( 'playlistId',this.playListId);
    params = params.set( 'key',this.apiKey);
  
    if(this.nextPageToken){
      params = params.set('pageToken', this.nextPageToken)
    }

    return this._http.get( url , {params})
    .pipe( map ( res => { 
      console.log("res",res); 
      this.nextPageToken = res['nextPageToken']; 

      let videos:any[] = [];

      for (let video of res['items']){
        let snippet = video.snippet;
        videos.push(snippet);
      }
      return videos;
    } ));

  }
}
