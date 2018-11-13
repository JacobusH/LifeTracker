import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './visuals/graph/graph.component';
import { NodeVisualComponent } from './visuals/shared/node-visual/node-visual.component';
import { LinkVisualComponent } from './visuals/shared/link-visual/link-visual.component';
import { GraphHorizComponent } from './visuals/graph-horiz/graph-horiz.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GraphComponent, NodeVisualComponent, LinkVisualComponent, GraphHorizComponent],
  exports: [
    GraphComponent,
    GraphHorizComponent
  ]
})
export class D3Module { }
