import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  
  videos:any[] = [];
  videoSelected: any;
  constructor(private _youtubeService:YoutubeService) { 
    this._youtubeService.getVideos().subscribe(
      videos => {
        this.videos = videos;
      }
    );
  }

  ngOnInit() {
  }


  verVideo(video: any){
    console.log("video",video)
    this.videoSelected = video;;
    $('#modalYoutube').modal();
  }
  
  cerrarModal(){
    this.videoSelected = null;
    $('#modalYoutube').modal('hide');
  }

  cargarMas(){
    this._youtubeService.getVideos().subscribe(
      videos => {
        this.videos.push.apply(this.videos, videos);
      }
    );
  }
}
