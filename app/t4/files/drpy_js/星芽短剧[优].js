var rule = {
    类型: '影视',
    title: '星芽短剧[优]',
    host: 'https://app.whjzjx.cn',
    url: '/cloud/v2/theater/home_page?theater_class_id=fyclass&type=fyclass&class2_ids=0&page_num=fypage&page_size=24',
    searchUrl: '/v3/search',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'okhttp/4.10.0',
        'x-app-id': '7',
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjE4MjU0NjQsIlVzZXJJZCI6NTA5MDg3NDEsInJlZ2lzdGVyX3RpbWUiOiIyMDI0LTA3LTA5IDIwOjUwOjIxIiwiaXNfbW9iaWxlX2JpbmQiOmZhbHNlfQ.VllcrcGmVc8vPMJ8xOIfiq-87qmIGD1JeMRrayXMgts',
        'platform': '1',
        'manufacturer': 'realme',
        'version_name': '3.0.0.1',
        'user_agent': 'Mozilla/5.0 (Linux; Android 9; RMX1931 Build/PQ3A.190605.05081124; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36',
        'dev_token': 'BqU-Xm_tyKyrlzdfLCIiSZUEPxDbJ5wsZ6ajiltu77EF0SdTdyyXi0oZRHnZEicMFF2SalGVmz1p5kc9YooTR_DkCGIttK_DQjmfvICY2mUqUPzUWn7bQl6AsaQMO57BvemcXtn9BJib1BjZ-1sx9N9k-wtJJX80_A5-PeKO0YyU*',
        'app_version': '3.0.0.1',
        'device_platform': 'android',
        'personalized_recommend_status': '1',
        'device_type': 'RMX1931',
        'device_brand': 'realme',
        'os_version': '9',
        'channel': 'default',
        'raw_channel': 'default',
        'oaid': '',
        'msa_oaid': '',
        'uuid': 'randomUUID_a8f870fe-d890-4a10-9e85-05d90d41d731',
        'device_id': '24250683a3bdb3f118dff25ba4b1cba1a',
        'ab_id': ''
    },
    timeout: 5000,
    class_name: '剧场&热播剧&星选好剧&新剧&阳光剧场',
    class_url: '1&2&7&3&5',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {url: input, parse: 0}
    }),
    double: true,
    一级: $js.toString(() => {
        let d = [];
        let html = request(input);
        let data = JSON.parse(html).data.list;
        data.forEach(it => {
            let id = 'https://app.whjzjx.cn/v2/theater_parent/detail?theater_parent_id=' + it.theater.id;
            d.push({
                url: id,
                title: it.theater.title,
                img: it.theater.cover_url,
                desc: it.theater.theme,
            })
        })
        setResult(d);
    }),
    二级: $js.toString(() => {
        let urls = [];
        let html = request(input);
        let data = JSON.parse(html).data;
        data.theaters.forEach(it => {
            urls.push(it.num + '$' + it.son_video_url);
        })
        VOD = {
            vod_name: data.title,
            vod_pic: data.cover_url,
            vod_play_from: '球球啦',
            vod_play_url: urls.join('#')
        };
    }),
    搜索: $js.toString(() => {
        let d = [];
        let html = post(input, {body: {"text": KEY}})
        let list = JSON.parse(html).data.theater.search_data;
        list.forEach(it => {
            let id = 'https://app.whjzjx.cn/v2/theater_parent/detail?theater_parent_id=' + it.id;
            d.push({
                url: id,
                title: it.title,
                img: it.cover_url,
                content: it.introduction,
            })
        })
        setResult(d);
    }),
}