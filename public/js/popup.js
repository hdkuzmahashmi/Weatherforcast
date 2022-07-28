/*global $, document*/
$(document).ready(function () {

    'use strict';

    var openPopupOne  = $('#openPopupOne'),
        overlay     = $('.overlay'),
        popup       = $('.popup'),
        closePopUpOne = $('#closePopUpOne'),

        openPopupTwo  = $('#openPopupTwo'),
        closePopUpTwo = $('#closePopUpTwo'),

        openPopupThree  = $('#openPopupThree'),
        closePopUpThree = $('#closePopUpThree'),

        openPopupFour   = $('#openPopupFour'),
        closePopUpFour = $('#closePopUpFour'),

        openPopupFive   = $('#openPopupFive'),
        closePopUpFive = $('#closePopUpFive');


   // main style action
    overlay.on('click', function () {
        $(this).fadeOut();
        popup.removeClass('oneOpen twoOpen threeOpen fourOpen fiveOpen').delay(700).promise().done(function () {
            $(this).hide();
        });
    });


    // first style action
    openPopupOne.on('click', function () {
        overlay.fadeIn();
        popup.show(0, function () {
            $(this).toggleClass('oneOpen');
        });
    });

    closePopUpOne.on('click', function () {
        overlay.fadeOut();
        popup.toggleClass('oneOpen').delay(700).promise().done(function () {
            $(this).hide();
        });
    });


   // Seconed Style action
    openPopupTwo.on('click', function () {
        overlay.fadeIn();
        popup.show(0, function () {
            $(this).toggleClass('twoOpen');
        });
    });

    closePopUpTwo.on('click', function () {
        overlay.fadeOut();
        popup.toggleClass('twoOpen').delay(600).promise().done(function () {
            $(this).hide();
        });
    });


   // Third Style action
    openPopupThree.on('click', function () {
        overlay.fadeIn();
        popup.show(0, function () {
            $(this).toggleClass('threeOpen');
        });
    });

    closePopUpThree.on('click', function () {
        overlay.fadeOut();
        popup.toggleClass('threeOpen').delay(800).promise().done(function () {
            $(this).hide();
        });
    });


   // Fourth Style action
    openPopupFour.on('click', function () {
        overlay.fadeIn();
        popup.show(0, function () {
            $(this).toggleClass('fourOpen');
        });
    });

    closePopUpFour.on('click', function () {
        overlay.fadeOut();
        popup.toggleClass('fourOpen').delay(500).promise().done(function () {
            $(this).hide();
        });
    });


   // Fourth Style action
    openPopupFive.on('click', function () {
        overlay.fadeIn();
        popup.show(0, function () {
            $(this).toggleClass('fiveOpen');
        });
    });

    closePopUpFive.on('click', function () {
        overlay.fadeOut();
        popup.toggleClass('fiveOpen').delay(500).promise().done(function () {
            $(this).hide();
        });
    });






});
