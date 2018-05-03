window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
var nav_visible;
var nav = $('#nav');
var intervalID;

$(document).ready(function(){
    set_float_nav();
    set_form_submit_listener();
    set_phone_mask();
    set_toastr_options();
    set_buttons_blur();
    set_scroll_down();
    set_accordion();
    set_slider_buttons_click_listener();
    personnel_transform();
    set_mobile_menu();
    set_interval();
    set_how_we_work_left_right_buttons_listener();
    set_examples();
});
var handler = onVisibilityChange($('#slider_buttons'), function(visible) {
    if (visible) {
        intervalID = setInterval(function() {
            var next;
            var current = $("#slider_buttons .item.active").data('name');
            if (current === 4) {
                next = 1;
            } else {
                next = current + 1;
            }
            $('#slider_buttons .item[data-name="' + next + '"]').trigger('auto_click');
        }, 6500);
    } else {
        clearInterval(intervalID);
    }
});
function isElementInViewport (el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            callback(visible);
        }
    }
}
function set_interval() {
    $(window).on('DOMContentLoaded load resize scroll', handler);
}
function set_slider_buttons_click_listener() {
  function click_callback(that) {
    if ($(that).hasClass('active')) return;
    $('#slider_buttons .item.active').removeClass('active');
    $(that).addClass('active');
    $('#slider img.active').removeClass('active');
    $('#slider_text > .item').removeClass('active');
    $('#slider img[name="' + $(that).data('name') + '"]').addClass('active');
    $('#slider_text > .item[data-name="' + $(that).data('name') + '"]').addClass('active');
  }
  $("#slider_buttons .first .item:first-of-type, #slider img:first-of-type, #slider_text > .item:first-of-type").addClass('active');
  $("#slider_buttons .item").on('click', function() {
      clearInterval(intervalID);
      click_callback(this);
  });
  $("#slider_buttons .item").on('auto_click', function() {
      click_callback(this);
  });
}
function set_how_we_work_left_right_buttons_listener() {
    $("#slider .right").on('click', function() {
        clearInterval(intervalID);
        var _next;
        var _current = $("#slider_buttons .item.active").data('name');
        if (_current === 4) {
            _next = 1;
        } else {
            _next = _current + 1;
        }
        $('#slider_buttons .item[data-name="' + _next + '"]').trigger('auto_click');
        intervalID = setInterval(function() {
            var next;
            var current = $("#slider_buttons .item.active").data('name');
            if (current === 4) {
                next = 1;
            } else {
                next = current + 1;
            }
            $('#slider_buttons .item[data-name="' + next + '"]').trigger('auto_click');
        }, 5500);
    });
    $("#slider .left").on('click', function() {
        clearInterval(intervalID);
        var _next;
        var _current = $("#slider_buttons .item.active").data('name');
        if (_current === 1) {
            _next = 4;
        } else {
            _next = _current - 1;
        }
        $('#slider_buttons .item[data-name="' + _next + '"]').trigger('auto_click');
        intervalID = setInterval(function() {
            var next;
            var current = $("#slider_buttons .item.active").data('name');
            if (current === 4) {
                next = 1;
            } else {
                next = current + 1;
            }
            $('#slider_buttons .item[data-name="' + next + '"]').trigger('auto_click');
        }, 5500);
    });
}
function set_mobile_menu() {
    $(".menu_mobile_icon").sideNav({
      menuWidth: 300,
      onOpen: function(el) {
          $(".menu_mobile_icon").addClass('active');
      },
      onClose: function(el) {
          $(".menu_mobile_icon").removeClass('active');
      }
    });
}
function personnel_transform() {
    var checkpoint_achieved;
    var checkpoint = $("#personnel").offset().top;
    $(window).scroll(function (e) {
        if (checkpoint_achieved) return;
        if ($(window).scrollTop() + $(window).height() >= checkpoint + 75) {
            checkpoint_achieved = true;
            $("#personnel .item").addClass('active');
        }
    })
}
function set_accordion() {
    var acc = document.getElementsByClassName("accordion_header");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function() {
        $(this).siblings('.accordion_header.active').toggleClass('active');
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if ($(panel).css('max-height').indexOf('0') === 0){
          $(panel).css('max-height', panel.scrollHeight);
          $(panel).siblings('.accordion_content').css('max-height', 0);
        } else {
          $(panel).css('max-height', 0);
        }
      }
    }
}
function set_scroll_down() {
  $(".top_pointer_wrapper").click(function() {
    $('html, body').animate({
        scrollTop: $(".block.second").offset().top - 40
    }, 500);
  });
  $('#nav [href="#block_order"]').click(function() {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(".block.order").offset().top - 40
    }, 500);
  });
  $("#prices button").click(function() {
    $('html, body').animate({
        scrollTop: $(".block.order").offset().top - 40
    }, 500);
  });
  $("#slide-out button").click(function() {
    $(".menu_mobile_icon").sideNav('hide');
    $('html, body').animate({
        scrollTop: $(".block.order").offset().top - 40
    }, 500);
  });
  $('[href="#block_examples"]').click(function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#block_examples").offset().top - 40
    }, 500);
  });
  $('[href="#block_how_we_works"]').click(function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#block_how_we_works").offset().top - 40
    }, 500);
  });
  $('[href="#block_prices"]').click(function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#block_prices").offset().top - 40
    }, 500);
  });
  $('[href="#block_faq"]').click(function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#block_faq").offset().top - 40
    }, 500);
  });
}
function set_buttons_blur() {
  $("button").click(function(event) {
    $(this).blur();
  });
}
function set_toastr_options() {
    toastr.options = {
        "positionClass": "toast-top-center"
    }
}
function set_phone_mask() {
    $('[name="phone"]').mask("+996 (555) 55-55-55");
}
// function set_form_submit_listener() {
//     $('form').submit(function(){
//         var that = this;
//         $(this).find('button[type="submit"]').prop('disabled', true);
//         var name = $(this).find('input[name="name"]').val();
//         var phone = $(this).find('input[name="phone"]').val();
//         if (!name.replace(/ /g,'')) {
//             toastr.info('Пожалуйста, укажите Ваше имя.');
//             $(this).find('button[type="submit"]').prop('disabled', false);
//             return false;
//         }
//         if (!phone) {
//             toastr.info('Пожалуйста, введите номер телефона.');
//             $(this).find('button[type="submit"]').prop('disabled', false);
//             return false;
//         }
//
// 		$.post(
// 		    'https://script.google.com/macros/s/AKfycbwRmUaAiaD0dWNuCP3qXLDklUTGU5wYFnudhVqr12Tz5mQSj90/exec',
//             {
//                 'имя': Name,
//                 'телефон': Phone,
//             }, function(){}
// 		);
//         $(that).find('input[name="name"]').val('');
//         $(that).find('input[name="phone"]').val('');
//         $(that).find('button[type="submit"]').prop('disabled', false);
//         toastr.success('Заявка успешно отправлена.');
//         yaCounter48105344.reachGoal('zayavka');
// 		return false;
// 	});
// }
function set_float_nav() {
    $(window).scroll(function() {
        var scroll_top = $(window).scrollTop();
        if (scroll_top > 0) {
            if (!nav_visible) {
                nav_visible = true;
                nav.addClass('visible');
            }
        } else {
            nav_visible = false;
            nav.removeClass('visible');
        }
    });
}
function set_examples() {
    function set_examples_interval() {
        interval = setInterval(function() {
            current ++;
            if (current > images_count) current = 1;
            $('#examples img').attr('src','img/examples/' + current + '.jpg');
        }, 4000);
    }
    $("#examples img:first-of-type").addClass('active');
    var positions = [1, 2, 3, 4];
    var current = 1;
    var images_count = positions.length;
    var interval;
    set_examples_interval();
    $("#examples .right").on('click', function() {
        clearInterval(interval);
        current ++;
        if (current > images_count) current = 1;
        $('#examples img').attr('src','img/examples/' + current + '.jpg');
        set_examples_interval();
    });
    $("#examples .left").on('click', function() {
        clearInterval(interval);
        current --;
        if (current === 0) current = images_count;
        $('#examples img').attr('src','img/examples/' + current + '.jpg');
        set_examples_interval();
    });
}

// jQuery(document).ready(function() {
//     jQuery('#moya_forma form').submit(function() {
//         alert('ok');
//         var Name = jQuery("#Name").val();
//         var Phone = jQuery("#Phone").val();
//         var http = new XMLHttpRequest();
//         var url = "https://script.google.com/macros/s/AKfycbwRmUaAiaD0dWNuCP3qXLDklUTGU5wYFnudhVqr12Tz5mQSj90/exec";
//         var params = "p1="+Name+"&p2="+Phone;
//         http.open("GET", url+"?"+params, true);
//         http.onreadystatechange = function() {
//             if(http.readyState == 4 && http.status == 200) {
//                 alert(http.responseText);
//             }
//         }
//         http.send(null);
//     });
// });