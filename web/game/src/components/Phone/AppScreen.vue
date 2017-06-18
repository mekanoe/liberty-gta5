<template>
  <component :is="appId" />
</template>

<script>
import apps from '@/components/Phone/Apps'

export default {
  components: apps,
  props: [ 'appId' ]
}
</script>
