<template>
    <div>
        {{name}}
    </div>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      username: this.username
    }
  },
  methods: {
    getName () {
      // 通过用户id查找用户名称
      alert(this.username)
      this.$axios.get('/admin/user/getByUsername?username=' + this.username, null).then(data => {
        if (data.code === 200) {
          this.name = data.data
        }
      })
    }
  },
  mounted: function () {
    console.log(this.username)
    this.getName()
  },
  props: {
    id: String,
    required: true
  }
}
</script>

<style scoped>

</style>
