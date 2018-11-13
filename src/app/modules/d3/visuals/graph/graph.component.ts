import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ForceDirectedGraph, Node } from '../../models';
import { D3Service } from '../../d3.service';

@Component({
  selector: 'd3-graph',
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g>
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent {
  @Input('nodes') nodes;
  @Input('links') links;

  graph: ForceDirectedGraph;

  constructor(
    private d3Service: D3Service,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    this.graph.ticker.subscribe(d => {
      this.ref.markForCheck()
    })
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  private _options: { width, height } = { width: 800, height: 600 };

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}