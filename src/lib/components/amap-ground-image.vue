<script type="text/babel">
import registerMixin from '../mixins/register-component';
export default {
  name: 'el-amap-ground-image',
  mixins: [registerMixin],
  props: [
    'vid',
    'clickable',
    'opacity',
    'url',
    'bounds',
    'visible'
  ],
  destroyed() {
    this.$amapComponent.setMap(null);
  },
  data() {
    return {
      converters: {},
      handlers: {
        visible(flag) {
          if (flag === false) {
            this.setMap(null);
          } else {
            this.setMap(this.$amap);
          }
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.ImageLayer(options);
    }
  },
  render() {
    return null;
  }
};
</script>
