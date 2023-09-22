<template>
  <v-main class="mt-16">
    <!-- Insert values above graph-->
    <p style="text-align: center">
      <br />Am I Prepared?<br />
      <br />Assess your preparedness in 8 categories below for: <br />1) short
      term preparedness (1 - 3 days) <br />2) Intermediate term preparedness(up
      to 3 months) <br />3) long term Preparedness (3 months to 3 years+ )<br />
    </p>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <svg id="spiderChart"></svg>
      </v-col>
    </v-row>
    <!-- Insert values between graph links-->
    <p style="text-align: center">
      <br />
      <br />
      Questions in each category will prompt you to think about different
      aspects of preparedness. <br />
      Then you will self-assess as Reasonably Prepared, Somewhat Prepared, or
      Not Prepared. <br />
      The Graph will update each area showing Orange, Yellow, or Green based on
      your answers. <br />
      Select any category below to assess that category, or click
      <router-link
        :to="{ name: 'Survey', query: { id: 'shelter', time: 'short' } }"
        >here</router-link
      >
      to start at the beginning. <br />
    </p>
    <v-row class="mx-4">
      <v-col v-for="label in arcLabels" :key="label[0]" sm="6" lg="3">
        <PreparednessItem
          :type="label[0]"
          :mdiName="label[1]"
          :surveyId="label[2]"
        />
      </v-col>
    </v-row>
    <!-- Insert Values after links-->
    <br />
    The reference section linked below can point you to other resources to help
    you better prepare in each area.<br />
  </v-main>
</template>

<script>
import * as d3 from 'd3'
import data from '../assets/data.json'
import PreparednessItem from '../components/PreparednessItem.vue'
import { getAnswers } from '../lib/answers.js'

export default {
  name: 'App',
  components: {
    PreparednessItem
  },
  data: () => ({
    arcLabels: data.categories.map((category) => [
      category.label,
      category.icon,
      category.id
    ]),
    graphData: {},
    graphWidth: 500,
    graphHeight: 500,
    svg: null,
    g: null,
    root: null,
    arc: null,
    radius: null
  }),
  methods: {
    getGraphData() {
      const answers = getAnswers()
      const children = data.categories.map((category, index) => {
        return {
          name: category.id,
          arc: index,
          prepared: answers.overall[category.id].short,
          children: [
            {
              name: 'intermediate',
              arc: index,
              prepared: answers.overall[category.id].intermediate,
              children: [
                {
                  name: 'long',
                  arc: index,
                  prepared: answers.overall[category.id].long,
                  size: 4
                }
              ]
            }
          ]
        }
      })
      this.graphData = { name: 'Preparedness Levels', children }
    },
    color(value) {
      return d3
        .scaleLinear()
        .domain([1, 2, 3])
        .range(['#69B34C', '#FFFF5C', '#FF4E11'])(value)
    },
    partition(data) {
      return d3.partition().size([2 * Math.PI, this.radius])(data)
    },
    GraphSetup() {
      this.radius = Math.min(this.graphWidth, this.graphHeight) / 2.15

      this.svg = d3
        .select('#spiderChart')
        .attr('viewBox', [0, 0, this.graphWidth, this.graphHeight])

      this.g = this.svg
        .append('g')
        .attr(
          'transform',
          'translate(' + this.graphWidth / 2 + ',' + this.graphHeight / 2 + ')'
        )

      this.arc = d3
        .arc()
        .startAngle(function (d) {
          return d.x0
        })
        .endAngle(function (d) {
          return d.x1
        })
        .innerRadius(function (d) {
          return d.y0
        })
        .outerRadius(function (d) {
          return d.y1
        })

      this.UpdateGraph()
      this.UpdateGraph()
    },
    UpdateGraph() {
      this.clearGraph()

      this.root = d3.hierarchy(this.graphData).sum(function (d) {
        return d.size
      })

      this.partition(this.root)
      let g = this.g

      this.g
        .selectAll('path') // <-- 1
        .data(this.root.descendants()) // <-- 2
        .enter() // <-- 3
        .append('path') // <-- 4
        .attr('class', (d) => (d.children ? '' : `leaf`))
        .attr('display', function (d) {
          return d.depth ? null : 'none'
        }) // <-- 5
        .attr('d', this.arc) // <-- 6
        .style('stroke', '#000000') // <-- 7
        .style('fill', (d) => this.color(d.data.prepared)) // <-- 8
        .each(function (d) {
          if (d.children) return
          //A regular expression that captures all in between the start of a string
          //(denoted by ^) and the first capital letter L
          var firstArcSection = /(^.+?)L/

          // console.log(d3.select(this).attr("d"))
          //The [1] gives back the expression between the () (thus not the L as well)
          //which is exactly the arc statement
          var newArc = firstArcSection.exec(d3.select(this).attr('d'))[1]
          //Replace all the comma's so that IE can handle it -_-
          newArc = newArc.replace(/,/g, ' ')

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
          g.append('path')
            .attr('id', `arcPath${d.data.arc}`)
            .attr('d', newArc)
            .style('fill', 'none')
        })

      this.g
        .selectAll('.myText')
        .data(this.root.leaves())
        .enter()
        .append('text')
        .style('font-size', 15)
        .attr('dy', function (d) {
          return d.endAngle > (90 * Math.PI) / 180 ? 18 : -6
        })
        .append('textPath')
        .attr('xlink:href', (d) => `#arcPath${d.data.arc}`)
        .text((d) => this.arcLabels[d.data.arc][0])
        .style('text-anchor', 'middle') //place the text halfway on the arc
        .attr('startOffset', '50%')
    },
    clearGraph() {
      this.g.html('')
    }
  },
  mounted() {
    this.getGraphData()
    this.GraphSetup()
  }
}
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
