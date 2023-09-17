<template>
  <div tabindex="0" :class="['tooltip-trigger']" v-if="$slots.tooltip">
    <slot></slot>
    <span :class="['tooltip', position]">
      <slot name="tooltip"></slot>
    </span>
  </div>
  <span v-else><slot></slot></span>
</template>

<script>
export default {
  props: {
    position: {
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top', 'left', 'right'].includes(value)
      }
    },
    tooltipClass: String
  }
}
</script>

<style>
.tooltip {
  position: absolute;
  z-index: 10;
  display: none;
  border-radius: 0.25rem;
  background-color: rgb(51 51 51 / 0.9);
  padding: 0.5rem 1.25rem;
  color: white;
}
.tooltip::after {
  position: absolute;
  border-width: 8px;
  content: '';
}
.tooltip-trigger {
  display: inline-block;
  cursor: pointer;
  position: relative;
}
.tooltip-trigger:focus > .tooltip,
.tooltip-trigger:hover > .tooltip {
  display: inline-block;
}

.tooltip.bottom {
  top: calc(100% + 10px);
  left: 50%;
  --tw-translate-x: -50%;
  transform: translate(-50%, 0);
}
.tooltip.bottom::after {
  left: 50%;
  --tw-translate-x: -50%;
  transform: translate(-50%, 0);
  bottom: 100%;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-bottom-color: rgb(51 51 51 / 0.9);
}
</style>
