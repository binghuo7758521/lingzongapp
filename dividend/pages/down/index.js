var t = getApp(), e = t.requirejs("/core");

t.requirejs("jquery");

Page({
    data: {
        list: [],
        page: 1,
        loading: !1
    },
    onLoad: function() {
        var t = {
            page: 1
        };
        this.getlist(t);
    },
    getlist: function(t) {
        var a = this;
        a.setData({
            loading: !0
        }), console.error(a.data.loading), e.get("dividend/down", t, function(e) {
            if (console.error(e), 0 == e.error) {
                if (e.list.length > 0) {
                    var i = a.data.list.concat(e.list);
                    
                    t.page = t.page + 1;
                }
                a.setData({
                    member: e.member,
                    list: i,
                    loading: !1,
                    total: e.total,
                    page: t.page,
                    stop: !1
                });
            }
        });
    },
   toAgentHeads:function(event){

     var a = this;

     var memberId=event.currentTarget.dataset.memberId;

     e.get("dividend/down/check", {member_id: memberId},function (e) {

       console.log(e);

       if (e.code==1) {
         wx.showToast({
           title: '已指定，需管理员后台审核' ,
            success: res => {
              a.setData({
                page: 1,
                loading: !1,
                list: []
              });
              a.onLoad();
           }
         })
       }
     });

   }
});