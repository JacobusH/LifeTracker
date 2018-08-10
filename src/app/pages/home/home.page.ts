import { Component, OnInit } from '@angular/core';
import { TrackersPage } from '../trackers/trackers.page';
import { CFService } from '../../services/CFService.service';
import * as d3 from 'd3-selection';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

constructor(
  private cfService: CFService
 ){

 }

ngOnInit() {
  this.cfService.setStateTrue();
}

ionViewDidEnter() {
  this.makeBasicCircles();

}

ionViewDidLeave() { 
  d3.select('div#circles').select('svg').remove();
}

makeBasicCircles() {
  const jsonCircles = [
    { x_axis: 30, y_axis: 30, radius: 20, color : 'green' },
    { x_axis: 70, y_axis: 70, radius: 20, color : 'purple'},
    { x_axis: 110, y_axis: 100, radius: 20, color : 'red'}];

  const svgContainer = d3.select('div#circles').append('svg')
      .attr('width', 300)
      .attr('height', 200)
      .style('border', '1px solid black');

  const circles = svgContainer.selectAll('circle')
      .data(jsonCircles)
      .enter()
      .append('circle');

  circles
      .attr('cx', (d) => d.x_axis)
      .attr('cy', (d) => d.y_axis)
      .attr('r', (d) => d.radius)
      .style('fill', (d) => d.color);

  }


}
