export const mixinCommonUtil = {
  data () {
    return {
      comCode: '32000000'
    }
  },
  created () {
    // this.hello();
  },
  methods: {
    // 判断广东个性，除深圳
    indivCheck_GD () {
      let comCodesub1 = this.comCode.substring(0, 2)
      let comCodesub2 = this.comCode.substring(0, 4)
      console.log('mixin:' + comCodesub1 + '---' + comCodesub2)
      if (comCodesub1 === '41' && comCodesub2 !== '4403') {
        return true
      } else {
        return false
      }
    },
    // 判断河南个性
    indivCheck_HA () {
      if (this.comCode.substring(0, 2) === '41') {
        return true
      } else {
        return false
      }
    }
  }
}
