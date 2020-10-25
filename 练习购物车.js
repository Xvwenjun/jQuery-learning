$(function() {
    //1、点击全选按钮，所有商品被勾选；取消，则全部取消；遍历所有复选框，当全部选中，全选按钮跟随变化
    $(".select-all").change(function() {
        // console.log($(this).prop('checked'));
        $('.select,.select-all').prop('checked', $(this).prop('checked'));
        count();
        changeColor();
    })

    //遍历写法：
    // $('.select').change(function() {
    //     var flag = true;
    //     $('.select').each(function(i, ele) {
    //         if ($(ele).prop('checked') == false) {
    //             flag = false;
    //         }
    //     })
    //     $(".select-all").prop('checked', flag);
    // })

    //选中后改变背景颜色封装为函数
    function changeColor() {
        $('.select').each(function(i, ele) {
            if ($(ele).prop("checked")) {
                $(ele).parent().addClass('card-selected');
            } else {
                $(ele).parent().removeClass('card-selected');
            }

        })

    }

    //属性选择器的写法：
    $('.select').change(function() {
        if ($('.select:checked').length === $('.select').length) {
            $('.select-all').prop('checked', true);
        } else {
            $('.select-all').prop('checked', false);
        }
        changeColor()
        count();
    })


    //2、商品数量增减变化，总数随之变化
    $('.num-sub').click(function() {
        // console.log(typeof($(this).siblings('.num-sum').val()));
        var numSum = parseInt($(this).siblings('.num-sum').val());
        if (numSum == 0) {
            numSum = 0;
        } else {
            numSum--;
        }

        //小计
        $(this).siblings('.num-sum').val(numSum);
        // console.log($(this).parent().siblings(".price").text());
        var p = $(this).parent().siblings(".price").text().substr(1);
        console.log(p);
        var SSum = parseFloat(p) * numSum;
        console.log(SSum);
        $(this).parent().siblings(".s-sum").text("￥" + SSum);
        count();
    })
    $('.num-add').click(function() {
        // console.log(typeof($(this).siblings('.num-sum').val()));
        var numSum = parseInt($(this).siblings('.num-sum').val());
        numSum++;
        $(this).siblings('.num-sum').val(numSum);
        //小计
        $(this).siblings('.num-sum').val(numSum);
        // console.log($(this).parent().siblings(".price").text());
        var p = $(this).parent().siblings(".price").text().substr(1);
        console.log(p);
        var SSum = parseFloat(p) * numSum;
        console.log(SSum);
        $(this).parent().siblings(".s-sum").text("￥" + SSum);
        count();
    })



    //总计封装为函数
    function count() {
        var allSum = 0;
        $('.select:checked').siblings('.num').children('.num-sum').each(function(i, ele) {
                allSum += parseInt($(ele).val())
            })
            // console.log(allSum);
        $(".all-sum").children().text(allSum);

        //总计
        var fpp = 0;
        $('.select:checked').each(function(i, ele) {
            var fp = $(ele).siblings('.s-sum').text().substr(1);
            fp = parseFloat(fp);
            fpp += fp;
        })
        $('.sum-price').children().text("￥" + fpp);

    }


    //删除操作
    $(".operation").click(function() {
            $(this).parent().remove();
            count();
        })
        //删除选中商品
    $(".clear-select").click(function() {
            $('.select:checked').each(function(i, ele) {
                $(ele).parent().remove();
            })
        })
        //清理购物车
    $(".clear-all").click(function() {
        $('.card').remove();
    })
})