Vue.component("tabs", {
  template:
    '\
      <div class="tabs">\
         <div class="tabs-bar"> \
             <!--  标签页标题，这里要用v-for    -->      \
                    <div                                \
                           :class="tabCls(item)"            \
                                v-for="(item,index) in navList "    \
                                   @click="handleChange(index)"  >                         \
                                     {{item.label}}           \
                    </div>            \
         </div>               \
              <div class="tabs-content">  \
                 <!--这里的slot 就是嵌套的panel -->   \
                 <slot>  </slot>                        \
              </div>          \
      </div>          \
    ',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data: function() {
    return {
      // 因为不能修改value,所以复制一份自己维护
      currentValue: this.value,
      // 用于渲染 tabs 的标题
      navList: []
    };
  },
  methods: {
    tabCls: function(item) {
      return [
        "tabs-tab",
        {
          "tabs-tab-active": item.name === this.currentValue
        }
      ];
    },
    handleChange: function(index) {
      var nav = this.navList[index];
      var name = nav.name;
      //改变 当前选中tab 并触发下面的watch
      this.currentValue = name;
      // 更新 value
      this.$emit("input", name);
      // 触发一个自定义事件 供父级使用
      this.$emit("on-click", name);
    },
    getTabs() {
      // 通过遍历子组件，得到所有的Panel组件
      return this.$children.filter(function(item) {
        return item.$options.name === "pane";
      });
    },
    updateNav() {
      this.navList = [];
      // 设置对this 的引用, 在function 回调里， this 指向的并不是vue 实例
      var _this = this;
      this.getTabs().forEach(function(panel, index) {
        _this.navList.push({
          label: panel.label,
          name: panel.name || index
        });
        if (!panel.name) panel.name = index;
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = panel || index;
          }
        }
      });
      this.updateStatus();
    },
    updateStatus: function() {
      var tabs = this.getTabs();
      var _this = this;
      tabs.forEach(function(tab) {
        return (tab.show = tab.name === _this.currentValue);
      });
    }
  },
  watch: {
    value: function(val) {
      this.currentValue = val;
    },
    currentValue: function() {
      // 在当前选中的tab发生变化时 更新panel的显示状态
      this.updateStatus();
    }
  }
});
