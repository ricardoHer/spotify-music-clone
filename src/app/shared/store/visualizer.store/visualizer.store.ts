import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ComponentStore } from "@ngrx/component-store";
import { Location } from "@angular/common"
import { filter, map, tap } from "rxjs/operators";
import { RouterUtil } from "../../utils";
import { withLatestFrom } from 'rxjs';

interface VisualizerState {
    isVisible: boolean;
    isShownAsPiP: boolean;
  }
  

@Injectable({ providedIn: 'root' })
export class VisualizerStore extends ComponentStore<VisualizerState> {

    constructor(private router: Router, private location: Location) {
        super({ isVisible: false, isShownAsPiP: false });
        this.showVisualizerAsPiP$();
    }

    readonly isShownAsPiP$ = this.select((s) => s.isShownAsPiP);
    readonly isVisible$ = this.select((s) => s.isVisible);
    readonly showPiPVisualizer$ = this.select((s) => s.isVisible && s.isShownAsPiP);


    readonly showVisualizerAsPiP$ = this.effect(() => this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.urlAfterRedirects.includes(RouterUtil.Configuration.Visualizer)),
        withLatestFrom(this.state$),
        tap(([isAtVisualizerRoute, state]) => { 
            if(isAtVisualizerRoute) {
                this.setState({ ...state, isVisible: true, isShownAsPiP: false });
            } else {
                this.setState({ ...state, isShownAsPiP: true })
            }
        }) 
    ));

    handleStateChange({ isVisible, isShownAsPiP }: VisualizerState) {
        if (isVisible && !isShownAsPiP) {
            this.router.navigate(['/', RouterUtil.Configuration.Visualizer]);
        }

        if ((isVisible && isShownAsPiP) || (!isVisible && !isShownAsPiP)) {
            if (this.location.path().includes(RouterUtil.Configuration.Visualizer)) {
                this.location.back
            }
        }
    }

    readonly setVisitility = this.effect<{ value: boolean }>((params$) => 
        params$.pipe(
            tap(({ value }) => {
                this.patchState({ isVisible: value });
            }),
            map(() => this.get()),
            tap((state) => this.handleStateChange(state))
        )
    );

    readonly togglePiP = this.effect((params$) => params$.pipe(
        withLatestFrom(this.isShownAsPiP$),
        tap(([, isShownAsPiP ]) => {
            this.patchState({ isShownAsPiP: !isShownAsPiP });
        }),
        map(() => this.get()),
        tap((state) => this.handleStateChange(state))
    ))
}