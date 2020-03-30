<template>
</template>

<script>
  import { getUnderwriteProcess } from '@/api/activiti'

  export default {
    name: 'Example',
    data() {
      return {
        result: ''
      }
    },
    created() {
      const data = { executionId: '125001' }
      getUnderwriteProcess(data)
        .then(response => {
          console.log(response)
          this.result = response
        })
    }
  }
</script>

<style scoped lang="less">

</style>
