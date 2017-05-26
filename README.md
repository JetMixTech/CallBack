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
            disableFloatButton: true
        };
        var callBack = new JMCallBack(callBackConfig);
    }());
</script>
```
## Configure
| Name                    | Type    | Description                                      | Required | Default
| ----------------------- | ------- | ------------------------------------------------ | -------- | ------------
| companyName             | String  | Company name                                     | yes      |
| companyMail             | String  | Company email for sending                        | yes      |
| companySite             | String  | Company site for email                           | yes      |
| companyPhone            | String  | Company phone for callback                       | yes      |
| theme                   | String  | Theme for button styles (winter, summer, autumn) | no       | winter
| sendToTMService.enabled | Boolean | Enabled send to TM service                       | no       | false
| sendToTMService.token   | String  | JSON web token                                   | no       | null
| triggerBy               | String  | CSS Selector for open modal by click at them     | no       |
| disableFloatButton      | Boolean | Disable float button                             | no       | false
| textBoard               | String  | Custom text at left side                         | no       | Мы готовы ответить на любые ваши технические вопросы по телефону:
| title                   | String  | Custom form title                                | no       | Укажите ваши контакты и наш звонок не заставит себя ждать

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
