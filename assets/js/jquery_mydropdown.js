$('.mydropdown').click(function(event) {
    /* Act on the event */
    $('#' + $(this).attr('dropdown')).fadeIn('fast');
});
$('.mydropcon').mouseleave(function() {
    $(this).fadeOut('fast');
});
