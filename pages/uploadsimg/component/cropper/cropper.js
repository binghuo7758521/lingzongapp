var app = getApp(), s = app.requirejs("core");
const device = wx.getSystemInfoSync();
var twoPoint = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
  
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
    ratio: {
      
      type: Number,
      observer: function (newVal, oldVal) {
        let t = this
        t.setData({
          width: wx.getStorageSync('Width'),                //剪裁框的宽度
          height: wx.getStorageSync('Height'), //剪裁框的长度
          size: wx.getStorageSync('Size'),

        })
        
      }
    },
    url: {
      type: String,
      observer ( newVal, oldVal ) {
        this.initImg( newVal )
      }
    },
    num: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: wx.getStorageSync('Width'),                //剪裁框的宽度
    height: wx.getStorageSync('Height'), //剪裁框的长度
    originImg: null,                                //存放原图信息
    stv: {
      offsetX: 0,                                   //剪裁图片左上角坐标x
      offsetY: 0,                                   //剪裁图片左上角坐标y
      zoom: false,                                  //是否缩放状态
      distance: 0,                                  //两指距离
      scale: 1,                                     //缩放倍数
      rotate: 0                                     //旋转角度
    },
    num: 1,
    boolean:true,
    size: wx.getStorageSync('Size'),
    // imageWidth: 0,
    // imageHeight: 0
  },
 
  
  /**
   * 组件的方法列表
   */
  methods: {
    uploadTap() {
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          _this.initImg( res.tempFilePaths[0]);
        }
      })
    },
    // btn_default () {
    //   let num=this.data.num;
    //   if( num==1){
    //     return
    //   }
    //   this.setData({
    //     num: num-1
    //   })
    //   num:num
    // },
    // bind_num: function (e) {
    //   var val = e.detail.value;
    //   this.setData({
    //     num: val
    //   });
    // }, 
    // btn_add() {
    //   let that = this;
    //   var imglength = wx.getStorageSync('imglength');
   
    //   let num = that.data.num;
    //   s.get("order/ordertotal", "", function (e) {
    //     console.log(e)
    //     var total = e.total;
    //     if (total == num) {
    //       return
    //     } else {
    //       that.setData({

    //         num: num + 1
    //       })
    //       //wx.setStorageSync("num","2")
    //     }
    //   });
    // },
    clip_img(){
      let innerAspectRadio = this.data.originImg.width / this.data.originImg.height;
      if (this.data.originImg.height <= this.data.originImg.width) {
        this.setData({
          boolean: false,
          stv: {
            offsetX: 0 - Math.abs((this.data.width - this.data.height * innerAspectRadio) / 2),
            offsetY: 0,
            zoom: false, //是否缩放状态
            distance: 0,  //两指距离
            scale: 1,  //缩放倍数
            rotate: 0
          }
        })
      } else {
        this.setData({
          boolean: false,
          stv: {
            offsetX: 0,
            offsetY: 0 - Math.abs((this.data.height - this.data.width / innerAspectRadio) / 2),
            zoom: false, //是否缩放状态
            distance: 0,  //两指距离
            scale: 1,  //缩放倍数
            rotate: 0
          }
        })
      }
    },
    Liwhite(){
      let innerAspectRadio = this.data.originImg.width / this.data.originImg.height;
      if (this.data.originImg.height <= this.data.originImg.width) {
        console.log(this);
        console.log(789456);
        this.setData({
          boolean: false,
          stv: {
            offsetX: 0 - Math.abs((this.data.width - this.data.height * innerAspectRadio) / 2),
            offsetY: 0,
            zoom: false, //是否缩放状态
            distance: 0,  //两指距离
            scale: this.data.width / this.data.originImg.width,  //缩放倍数
            rotate: 0
          }
        })
      } else {
        console.log();
        console.log(9999999999);
        this.setData({
          boolean: false,
          stv: {
            offsetX: 0,
            offsetY: 0 - Math.abs((this.data.height - this.data.width / innerAspectRadio) / 2),
            zoom: false, //是否缩放状态
            distance: 0,  //两指距离
            scale: this.data.height / this.data.originImg.height,  //缩放倍数
            rotate: 0
          }
        })
      }
    },
    Liwhite_x() {
      
    },
    rotate() {
      
      this.setData({
        'stv.rotate': this.data.stv.rotate % 90 == 0 ? this.data.stv.rotate = this.data.stv.rotate + 90 : this.data.stv.rotate = 0
      })

      console.log(this.data.stv.rotate)
      let nb = this.data.stv.rotate/90;
      console.log(nb)

      if (nb%2 == 0){
        console.log('nishi')
        let innerAspectRadio = this.data.originImg.width / this.data.originImg.height;
        if (this.data.originImg.height <= this.data.originImg.width) {
          console.log(this);
          console.log(789456);
          this.setData({
            boolean: false,
            stv: {
              offsetX: 0 - Math.abs((this.data.width - this.data.height * innerAspectRadio) / 2),
              offsetY: 0,
              zoom: false, //是否缩放状态
              distance: 0,  //两指距离
              scale: this.data.width / this.data.originImg.width,  //缩放倍数
              rotate: nb * 90
            }
          })
        } else {
          console.log();
          console.log(9999999999);
          this.setData({
            boolean: false,
            stv: {
              offsetX: 0,
              offsetY: 0 - Math.abs((this.data.height - this.data.width / innerAspectRadio) / 2),
              zoom: false, //是否缩放状态
              distance: 0,  //两指距离
              scale: this.data.height / this.data.originImg.height,  //缩放倍数
              rotate: nb * 90
            }
          })
        }

      }else{
        console.log('nishi111')
        let innerAspectRadio = this.data.originImg.height / this.data.originImg.width;
        if (this.data.originImg.height <= this.data.originImg.width) {
          console.log(this);
          console.log(789456);
          console.log(this.data.height / this.data.originImg.height)
          this.setData({
            boolean: false,
            stv: {
              offsetX: 0 - Math.abs((this.data.width - this.data.height / innerAspectRadio) / 2),
              offsetY: 0 ,
              zoom: false, //是否缩放状态
              distance: 0,  //两指距离
              scale: this.data.height / this.data.originImg.width,  //缩放倍数
              rotate: nb*90
            }
          })
        } else {
          console.log();
          console.log(9999999999);
          console.log(this.data.width / this.data.originImg.width);
          console.log(9999999999);
          this.setData({
            boolean: false,
            stv: {
              offsetX: 0,
              offsetY: 0 - Math.abs((this.data.height - this.data.width * innerAspectRadio) / 2),
              zoom: false, //是否缩放状态
              distance: 0,  //两指距离
              scale: this.data.width / this.data.originImg.height,  //缩放倍数
              rotate: nb * 90
            }
          })
        }

      }
    },
    //五
    cropperImg() {
      wx.showLoading({
        title: 'loading',
        mask: true
      })
      let _this = this;

      wx.getImageInfo({
        src: _this.data.url,
        success: function (res) {
          _this.setData({
            imgwidth: res.width,
            imgheight: res.height,
          })
        }
      })
  
      let ctx = wx.createCanvasContext('imgcrop',this);
      let cropData = _this.data.stv;
      ctx.save();
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, _this.data.width * 2, _this.data.height * 2)
      // 缩放偏移值
      let x = (_this.data.originImg.width - _this.data.originImg.width * cropData.scale) / 2;
      let y = (_this.data.originImg.height - _this.data.originImg.height * cropData.scale) / 2;

      //画布中点坐标转移到图片中心
      let movex = (cropData.offsetX + x) * 2 + _this.data.originImg.width * cropData.scale;
      let movey = (cropData.offsetY + y) * 2 + _this.data.originImg.height * cropData.scale;
      ctx.translate(movex, movey);
      ctx.rotate(cropData.rotate * Math.PI / 180);
      ctx.translate(-movex, -movey);
      
      ctx.drawImage(_this.data.originImg.url, (cropData.offsetX + x) * 2, (cropData.offsetY + y) * 2, _this.data.originImg.width * 2 * cropData.scale, _this.data.originImg.height * 2 * cropData.scale);
      ctx.restore();
      ctx.draw(false, ()=> {
        wx.canvasToTempFilePath({
          canvasId: 'imgcrop',
          // fileType: 'jpg',
          success(response) {
            _this.triggerEvent("getCropperImg", { url: response.tempFilePath, num: _this.data.num ,origin: _this.data.originImg.url})
            wx.hideLoading();
          },
          fail( e ) {
            wx.hideLoading();
            wx.showToast({
              title: '生成图片失败',
              icon: 'none'
            })
          }
        }, this)
      });
    },

    //四
    initImg(url) {
      let _this = this;

      wx.getImageInfo({
        src: url,
        success(resopne) {
          let innerAspectRadio = resopne.width / resopne.height;

          if (innerAspectRadio < _this.data.width / _this.data.height) {
            _this.setData({
              originImg: {
                url: url,
                width: _this.data.width,
                height: _this.data.width / innerAspectRadio
              },
              stv: {
                offsetX: 0,
                offsetY: 0 - Math.abs((_this.data.height - _this.data.width / innerAspectRadio) / 2),
                zoom: false, //是否缩放状态
                distance: 0,  //两指距离
                scale: 1,  //缩放倍数
                rotate: 0
              },
            })
          } else {
            _this.setData({
              originImg: {
                url: url,
                height: _this.data.height,
                width: _this.data.height * innerAspectRadio
              },
              stv: {
                offsetX: 0 - Math.abs((_this.data.width - _this.data.height * innerAspectRadio) / 2),
                offsetY: 0,
                zoom: false, //是否缩放状态
                distance: 0,  //两指距离
                scale: 1,  //缩放倍数
                rotate: 0
              }
            })
          }
        }
      })
    },
    //事件处理函数
    touchstartCallback: function (e) {
      if (e.touches.length === 1) {
        let { clientX, clientY } = e.touches[0];
        this.startX = clientX;
        this.startY = clientY;
        this.touchStartEvent = e.touches;
      } else {
        let xMove = e.touches[1].clientX - e.touches[0].clientX;
        let yMove = e.touches[1].clientY - e.touches[0].clientY;
        let distance = Math.sqrt(xMove * xMove + yMove * yMove);
        twoPoint.x1 = e.touches[0].pageX * 2
        twoPoint.y1 = e.touches[0].pageY * 2
        twoPoint.x2 = e.touches[1].pageX * 2
        twoPoint.y2 = e.touches[1].pageY * 2
        this.setData({
          'stv.distance': distance,
          'stv.zoom': true, //缩放状态
        })
      }
    },
    //图片手势动态缩放
    touchmoveCallback: function (e) {
      let _this = this
      fn(_this, e)
    },
    touchendCallback: function (e) {
      //触摸结束
      if (e.touches.length === 0) {
        this.setData({
          'stv.zoom': false, //重置缩放状态
        })
      }
    }
  }
})

/**
* fn:延时调用函数
* delay:延迟多长时间
* mustRun:至少多长时间触发一次
*/
var throttle = function (fn, delay, mustRun) {
  var timer = null,
    previous = null;

  return function () {
    var now = +new Date(),
      context = this,
      args = arguments;
    if (!previous) previous = now;
    var remaining = now - previous;
    if (mustRun && remaining >= mustRun) {
      fn.apply(context, args);
      previous = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);

    }
  }
}

var touchMove = function (_this, e) {
  //触摸移动中
  if (e.touches.length === 1) {
    //单指移动
    if (_this.data.stv.zoom) {
      //缩放状态，不处理单指
      return;
    }
    let { clientX, clientY } = e.touches[0];
    let offsetX = clientX - _this.startX;
    let offsetY = clientY - _this.startY;
    _this.startX = clientX;
    _this.startY = clientY;
    let { stv } = _this.data;
    stv.offsetX += offsetX;
    stv.offsetY += offsetY;
    stv.offsetLeftX = -stv.offsetX;
    stv.offsetLeftY = -stv.offsetLeftY;
    _this.setData({
      stv: stv
    });

  } else if (e.touches.length === 2) {
    //计算旋转
    let preTwoPoint = JSON.parse(JSON.stringify(twoPoint))
    twoPoint.x1 = e.touches[0].pageX * 2
    twoPoint.y1 = e.touches[0].pageY * 2
    twoPoint.x2 = e.touches[1].pageX * 2

    function vector(x1, y1, x2, y2) {
      this.x = x2 - x1;
      this.y = y2 - y1;
    };

    //计算点乘
    function calculateVM(vector1, vector2) {
      return (vector1.x * vector2.x + vector1.y * vector2.y) / (Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y) * Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y));

    }
    //计算叉乘
    function calculateVC(vector1, vector2) {
      return (vector1.x * vector2.y - vector2.x * vector1.y) > 0 ? 1 : -1;
    }

    let vector1 = new vector(preTwoPoint.x1, preTwoPoint.y1, preTwoPoint.x2, preTwoPoint.y2);
    let vector2 = new vector(twoPoint.x1, twoPoint.y1, twoPoint.x2, twoPoint.y2);
    let cos = calculateVM(vector1, vector2);
    let angle = Math.acos(cos) * 180 / Math.PI;

    let direction = calculateVC(vector1, vector2);
    let _allDeg = direction * angle;

    // 双指缩放
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);

    let distanceDiff = distance - _this.data.stv.distance;
    let newScale = _this.data.stv.scale + 0.005 * distanceDiff;

    if (Math.abs(_allDeg) > 1) {
      _this.setData({
        'stv.rotate': _this.data.stv.rotate + _allDeg
      })
    } else {
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      let distanceDiff = distance - _this.data.stv.distance;
      let newScale = _this.data.stv.scale + 0.005 * distanceDiff;
      if (newScale < 0.2 || newScale > 2.5) {
        return;
      }
      _this.setData({
        'stv.distance': distance,
        'stv.scale': newScale,
      })
    }
  } else {
    return;
  }
}

//为touchMove函数节流
const fn = throttle(touchMove, 10, 10);