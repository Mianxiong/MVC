import "./app2.css";
import $ from "jquery";

const eventBus = $(window)
const localKey = 'app2.index'
const m = {
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('index', m.data.index)
  },
  get() {}
}

const v = {
  el: null,
  html: (index) => {
    return `
    <div>
      <ol class="tab-bar">
        <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1111</span></li>
        <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>2222</span></li>
      </ol>
      <ol class="tab-content">
        <li class="${index === 0 ? 'active' : ''}" >内容1</li>
        <li class="${index === 1 ? 'active' : ''}" >内容2</li>
      </ol>
    </div>
    `
  }
  ,
  init(container) {
    v.el = $(container)
  },
  render(index) {
    if (v.el.children.length !== 0) v.el.empty()
    $(v.html(index)).appendTo(v.el)
  }
}

const c = {
  init(container) {
    v.init(container)
    v.render(m.data.index) // view = render(data)
    c.autobindEvents()
    eventBus.on('m:updated', ()=> {
      v.render(m.data.index)
    })
  },
  events: {
    'click .tab-bar li': 'x',
  },
  x(e) {
    // console.log(e.currentTareget.dataset.index)
    // console.log('x')
    const index = parseInt(e.currentTarget.dataset.index)
    m.update({index:index})
  },
  autobindEvents() {
    for(let key in c.events) {
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex+1);
      console.log(part1,',',part2)
      v.el.on(part1, part2, value)
    }
  }
}
export default c

// const $element = $(html).appendTo($('body>.page'))
// const $tabBar = $("#app2 .tab-bar");
// const $tabContent = $("#app2 .tab-content");


// $tabBar.on("click", "li", e => {
//   const $li = $(e.currentTarget);
//   $li
//     .addClass("selected")
//     .siblings()
//     .removeClass("selected");
//   const index = $li.index();
//   localStorage.setItem(localKey, index)
//   $tabContent
//     .children()
//     .eq(index)
//     .addClass("active")
//     .siblings()
//     .removeClass("active");
// });

// $tabBar.children().eq(index).trigger('click')
