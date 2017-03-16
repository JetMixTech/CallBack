# CallBack widget
CallBack modal widget

## Installation
```html
<script src="https://cdn.jetmix.su/callback/js/bundle.min.js"></script>
<script>
    (function () {
        var callBackConfig = {
            companyName: 'Another company',
            companyMail: 'faker@domain.com',
            companySite: 'Another.domain',
            companyPhone: '+7 (900) 00-00-00',
            sendToTMService: {
                enabled: false,
                token: null
            },
            theme: 'winter',
            triggerBy: '.js-callback',
            enableFloatButton: false
        };
        var callBack = new JMCallBack(callBackConfig);
    }());
</script>
```
## Configure
### Required props:
* companyName
* companyMail
* companySite
* companyPhone

### Other props:
* sendToTMService
  * enabled: true | false (enabled send to TM service)
  * token: JSON web token (if last option is enabled then needed token)
* theme: winter | summer | autumn (button styles)
* triggerBy: CSS Selector (open modal by click at them)
* enableFloatButton: true | false (enable float button)

## Development
```shell
$ npm i
$ npm run dev
```
This will start server with watch mode at localhost and 8080 port

## Linting
```shell
$ npm run lint
```

## Building
```shell
$ npm i
$ npm run prod
```
At this point, you should have a build folder with the compiled files


## License
MIT - https://opensource.org/licenses/mit-license.php
