<template>
<v-main>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols='auto'>
        <svg id='spiderChart'></svg>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="label in arcLabels" :key="label[0]" sm='6' lg='3'>
        <PreparednessItem :type="label[0]" :mdiName="label[1]"/>
      </v-col>
    </v-row>
    
  </v-container>
</v-main>
</template>

<script>
// import PictureQuote from '../components/PictureQuote.vue'
import * as d3 from "d3";
import nodeData from '../assets/nodeData.json';
import PreparednessItem from '../components/PreparednessItem.vue'

export default {
  name: 'App',
  components: {
    PreparednessItem
  },
  data: () => ({
    arcLabels: [
      ['Shelter/Clothing', 'mdi-home'], 
      ['Heat/Light/Power/Fuel', 'mdi-gas-station'], 
      ['Transportation/etc', 'mdi-car'],
      ['Spiritual/Mental', 'mdi-book-cross'],
      ['Health/Safety/Security', 'mdi-shield-lock'],
      ['Finance', 'mdi-cash'],
      ['Knowledge/Tools', 'mdi-tools'],
      ['Food/Water', 'mdi-food']],
    graphData: nodeData,
    graphWidth: 500,
    graphHeight: 500,
    svg: null,
    g: null,
    root: null,
    arc: null,
    radius: null
  }),
  methods: {
    color(value) {
      return d3.scaleLinear()
                    .domain([1, 2, 3])
                    .range(['#69B34C', '#FFFF5C','#FF4E11'])(value)
    },
    partition(data){
      return d3.partition().size([2 * Math.PI, this.radius])(data);
    },
    GraphSetup() {
      this.radius = Math.min(this.graphWidth, this.graphHeight) / 2.15

      this.svg = d3.select('#spiderChart')
                    .attr('viewBox', [0, 0, this.graphWidth, this.graphHeight])

      this.g = this.svg.append('g')
                .attr('transform', 'translate(' + this.graphWidth / 2 + ',' + this.graphHeight / 2 + ')');

      this.arc = d3.arc() 
          .startAngle(function (d) { return d.x0 })
          .endAngle(function (d) { return d.x1 })
          .innerRadius(function (d) { return d.y0 })
          .outerRadius(function (d) { return d.y1 });

      this.UpdateGraph()
      this.UpdateGraph()
    },
    UpdateGraph(){
      this.clearGraph()

      this.root = d3.hierarchy(this.graphData)
                  .sum(function (d) { return d.size});

      this.partition(this.root);
      let g = this.g;

      this.g.selectAll('path')  // <-- 1
        .data(this.root.descendants())  // <-- 2
        .enter()  // <-- 3
        .append('path')  // <-- 4
        .attr('class', d=>d.children? '': `leaf`)
        .attr("display", function (d) { return d.depth ? null : "none"; })  // <-- 5
        .attr("d", this.arc)  // <-- 6
        .style('stroke', '#000000')  // <-- 7
        .style("fill", d=>this.color(d.data.prepared))  // <-- 8
        .each(function(d) {
          if(d.children)
            return
          //A regular expression that captures all in between the start of a string
          //(denoted by ^) and the first capital letter L
          var firstArcSection = /(^.+?)L/;

          // console.log(d3.select(this).attr("d"))
          //The [1] gives back the expression between the () (thus not the L as well)
          //which is exactly the arc statement
          var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
          //Replace all the comma's so that IE can handle it -_-
          newArc = newArc.replace(/,/g , " ");


          /* console.log(d.endAngle)
          // I need to figure out how to make this work on a sunburst, not just a donut chart
          //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
          //flip the end and start position
          if (d.endAngle > 90 * Math.PI/180) {
              //Everything between the capital M and first capital A
              var startLoc = /M(.*?)A/, middleLoc = /A(.*?)0 0 1/, endLoc = /0 0 1 (.*?)$/;

              var newStart = endLoc.exec( newArc )[1];
              var newEnd = startLoc.exec( newArc )[1];
              var middleSec = middleLoc.exec( newArc )[1];

              //Build up the new arc notation, set the sweep-flag to 0
              newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
          // }//if */

          //Create a new invisible arc that the text can flow along
          g.append("path")
              .attr('id', `arcPath${d.data.arc}`)
              .attr("d", newArc)
              .style("fill", "none");
      });
      
      this.g.selectAll('.myText')
        .data(this.root.leaves())
        .enter()
        .append('text')
        .style('font-size', 15)
        .attr("dy", function(d) {
          return (d.endAngle > 90 * Math.PI/180 ? 18 : -6);
        })
        .append('textPath')
          .attr("xlink:href", d=>`#arcPath${d.data.arc}`)
          .text(d=>this.arcLabels[d.data.arc][0])
          .style("text-anchor","middle") //place the text halfway on the arc
          .attr("startOffset", "50%")
    },
    clearGraph(){
      this.g.html("")
    }
  },
  mounted(){
    this.GraphSetup()
  }
};
</script>

<style scoped>
.titleText {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  font-size: clamp(2.2em, 7vw, 3.5em);
}

.description {
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  max-width: 600px;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
}

.quoteRow {
  margin-inline: 5%;
  margin-bottom: 10px;
}

#spiderChart {
  width: 75vw;
  height: 75vw;
  max-width: 500px;
  max-height: 500px;
}
</style>
