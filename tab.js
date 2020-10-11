var that;
class Tab {
  constructor () {
    that = this;
    // 获取相对应的节点，给它绑定相对应的事件
    this.ul = document.getElementsByClassName('tab-nav')[0].getElementsByTagName('ul')[0]
    this.div = document.getElementsByClassName('tab-content')[0]
    this.lis = document.getElementsByClassName('tab-nav')[0].getElementsByTagName('li')
    this.removes = document.getElementsByClassName('iconfont')
    this.spans = document.getElementsByClassName('tab-nav')[0].querySelectorAll('span')
    this.sections = document.getElementsByClassName('tab-content')[0].getElementsByTagName('section')
    this.addBtn = document.getElementsByClassName('tab-btn')[0].getElementsByTagName('button')[0]
    this.init()
  }

  // 初始化操作
  init() {
    this.addBtn.onclick = this.addTab;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.removes[i].onclick = this.deleteTab;
      this.spans[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
    }
  }

  // 清除样式
  clearStyle() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }

  // tab切换功能
  toggleTab() {
    that.clearStyle(that.lis, 'li-active')
    this.className = 'li-active'
    that.sections[this.index].className = 'content-active'
  }

  // tab增加功能
  addTab() {
    that.clearStyle();
    const li = document.createElement('li')
    li.innerHTML = `<span>新增测试</span>
    <i class="iconfont">&#xe658;</i>`
    const section = document.createElement('section')
    section.innerHTML = `新增内容`
    that.ul.appendChild(li)
    that.div.appendChild(section)
    li.className = 'li-active'
    section.className = 'content-active'
    that.init()
  }

  // tab删除功能
  deleteTab(e) {
    e.stopPropagation()
    // 如果该tab栏没被选中则不能删除
    if (this.parentNode.className !== 'li-active') return;
    // 获取下标
    const index = this.parentNode.index;
    that.lis[index].remove()
    that.sections[index].remove()
    that.init()
    if (index < 1) {
      that.lis[index].click()
    }
    that.lis[index-1].click()
  }

  // tab 编辑功能
  editTab() {
    // 双击禁止选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    const text = this.innerText
    this.innerHTML = "<input type='text'/>"
    this.children[0].value = text;
    this.className === 'content-active' ? this.children[0].style = "width: 100%;height: 250px;" :  this.children[0].style = "width: 50px;height: 20px; "
    // 将文本框中的文本置于选中状态
    this.children[0].select();
    // 当离开文本框，失去焦点或按回车键，将文本框的值赋值给span
    this.children[0].onkeyup = (e) => {
      if (e.keyCode === 13) {
        this.children[0].blur()
      }
    }
    this.children[0].onblur = () => {
      const value = this.children[0].value
      this.innerHTML = '<span>'+value+'</span>'
    }
  }
}

const tab = new Tab()