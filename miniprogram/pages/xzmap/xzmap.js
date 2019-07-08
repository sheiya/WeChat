// pages/xzmap/xzmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls:[{//控件
      id:1,
      iconPath:"/images/film.png",
      position:{
        left:0,
        top:250 - 50,
        width:50,
        height:50
      }
    }],
    polyline:[{//线路
      points:[
        { longitude: 114.881884, latitude:  30.455073},
        { longitude: 116.361793, latitude:  39.970455}
      ],
      color:"#ffoodd",width:10,dottedLine:true
    }],
    markers:[{//标记 坐标点
      iconPath:"/images/l1.png",
      id:0,
      longitude: 114.881884,
      latitude: 30.455073,
      width:30,
      height:30
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})