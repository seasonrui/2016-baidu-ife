<template>
  <transition name='dialog'>
    <div class="dialog-mask">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <div class="dialog-header">
            <slot name="header">
            </slot>
          </div>
          <div class="dialog-body">
            <slot name="content">
            </slot>
          </div>
          <div class="dialog-footer">
            <span class='dialog-btn' @click='$emit("confirm")'>确认</span>
            <span class='dialog-btn' @click='$emit("close")'>取消</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    // props: ['confirm', 'close']
  };
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}
.dialog-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 100px;
  box-shadow:0 0.05em 0.25em rgba(0,0,0,.5);
}
.dialog-content {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  height: 100%;
}
.dialog-header {
  padding: 8px;
  background: #ccc;
}
.dialog-header h3{
  font-size: 18px;
  font-weight: 700px;
}
.dialog-body {
  padding: 20px;
}
.dialog-footer .dialog-btn{
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #ccc;
  cursor: pointer;
  margin: 5px;
}
.dialog-footer .dialog-btn:hover{
  background-color: #ee7419;
}

.dialog-enter {
  opacity: 0;
}
.dialog-leave-active {
  opacity: 0;
}
.dialog-enter .dialog-container,
.dialog-leave-active .dialog-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

  
</style>
