const db=wx.cloud.database({
  env:"wx-02-vx912"
})
// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid:0,//电影的id
    detail:{},//电影的详细信息
    content:"",//评论的初始值
    score:0,
    images:[],//保存用户选择的图片
    fileIDs:[]
  },
  // 获取评论的方法
  onContentChange:function(e){
    // console.log(e.detail);
    this.setData({
      content:e.detail
    });
  },
  // 获取分数的方法
  onScoreChange:function(e) {
    this.setData({
      score: e.detail
    });
   // console.log(this.data.score)
  },
  // 上传图片的方法
  uploadImg:function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success : res=>{
        // tempFilePath可以作为img标签的src属性显示图片
        var  tempFilePaths = res.tempFilePaths;
        //预览
        this.setData({
          images: tempFilePaths
        })
      }
    })
  },

  // 上传按钮
  submit:function(){
    // 上传9张图片
    wx.showLoading({
      title: '提交中~',
    });
    // console.log(this.data.content+"_"+this.data.score);
    // 上传图片到云存储
    // 创建promise数组
    let promiseArr=[];
    // 创建循环9次
    for(let i=0;i<this.data.images.length;i++){
      // 创建promise push到数组中
      promiseArr.push(new Promise((reslove,reject)=>{
      // 获取当前上传图片
        var item = this.data.images[i];
      // 创建正则表达式拆分文件后缀 .jpg .png 
      let suffix=/\.\w+$/.exec(item)[0];
      // 上传图片
        wx.cloud.uploadFile({
         cloudPath:new Date().getTime()+Math.floor(Math.random()*9999)+suffix, //上传至云端的路径
          filePath: item,
          success: res=> {
            console.log(res.fileID);
          //  将当前的文件id保存到data中
           var ids=this.data.fileIDs.concat(res.fileID);
           this.setData({
             fileIDs:ids
           })
            // 上传成功将当前云存储fileID保存到数组中
            
            // 追加任务列表
            reslove();
          },
          fail:err=>{
            console.log(err);
          }
        })
      
      // 失败显示出错信息
      }));
    }
    
    // 一次性将图片，fileID保存集合中
    //保存到集合中[集合中是条记录]
    Promise.all(promiseArr).then(res => {
      //6.1:添加数据
      db.collection("comment").add({
        data: {
          content: this.data.content, //评论内容
          score: this.data.score,     //评论分数
          moveid: this.data.movieid, //电影id
          fileIds: this.data.fileIds  //上传图片id
        }
      }).then(res => {
        wx.hideLoading();//隐藏加载框 11：35
        wx.showToast({   //显示提示框
          title: '评价成功',
        })
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '评论失败',
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    //1.接收电影列表传递的参数id 并保存data中
    this.setData({
      movieid:options.id
    });
    // console.log(movieid)
    // 提示数据加载中
    wx.showLoading({
      title:"拼命加载中~",
    });
    //3. 调用云函数，将电影传递云函数
    wx.cloud.callFunction({
      name:"getDetail2",//云函数名称
      data:{
        movieid:options.id//云函数需要的参数
      }
    }).then(res=>{
       //4. 获取云函数返回的数据并且保存到data中
      // console.log(res.result);
      // 4.1将字符串转js Obj
      var obj=JSON.parse(res.result);
      // 4.2保存data
      this.setData({
        detail:obj
      })
      //5. 隐藏加载框
      wx.hideLoading();
      }).catch(err=>{
        wx.hideLoading();
        console.log(err);
      })
   

    
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