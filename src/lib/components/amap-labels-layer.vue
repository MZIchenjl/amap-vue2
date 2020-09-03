<script type="text/babel">
import CONSTANTS from '../utils/constant';
import registerMixin from '../mixins/register-component';

export default {
  name: 'el-amap-labels-layer',
  mixins: [registerMixin],
  props: [
    'vid',
    'zIndex',
    'opacity',
    'animation',
    'collision',
    'allowCollision',
    'zooms'
  ],
  data() {
    return {
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      const layer = new AMap.LabelsLayer(options);
      this.$amapComponent = layer;
      this.$amapLayer = layer;
      (this.$children || []).forEach(vm => vm.$emit(CONSTANTS.AMAP_LAYER_READY_EVENT, layer));
    }
  },
  render(h) {
    return h('div', { class: 'el-amap-labels-layer' }, this.$slots.default);
  }
};
</script>
