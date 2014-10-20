<script type="text/javascript" src="path/to/instafeed.min.js"></script>

<script type="text/javascript">
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'hashtag',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'thumbnail',
        sortBy: 'most-recent'
    });
    feed.run();
</script>
