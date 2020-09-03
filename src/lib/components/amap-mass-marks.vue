<script type="text/babel">
import registerMixin from '../mixins/register-component';
import { commonConvertMap } from '../utils/convert-helper';
export default {
  name: 'el-amap-mass-marks',
  mixins: [registerMixin],
  props: [
    'vid',
    'zIndex',
    'opacity',
    'zooms',
    'styles',
    'cursor',
    'data'
  ],
  data() {
    return {
      propsRedirect: {
        styles: 'style'
      },
      converters: {
        styles: this.convertStyle
      }
    };
  },
  methods: {
    __initComponent(options) {
      delete options.data;
      this.$amapComponent = new AMap.MassMarks(this.data, options);
    },
    convertStyle(style) {
      if (!style) {
        return;
      }
      if (Array.isArray(style)) {
        return style.map(item => this.convertStyle(item));
      }
      return Object.keys(style).reduce((ret, key) => {
        const convertFn = commonConvertMap[key];
        if (convertFn) {
          ret[key] = convertFn(style[key]);
        } else {
          ret[key] = style[key];
        }
        return ret;
      }, {});
    }
  },
  render() {
    return null;
  }
};
</script>
