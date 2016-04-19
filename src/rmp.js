var options = {
    timeout: true
};


function notification(url) {
    var height = '50px';
    var $div = $('<div />').css({
        backgroundColor: '#E2CB77',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: height,
        width: '100%',
        margin: 0,
        padding: '10px',
        boxSizing: 'border-box'
    });

    var questionMark = url.indexOf('?'),
        formattedUrl = questionMark !== -1 ? url.substring(0, questionMark) + '...' : url;
    var content = $('<div />').html('This isn\'t the page you are looking for...Redirecting to&nbsp;<a href="' + url + '">' + formattedUrl + '</a>'),
        close = $('<div />').html('&times;'),
        timer = $('<div />');

    var css = {
        height: '100%',
        alignItems: 'center',
        display: 'flex'
    };
    content.css(css).css({
        float: 'left',
    });

    close.css(css).css({
        float: 'right',
        cursor: 'pointer'
    });

    timer.css(css).css({
        float: 'left'
    });

    $div.append(content).append(timer).append(close);

    $body = $('body');
    $body.append($div);

    var bodyCss =  $body.css(['margin-top', 'position']);
    $body.css({
        'margin-top': height,
        'position': 'static'
    });

    if (options.timeout) {
        var limit = 3;
        var interval = window.setInterval(function () {
            timer.html('&nbsp;in&nbsp;' + limit);
            limit -= 1;
            if (limit < 0) {
                window.location = url;
                window.clearInterval(interval);
            }
        }, 1000);
    }

    close.on('click', function() {
        window.clearInterval(interval);
        $div.remove();
        $body.css(bodyCss);
    });
}

var findLinks = {
    'www.designernews.co': function () {
        return $('h1[itemprop="name"] a');
    },
    'www.producthunt.com': function () {
        return $('a[target="_blank"]');
    },
    'www.datatau.com': function () {
        return $('.title > a');
    }
};

var domain = window.location.host,
    redirectTo = findLinks[domain];

if (redirectTo) {
    var url = redirectTo();
    if (url) {
        url = url.attr('href');
        if (url.startsWith('http')) {
            notification(url);
        }
    }
}
