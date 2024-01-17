<template>
    <div
      style="position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:1000;"
      @mousemove="mousemove($event)"
      @mouseup="touchend($event)"
      @mouseleave="touchend($event)"
      @touchmove="touchmove($event)"
      @touchend="touchend($event)"
      @mousedown="mousestart($event)"
      @touchstart="touchstart($event)"
    >
      <div
        style="user-select: none"
        :style="padArea.style"
        v-show="isMousedown"
      >
        <div style="position:relative;width:100%;height:100%;">
          <div :style="padHead.style" />
          <div :style="padRoot.style" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    mixins: [],
    components: {},
    head() {
      return {};
    },
    data() {
      return {
        isMousedown: false,
        padViewPosition: {
          x: 0,
          y: 0
        },
        padMovePosition: {
          x: 0,
          y: 0
        },
        padHead: {
          size: 48,
          edgeSize: 5,
          color: "#aaa5",
          zIndex: 1100,
          style: {}
        },
        padRoot: {
          size: 32,
          edgeSize: 3,
          color: "#aaa5",
          zIndex: 1050,
          style: {}
        },
        padArea: {
          size: 100,
          edgeSize: 3,
          color: "#aaa5",
          zIndex: 1010,
          style: {}
        }
      };
    },
    watch: {
      padMovePosition: {
        handler(newValue, oldValue) {
          const x =
            this.padMovePosition.x -
            (this.padViewPosition.x + this.padArea.size / 2);
          const y =
            this.padMovePosition.y -
            (this.padViewPosition.y + this.padArea.size / 2);
          const vel = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  
          // 呼び出し元へ通知
          this.$emit("input", {
            x: x == 0 ? 0 : x / vel,
            y: y == 0 ? 0 : y / vel,
            v: vel,
            rad: Math.atan2(y, x)
          });
  
          // タップ先端のstyle
          this.padHead.style = {
            position: "absolute",
            width: this.padHead.size + this.padHead.edgeSize * 2 + "px",
            height: this.padHead.size + this.padHead.edgeSize * 2 + "px",
            top:
              this.padMovePosition.y -
              this.padViewPosition.y -
              this.padHead.size / 2 -
              this.padHead.edgeSize +
              "px",
            left:
              this.padMovePosition.x -
              this.padViewPosition.x -
              this.padHead.size / 2 -
              this.padHead.edgeSize +
              "px",
            "z-index": this.padHead.zIndex,
            "border-radius": this.padHead.size / 2 + this.padHead.edgeSize + "px",
            border: this.padHead.edgeSize + "px solid " + this.padHead.color,
            "box-sizing": "border-box"
          };
  
          // タップの根本のstyle
          const padRootPosition = (() => {
            if (vel > this.padArea.size / 2) {
              let value = this.padArea.size / 2 / vel;
              return {
                x: x * value + (this.padViewPosition.x + this.padArea.size / 2),
                y: y * value + (this.padViewPosition.y + this.padArea.size / 2)
              };
            } else {
              return {
                x: this.padMovePosition.x,
                y: this.padMovePosition.y
              };
            }
          })();
          this.padRoot.style = {
            position: "absolute",
            width: this.padRoot.size + this.padRoot.edgeSize * 2 + "px",
            height: this.padRoot.size + this.padRoot.edgeSize * 2 + "px",
            top:
              padRootPosition.y -
              this.padViewPosition.y -
              this.padRoot.size / 2 -
              this.padRoot.edgeSize +
              "px",
            left:
              padRootPosition.x -
              this.padViewPosition.x -
              this.padRoot.size / 2 -
              this.padRoot.edgeSize +
              "px",
            "z-index": this.padRoot.zIndex,
            "border-radius": this.padRoot.size / 2 + this.padRoot.edgeSize + "px",
            border: this.padRoot.edgeSize + "px solid " + this.padRoot.color,
            "box-sizing": "border-box"
          };
        },
        deep: true
      },
      padViewPosition: {
        handler(newValue, oldValue) {
          this.padArea.style = {
            background: "#eee5",
            position: "absolute",
            width: this.padArea.size + this.padArea.edgeSize * 2 + "px",
            height: this.padArea.size + this.padArea.edgeSize * 2 + "px",
            top: this.padViewPosition.y + "px",
            left: this.padViewPosition.x + "px",
            "user-select": "none",
            "z-index": this.padArea.zIndex,
            "border-radius": this.padArea.size / 2 + this.padArea.edgeSize + "px",
            border: this.padArea.edgeSize + "px solid " + this.padArea.color,
            "box-sizing": "border-box"
          };
        },
        deep: true
      }
    },
    created() {},
    mounted() {
      this.padMovePosition = {
        x: this.padViewPosition.x + this.padArea.size / 2,
        y: this.padViewPosition.y + this.padArea.size / 2
      };
    },
    computed: {},
    methods: {
      // 触ったときの処理(マウス)
      mousestart(e) {
        this.isMousedown = true;
        this.padViewPosition.x = e.pageX - this.padArea.size / 2;
        this.padViewPosition.y = e.pageY - this.padArea.size / 2;
      },
      // 触ったときの処理(タップ)
      touchstart(e) {
        this.isMousedown = true;
        let touch = e.targetTouches[0];
        this.padViewPosition.x = touch.pageX - this.padArea.size / 2;
        this.padViewPosition.y = touch.pageY - this.padArea.size / 2;
  
      },
      // 動いている間の処理(マウス)
      mousemove(e) {
        if (this.isMousedown) {
          this.padMovePosition.x = e.pageX;
          this.padMovePosition.y = e.pageY;
        }
      },
      // 動いている間の処理(タップ)
      touchmove(e) {
        if (this.isMousedown) {
          if (e.targetTouches.length == 1) {
            let touch = e.targetTouches[0];
            this.padMovePosition.x = touch.pageX;
            this.padMovePosition.y = touch.pageY;
          }
        }
      },
      // 離したときの処理(マウス・タップ共通)
      touchend(e) {
        if (this.isMousedown) {
          this.isMousedown = false;
          this.padMovePosition.x = this.padViewPosition.x + this.padArea.size / 2;
          this.padMovePosition.y = this.padViewPosition.y + this.padArea.size / 2;
        }
      }
    }
  };
  </script>
  