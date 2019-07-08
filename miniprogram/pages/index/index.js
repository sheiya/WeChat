// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // subjects: [{ images: { large: "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558293106.jpg"}}],//保存电影的列表
    subject: [],//保存电影的列表
    start: 0
  },
 
  handleStart:function(){
    
    //关闭并跳转  url 相对路径
    wx.reLaunch({
      url:'../home/home'
    })
  },
  loadMore: function () {
    // 1.调用云函数
    wx.cloud.callFunction({
      name: "movielist2",//云函数名称
      data: {
        // 开始时subject 数组的长度从0开始的
        start: this.data.subject.length,
        count: 3
      }
    }).then(res => {
      // console.log(res)
      var pic = JSON.parse(res.result);
      // console.log(pic.subjects);
      this.setData({
        // 将原数组拼接新数组，再赋值给subject
        // subjects: pic.subjects
        subject: pic.subjects
        
      })
      // console.log(this.data.subject)
    })
      .catch(err => { console.log(err) });
    // console.log(this.data.subject)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
    // console.log(this.data.subject)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})