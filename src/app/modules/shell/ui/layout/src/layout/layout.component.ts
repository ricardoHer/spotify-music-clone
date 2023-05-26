import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { PlaybackStore } from 'src/app/shared/playback';
import { VisualizerStore } from 'src/app/shared/store/visualizer.store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showPiPVisualizer$ = this.visualizerStore.showPiPVisualizer$;
  currentAlgumCoverUrl$ = this.playbaskStore.currentTrack$.pipe(
    map((track) => track?.album?.images[0]?.url),
    filter((imageUrl) => !!imageUrl)
  )

  constructor(
    private playbaskStore: PlaybackStore,
    private store: Store,
    private visualizerStore: VisualizerStore
  ) { }

  ngOnInit(): void {
    this.store
  }

}
