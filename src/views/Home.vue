<template>
<v-main>
  <!-- <PictureQuote 
    src="dev-photo.jpeg" 
    :leftImg='true' 
    description='Previously worked as a Full-Stack Developer, Backend Developer, and more.' 
    title="David's 3+ Years of Experience"
    btnText="Learn More"
    destination='/resume'/> -->
  <!-- <PictureQuote 
    src="Top Desk.jpg" 
    :leftImg='false' 
    description='With a variety of projects using tools ranging from Kubernetes on Google Cloud to a Google App Script project, view the projects that have refined my skills.' 
    title='My Projects'
    btnText='View Portfolio'
    destination='/portfolio'
    /> -->
    <svg id='spiderChart'></svg>
</v-main>
</template>

<script>
// import PictureQuote from '../components/PictureQuote.vue'
import * as d3 from "d3";
export default {
  name: 'App',
  components: {
    // PictureQuote
  },
  data: () => ({
    //
  }),
  mounted(){
    var arcLabels = [
      'Shelter/Clothing', 
      'Heat/Light/Power/Fuel', 
      'Transportation/etc',
      'Spiritual/Mental',
      'Health/Safety/Security',
      'Finance',
      'Knowledge/Tools',
      'Food/Water']
    var nodeData = {
        "name": "Preparedness Level","children": [{
            "name": "Shelter/Clothing",
            "arc": 0,
            "prepared": 1,
            "children": [
              {
                "name": "Sub A1", "prepared": 3, "arc": 0,
                "children": [
                  {
                    "name": "2 Sub C", "prepared": 3, "arc": 0, "size": 4
                  }
                ]
              }
            ]
        }, {
            "name": "Heat/Light/Power/Fuel",
            "arc": 1,
            "prepared": 2,
            "children": [
              {
                "name": "Sub B1", "prepared": 2, "arc": 1,
                "children": [
                  {
                    "name": "2 Sub C", "prepared": 3, "arc": 1, "size": 4
                  }
                ]
              }
            ]
        }, {
            "name": "Transportation/Communication/Evactuation", "prepared": 2, "arc": 2,
            "children": [
              {
                "name": "Sub C", "prepared": 3, "arc": 2,
                "children": [
                  {
                    "name": "2 Sub C", "prepared": 3, "arc": 2, "size": 4
                  }
                ]
              }
            ]
        }, {
          "name": "Spiritual/Mental", "prepared": 2, "arc": 3,
          "children": [
            {
              "name": "Sub C", "prepared": 3, "arc": 3,
              "children": [
                {
                  "name": "2 Sub C", "prepared": 3, "arc": 3, "size": 4
                }
              ]
            }
          ]
        }, {
          "name": "Health/Safety/Security", "prepared": 1, "arc": 4,
          "children": [
            {
              "name": "Sub C", "prepared": 2, "arc": 4,
              "children": [
                {
                  "name": "2 Sub C", "prepared": 3, "arc": 4, "size": 4
                }
              ]
            }
          ]
        }, {
          "name": "Finance", "prepared": 1, "arc": 5,
          "children": [
            {
              "name": "Sub C", "prepared": 2, "arc": 5,
              "children": [
                {
                  "name": "2 Sub C", "prepared": 3, "arc": 5, "size": 4
                }
              ]
            }
          ]
        }, {
          "name": "Knowledge/Tools", "prepared": 1, "arc": 6,
          "children": [
            {
              "name": "Sub C", "prepared": 2, "arc": 6,
              "children": [
                {
                  "name": "2 Sub C", "prepared": 3, "arc": 6, "size": 4
                }
              ]
            }
          ]
        }, {
          "name": "Food/Water", "prepared": 1, "arc": 7,
          "children": [
            {
              "name": "Sub C", "prepared": 2, "arc": 7,
              "children": [
                {
                  "name": "2 Sub C", "prepared": 3, "arc": 7, "size": 4
                }
              ]
            }
          ]
        }]
    };


    var width = 500;
    var height = 500;
    var radius = Math.min(width, height) / 2.15;
    var color = d3.scaleLinear()
                  .domain([1, 2, 3])
                  .range(['#69B34C', '#FFFF5C','#FF4E11'])


    const svg = d3.select('#spiderChart')
                  .attr('viewBox', [0, 0, width, height])

    var g = svg.append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var partition = d3.partition()
                      .size([2 * Math.PI, radius]);

    var root = d3.hierarchy(nodeData)
                .sum(function (d) { return d.size});

    partition(root);
    var arc = d3.arc() 
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });


    g.selectAll('path')  // <-- 1
      .data(root.descendants())  // <-- 2
      .enter()  // <-- 3
      .append('path')  // <-- 4
      .attr('class', d=>d.children? '': `leaf`)
      .attr("display", function (d) { return d.depth ? null : "none"; })  // <-- 5
      .attr("d", arc)  // <-- 6
      .style('stroke', '#000000')  // <-- 7
      .style("fill", d=>color(d.data.prepared))  // <-- 8
      .each(function(d) {
        if(d.children)
          return
        //A regular expression that captures all in between the start of a string
        //(denoted by ^) and the first capital letter L
        var firstArcSection = /(^.+?)L/;

        console.log(d3.select(this).attr("d"))
        //The [1] gives back the expression between the () (thus not the L as well)
        //which is exactly the arc statement
        var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
        //Replace all the comma's so that IE can handle it -_-
        newArc = newArc.replace(/,/g , " ");


        console.log(d.endAngle)
        // I need to figure out how to make this work on a sunburst, not just a donut chart
        // //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
        // //flip the end and start position
        // if (d.endAngle > 90 * Math.PI/180) {
        //     //Everything between the capital M and first capital A
        //     var startLoc = /M(.*?)A/, middleLoc = /A(.*?)0 0 1/, endLoc = /0 0 1 (.*?)$/;

        //     var newStart = endLoc.exec( newArc )[1];
        //     var newEnd = startLoc.exec( newArc )[1];
        //     var middleSec = middleLoc.exec( newArc )[1];

        //     //Build up the new arc notation, set the sweep-flag to 0
        //     newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
        // }//if

        //Create a new invisible arc that the text can flow along
        g.append("path")
            .attr('id', `arcPath${d.data.arc}`)
            .attr("d", newArc)
            .style("fill", "none");
    });

    console.log(g.selectAll('.leaf'))
    
    g.selectAll('.myText')
      .data(root.leaves())
      .enter()
      .append('text')
      .style('font-size', 15)
      .attr("dy", function(d) {
        return (d.endAngle > 90 * Math.PI/180 ? 18 : -6);
      })
      .append('textPath')
        .attr("xlink:href", d=>`#arcPath${d.data.arc}`)
        .text(d=>arcLabels[d.data.arc])
        .style("text-anchor","middle") //place the text halfway on the arc
        .attr("startOffset", "50%")
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
  margin: 12.5vw;
  max-width: 500px;
  max-height: 500px;
}
</style>
