<script>
import {lngLatTo, pixelTo, toPixel} from '../utils/convert-helper';
import registerMixin from '../mixins/register-component';

export default {
  name: 'el-amap-label-marker',
  mixins: [registerMixin],
  props: [
    'vid',
    'name',
    'position',
    'zooms',
    'opacity',
    'visible',
    'rank',
    'zIndex',
    'extData',
    'icon',
    'text'
  ],
  data() {
    return {
      converters: {
        position(val) {
          return val;
        },
        text(options) {
          if (!options) {
            return options;
          }
          const ret = { content: options.content };
          ['direction', 'offset', 'zooms', 'style'].forEach(key => {
            if (options[key]) {
              ret[key] = options[key];
            }
          });
          return ret;
        },
        icon(options) {
          if (!options) {
            return options;
          }
          const ret = { image: options.image };
          ['clipOrigin', 'retina', 'size'].forEach(key => {
            if (options[key]) {
              ret[key] = options[key];
            }
          });
          if (options.anchor) {
            if (typeof options.anchor === 'string') {
              ret.anchor = options.anchor;
            } else {
              ret.anchor = toPixel(options.anchor);
            }
          }
          return ret;
        }
      },
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.LabelMarker(options);
    },
    $$getExtData() {
      return this.extData;
    },
    $$getPosition() {
      if (!this.$amapComponent) {
        return null;
      }
      return lngLatTo(this.$amapComponent.getPosition());
    },
    $$getOffset() {
      if (!this.$amapComponent) {
        return null;
      }
      return pixelTo(this.$amapComponent.getOffset());
    }
  },
  render() {
    return null;
  }
};
</script>
