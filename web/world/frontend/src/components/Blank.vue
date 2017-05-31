<template>
</template>

<script>
  export default {
    mounted () {
      if (location.pathname === '/internal/closer') {
        try {
          window.close()
        } catch (e) {
          // do nothing
        }
      }
    }
  }

</script>
