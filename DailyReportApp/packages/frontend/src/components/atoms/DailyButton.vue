<template>
  <button :class="classes" :disabled="disabled" type="button" @click="handleClick">
    <slot/>
  </button>
</template>

<script>
export default {
    name: 'DailyButton',

    props: {
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes () {
            const cls = this.type === 'text' ? ('-' + this.type) : ''
            return ['daily-button' + (this.type === 'text' ? '-text' : '')]
        }
    },
    methods: {
        handleClick (ev) {
            this.$emit('click', ev)
        }
    }
}
</script>

<style>
    .daily-button{
        padding: .6em 1.3em;
    }
    .daily-button-text{
        border: none;
        padding-right: 0;
        padding-left: 0;
    }
</style>