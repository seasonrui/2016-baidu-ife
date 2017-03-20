<template>
  <div id="calendar">
    <div id="mask" @click='hidden($event)' v-if='maskShow'></div>
    <div class="input" id='inputdate' @click='createCalendar'> {{ selectedDate }}</div>
    <transition name="toggle">
      <div class="date-panel" v-show="panelState" id="date-panel">
        <div class="panel-header">
          <span class="prev" @click='prev'></span><span class="year" @click='panelYear'>{{ tmpYear }}</span><span class="month" @click='panelMonth'>{{ monthList[tmpMonth] }}</span><span class="next" @click='next'></span>
        </div>
        <div class="type-year" v-show="panelType === 'year'">
          <ul class='year-list'>
            <li v-for='(item, index) in yearList' @click='selectYear(item)'>
              {{item}}
            </li>
          </ul>
        </div>
        <div class="type-month" v-show="panelType === 'month'">
          <ul class='month-list'>
            <li v-for='(item, index) in monthList' @click='selectMonth(index)'>
              {{item}}
            </li>
          </ul>
        </div>
        <div class="type-date" v-show="panelType === 'date'">
          <ul class="weeks"><li v-for='item in weekList'>{{ item }}</li></ul>
          <ul class='date-list'>
            <li v-for='item in dateList' :class="{preMonth: item.previousMonth, nextMonth: item.nextMonth, selected: (item.currentMonth && item.value===tmpDate)}" @click='selectDate(item)'>
              {{item.value}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    let now = new Date();
    return {
      panelState: false, // 默认关闭
      maskShow: false,
      panelType: 'date',
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      tmpYear: now.getFullYear(),
      tmpMonth: now.getMonth(),
      tmpDate: now.getDate(),
      selectedDate: ''
    };
  },

  computed: {
    ...mapGetters({
      editing: 'editing',
      status: 'status'
    }),
    dateList () {
      // 获取当月的天数
      let monthLength = Array(12);
      monthLength = [31, this.isLeap(this.tmpYear) === true ? 29 : 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];
      let currentMonthLength = monthLength[this.tmpMonth];
      // 将当月的日期塞入dateList中
      let dateList = Array.from({length: currentMonthLength}, (val, index) => {
        return {
          currentMonth: true,
          value: index + 1
        };
      });
      let startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay();
      let previousMonthLength = monthLength[this.tmpMonth - 1];
      for (let i = 0; i < startDay; i++) {
        dateList = [{previousMonth: true, value: previousMonthLength - i}].concat(dateList);
      }
      for (let i = 1; i < 42 - currentMonthLength - startDay + 1; i++) {
        dateList[dateList.length] = {nextMonth: true, value: i};
      }
      return dateList;
    },
    yearList () {
      let yearList = Array.from({length: 12}, (val, index) => this.tmpYear + index);
      return yearList;
    },
    monthList () {
      let monthList = Array.from(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
      return monthList;
    }
  },
  mounted () {
    if (this.$store.state.editing.time !== 0) {
      this.selectedDate = this.$store.state.editing.time;
    }
  },
  methods: {
    isLeap (year) {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },
    getPosition () {
      let inputdate = document.getElementById('inputdate');
      let top = inputdate.getBoundingClientRect().top;
      let left = inputdate.getBoundingClientRect().left;
      let panel = document.getElementById('date-panel');
      panel.style.top = (top - 250) + 'px';
      panel.style.left = left + 'px';
    },
    createCalendar () {
      this.panelState = true;
      this.maskShow = true;
      // this.getPosition();
    },
    prev () {
      if (this.panelType === 'year') {
        this.tmpYear = this.tmpYear - 12;
      } else {
        this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1;
      }
    },
    next () {
      if (this.panelType === 'year') {
        this.tmpYear = this.tmpYear + 12;
      } else {
        this.tmpMonth = this.tmpMonth === 11 ? 11 : this.tmpMonth + 1;
      }
    },
    panelYear () {
      this.panelType = 'year';
    },
    panelMonth () {
      this.panelType = 'month';
    },
    selectMonth (item) {
      this.tmpMonth = item;
      this.panelType = 'date';
    },
    selectYear (item) {
      this.tmpYear = item;
      this.panelType = 'month';
    },
    selectDate (item) {
      console.log(item);
      if (item.currentMonth) {
        this.tmpDate = item.value;
        this.panelState = false;
        this.maskShow = false;
        this.selectedDate = this.tmpYear + '年' + (this.tmpMonth + 1) + '月' + this.tmpDate + '日';
        this.saveDate(this.selectedDate);
      } else if (item.nextMonth) {
        this.tmpDate = item.value;
        this.next();
      } else if (item.previousMonth) {
        this.tmpDate = item.value;
        this.prev();
      }
    },
    hidden (e) {
      if (e.target.id === 'mask') {
        this.panelState = false;
        this.maskShow = false;
      }
    },
    saveDate (selectedDate) {
      this.$store.dispatch('saveDate', selectedDate);
    }
  }
};

</script>
<style lang='scss'>
@import '../../common/style/variables.scss';
#calendar {
  position: relative;
  #mask {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.7;
    height: 100%;
    width: 100%;
    z-index: 10;
  }
  .input {
    height: 30px;
    line-height: 30px;
    width: 100px;
    border: 1px solid #888;
    border-radius: 4px;
    cursor: pointer;
    color: #000;
    font-size: $font-size-sm;
  }
  .date-panel {
    position: absolute;
    width: 280px;
    height: 220px;
    padding: 5px;
    border: 1px solid $grey;
    background: #fff;
    z-index: 999;
    top: -235px;
    left: 50px;
    .panel-header {
      height: 40px;
      line-height: 40px;
      .prev {
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-right: 10px solid #222;
        border-bottom: 5px solid transparent;
        cursor: pointer;
      }
      .next {
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 10px solid #222;
        border-bottom: 5px solid transparent;
        cursor: pointer;
      }
      .year {
        padding: 0 5px 0 10px;
      },
      .month {
        padding: 0 10px 0 5px;
      }
      .year, .month {
        display: inline-block;
        width: 80px;
        height: 20px;
        line-height: 20px;
        margin: 5px;
        vertical-align: middle;
        cursor: pointer;
        font-size: 18px;
      }
    }
    .type-year {
      width: 100%;
      ul li{
        width: 70px;
        height: 60px;
        line-height: 56px;
        font-size: 18px;
        &:hover{
          background-color: $background-color;
          border-radius: 5px;
        }
      }
    }
    .type-month {
      ul li {
        width: 70px;
        height: 60px;
        line-height: 56px;
        font-size: 18px;
        &:hover {
          background-color: $background-color;
          border-radius: 5px;
        }
      }
    }
    .type-date {
      ul li {
        width: 40px;
        height: 26px;
        line-height: 28px;
        font-size: $font-size-md;
        date-list li:hover {
          background-color: $background-color;
          border-radius: 5px;
        }
      }
      .preMonth, .nextMonth {
        color: $grey;
      }
      .selected {
        background-color: $background-color;
        border-radius: 5px;
      }
    }
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: start;
      list-style: none;
      li {
        width: 40px;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
  }
}
.toggle-enter, .toggle-leave-active{
  opacity: 0;
  transform: translateY(-10px);
}
.toggle-enter-active, .toggle-leave-active{
  transition: all ease .2s;
}


  
</style>
