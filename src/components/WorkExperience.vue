<template>
    <v-card class='cardContainer' elevation='0'>
      <v-row>
        <v-col sm='3'>
          <v-img :src='require(`@/assets/${logo}`)' width='200px' class='mx-auto'/>
          <v-card-text class='mt-n5 year' align='center'>{{year}}</v-card-text>
        </v-col>
        <v-col cols='12' sm='8'>
          <v-card-text class='positionTitle pb-n4' v-html="jTitle">{{jTitle}}</v-card-text>
          <v-card-text class='companyTitle'>{{company}}</v-card-text>
          <ul class='ml-5'>
            <li v-for="item in descriptions" :key='item' class='descriptionList'>
              {{item}}
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
export default {
  props: ['company', 'jobTitle', 'year', 'logo', 'descriptions'],
  data: ()=> {
    return {
    }
  },
  created(){
  },
  computed: {
    jTitle() {
      if(this.$props?.jobTitle.includes('(Intern)'))
        return this.$props.jobTitle.replace('(Intern)', '<p class="internText">(Intern)</p>')
      return this.$props.jobTitle
    }
  }
}
</script>

<style>
.v-card__text {
  padding: 14px 10px;
}

.cardContainer {
  margin-block: 75px;
  margin-inline: 5%;
  padding-right: 10px;
  padding-left: 10px;
}

.positionTitle{
  font-size: clamp(1.5em, 5vw, 3.5em);
  font-weight: 500;
  line-height: 1rem;
}

.companyTitle {
  font-weight: 500;
  font-size: clamp(1.3em, 4vw, 3em);
}

.descriptionList {
  font-size: clamp(1.1rem, 1.5vw, 2rem);
}

.year {
  position: relative;
  font-weight: bold;
  font-size: clamp(1.5rem, 1.5vw, 2rem);
}

p.internText { 
  display: inline;
  margin-left: -5px;
  font-size: clamp(0.5em, 1vw, 1em)
}
</style>