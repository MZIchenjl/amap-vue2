import eventHelper from '../utils/event-helper';
export default {
  methods: {
    setEditorEvents() {
      if (!this.$amapComponent.editor) return;
      const filters = {
        end: true,
        move: true,
        adjust: true,
        addnode: true,
        removenode: true
      };
      Object.keys(this.$listeners).forEach(key => {
        const once = key.startsWith('~');
        const eventName = once ? key.slice(1) : key;
        if (filters[eventName]) {
          if (once) {
            eventHelper.addListenerOnce(this, this.$amapComponent, eventName);
          } else {
            eventHelper.addListener(this, this.$amapComponent.editor, eventName);
          }
        }
      });
    }
  }
};
