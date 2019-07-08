// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:[],//保存电影的列表
    start:0
  },
  btn_comment:function(e){
    //关闭并跳转
    // wx.redirectTo({
    //   url: '/pages/comment/comment?id=9',
    // })
    //获取电影id     自定义属性的名称 data-  后面的
    var id= e.target.dataset.movieid;
    //保留并跳转
    wx.navigateTo({
      url:"/pages/comment/comment?id="+id
    })
  },
  loadMore:function(){
    wx.showLoading({
      title: '拼命加载中……',
    })
    // 1.调用云函数
    wx.cloud.callFunction({
      name: "movielist2",//云函数名称
      data: {
        // 开始时subject 数组的长度从0开始的
        start: this.data.subjects.length,
        count: 10
      }
    }).then(res => {
      // console.log(res)
      var pic = JSON.parse(res.result);
      // console.log(pic);
      // console.log(pic.subjects);
      this.setData({
        // 将原数组拼接新数组，再赋值给subject
        // subjects: pic.subjects
        subjects: this.data.subjects.concat(pic.subjects)
      })
    })
      .catch(err => { console.log(err) })
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(1)
        //  
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