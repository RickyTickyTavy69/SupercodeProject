1. Установил пак config, чтобы добавить важные переменные туда.

Чтобы одновременно запустить фронт и бэкэнд на этапе продукции нужно создать скрипт на бэкэнде, который
будет запускать фронтэнд. это делается через команду --prefix client;

2. "client" : "npm run start --prefix client";

3. далее используется пакет concurrently, чтобы связать back и frontend.

4. hook useEffect - принимает в себя колбэк функцию и массив зависимостей. Без зависимостей он будет запускаться
каждый раз, когда перерендеривается компонент, а он это делает при каждом изменении на странице.

Если передать в useEffect пустой массив зависимостей, то он будет вызываться каждый раз, при первом рендере
компонента, т.е. при загрузке страницы, но уже не будет перезапускаться при изменении контента страницы.

Если же в массив зависимостей передать какой либо стейт или переменную, то useEffect будет вызываться, при
изменении этого стейта или переменной.

...

чтобы настроить роутинг, надо установить react-router-dom отдельно как пакет. (npm i react-router-dom);
потом надо создать jsx код, но с тегами <Route /> для роутинга, в которые передаётся компонент, на который будет вести
этот роутер. Этот компонент можно передать разными способами и результат будет немного отличаться.
<>
    <Route />
    <Route />
    <Route />
</>;

роутинг всегда нужно оборачивать в тег роутинга специальный. Есть например <BrowserRouter>, можно использовать
этот компонент, который так же надо импортировать. В него надо обернуть все теги роутинга. <Route />

/// ROUTING МАРШРУТИЗАЦИЯ

если использовать прошлую версию роутера "react-router-dom@5.2.0", то нужно создавать приложение React
как в React 17. Если его создавать как в 18 версии, то нужен router v6.

Что касается хука useContext, важно помнить, что в <Context.Provier value={{}}>, передвавемое в value значение
должно быть объектом, с ключем и значением, поэтому там должно быть две пары скобок, а также если я напишу туда
просто переменную функции fuction, то объект, который я передаю будет выглядеть вот так {function: function}.

//Аутентификация

в том компоненте реакта, в котором находится форма, которую нужно отправлять через запрос на сервер, нужно создать
стейты через useState, которые нужно менять через обработчик событий onChange. Он не принимает ничего.
Я обращаюсь внутри этой функции к event.target.name и event.target.value. Это аргумент name и то, что было введено в
поле Input. Функция onChange не вызывается через колбэк а просто записывается как референс.

лучше всего создать отдельный модуль, или если в реакт - то отдельный хук, который будет возвращать функцию, делающую
запрос на сервер. Для того, чтобы отправить запрос, можно воспользоваться классом, который встроен в JS.

// const xhr = new XMLHttpRequest();        // xhr является объектом от класса XMLHttpRequest.
// xhr.open()                            // теперь у этого объекта есть метод open.                  

// Аутентификация второй вариант - fetch().

как настроить и главные ошибки, которые были:

1) создать отдельный хук, который будет возвращать функцию, которая в свою очередь производит запрос на сервер.
лучше делать через функцию fetch, так как так проще и короче.

2) функция fetch принимает два аргумента: url и объект со значениями method, body и headers.

fetch(url, {
method,
body: JSON.stringify(body),
headers: headers
});

body - это объект, содержащий данные пользователя. Его необходимо превратить в формат JSON c помощью
JSON.stringify, так как по сети летать данные могут только в формате строки. Также в headers нужно указать
"Content-Type": "application/json", так как это не какая то строка, а именно JSON.

// принятие запроса на серверном скрипте.

фронт и бек обычно работают на разных портах, реакт по умолчанию на 3000, а серверный скрипт на порту, который будет на
том сервере, где я его загружу. А на локальном тот, который я указал в главном скрипте.
Поэтому, чтобы запросы с фронта приходили на нужный роут в бэкенде, надо их переадрессовывать. Для этого нужно
написать в package.json на в серверной корневой папке правило:
"proxy": "http://localhost:5000", лучше писать после scripts.

Если proxy выдаёт ошибку (can not proxy), то скорее всего ошибка в роутах на серверном скрипте.
Чтобы читать запросы из req.body на серверных роутах, нужно в первую очередь добавить bodyParser перед подключением
роутеров на базовом файле в бэкенде:

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());


// создание Моделей для базы mongoDB с помощью mongoose.

создаётся объект с помощью класса Schema и потом создаётся класс/модель из него с помощью функции. Например:

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  }
})

Типы указываются именно какие есть в JS то есть String, Object и.т.д. Обязательные параметры указываются как
required: true, в отличии от типизации аргументов в компонентах реакта, где это isRequired: true.
unique: true - означает, что это значение должно быть уникальное у каждого пользователя.

/////////////// в объектах кстати есть оператор delete, удаляющий один определённый ключ. Например delete body.id удаляет ключ id в body. ///////

... тут можно что то ещё дописать ...


/////////////////////////////////////////////////////////////АВТОРИЗАЦИЯ НА САЙТЕ/////////////////////////////////////////////////////////////

Есть несколько видов авторизации. JWT токены это один из них. Есть следующие виды авторизации на сайтах:

// Сессии
- Сессии. Сессии хранятся в cookies, куда их кладёт сервер при успешной авторизации и каждый раз браузер отправляет их на сервер при каждом запросе.
- в основном они используются на сервер-сайд сайтах. Т. е. сайтах, где есть только серверный скрипт, как в случае сайта на node.js express и
handlebars. И на многостраничных сайтах. (например приложение на React является одностраничным, и сейчас в тренде одностораничные сайты, но есть и другие
варианты),
- сложно использовать для публичных api. (что это такое?).

При использовании Сессии, браузер отправляет логин и пароль на сервер, где на сервере формируется сессия и куки. Куки и id сессии отправляются в браузер
и при каждом следующем запросе на сервер, браузер передаёт куки вместе с запросом.

// Токены
- метод с Сессиями уже немного устарел и на его место пришли токены.
- они испльзуются в публичных api
- очень удобны для микросервисной архитектуры (что это?). Когда один и тот же аккаунт используется в разных веб приложениях, как в случае с google.
у которого есть много других микросервисов, таких как ютуб или gmail. Т.е авторизация происходит на одном сервисе, и другие сервисы видят, что пользователь
авторизован.
- в токен добавляется обычно какая то подпись сервера, чтобы он мог потом определить, что именно он создал этот токен.
- так же хранится информация о пользователе, который авторизовался. Как правило минимальная информация, чтобы сервер знал, какой пользователь
авторизовался.
- в браузерах токены обычно хранятся в в DOM хранилищах : sessionStorage/localStorage, либо же в куки.
хранение в DOM хранилищах не очень безопасно, потому что вредоносный код из например плагинов в браузере может украсть информацию из этого токена.
Но это решается короткой жизнью токена и разделением токена на два токена.
В этом случае один токен отвечает за обновление данных, а другой за доступ к данным. Короткое время жизни у того токена, что отвечает за доступ.


При использовании JWT токена, после авторизации на сервере создаётся токен с секретныи словом, который отправляется обратно браузеру. Там он сохраняется и отправляется
так же с каждым запросом, сервер проверяет секретное слово, подпись и выдаёт нужную информацию.

есть разные виды токенов, но основной и чаще всего используемый это JWT Token = Json Web Token;

в JWT токене данные передаются не зашифрованые, они передаются в формате base64, который достаточно просто
расшифровать, но зато их нельзя переиспользовать, так как они защищены секретной подписью, без которой не
возможно использовать этот токен, а подпись зашифрована.

JWT токен делится на 3 части. В первой записаны тип и алгоритм токена, во второй данные о пользователе а в
а в третьем секретная подпись.

всё это выглядит как одна строка, разделённая точками, примерно так:

alfjsdhf.slado38fdsl.lslKGGKdll

Сигнатура в jwt token создайтся с помощью секретного ключа, который создайт бэкендер и заголовка jwt с алгоритмом.

Acess token хранится обычно в localStorage, а refresh token хранится в httpOnly cookie.


///////////////////////////////////////////// практика

чтобы сделать авторизацию с помощью jwt token, необходимо для начала установить нужные пакеты.
npm i express
npm i cors                // нужен, чтобы отправлять запросы с браузера.
npm i cookie-parser

npm i nodemon --save-dev   // нужен для авто обновления сервера при изменениях. --save-dev нужно, чтобы
этот пакет установился в dev dependencies.

npm i dotenv    // этот пакет нужен для конфигурации, такой же как config, в котором хранятся разные переменные,
используемые в проекте. Так как у меня есть config, я его не использовал.

1) необходимо создать отдельную модель для токена, такую же как и для пользователя.

2) для пользователя добавил два новых свойства:
  isActivated: {
    type: Boolean,                        // активировал ли пользователь свой аккаунт
    default: false,
  },
  activationLink: {                       // ссылка, по который аккаунт активируется, не обязательная
    type: String,
  },
　
3) в модели для токена будет храниться refreshToken как String и user с типом Schema.Types.ObjectId и отсылкой
на юзера ref "User"

////// это мне надо по хорошему ещё попытаться точно понять, как оно работает. Так как пока я не совсем понял.

4) в роутинг на сервере я добавил ещё несколько эндпоинтов, кроме login и register ещё "/logout",
"/activate:link" - для активации аккаунта по ссылке
"/refresh" - для обновление access токена И
"/users" - тестовый эндпоинт, дающий список пользователей (доступен только для авторизованых);

5) у меня в начале функции, которые срабатываю при определённом запросе на бэкенд, были в файле роутера после
адресса. Но на видео Ulbi.tv, он их абстрахировал и создал для них отдельную папку, которую назвал controllers

////////////////!!! ЭТО ОЧЕНЬ ИНТЕРЕСНАЯ РЕАЛИЗАЦИЯ !!!///////////////////////

так как в папке controllers он создал файл user.controller.js, в котором создал класс, у которого в свою
очередь создал методы для каждого роута, которые он может вызывать, т.е. async registration и т д.
и экспортировал объект от этого класса через new, потом функции, как методы этого оъекта вызываются в роутинге.


И так же определённую функциональность касающуюся юзеров, т.е. функции, которые вызываются в контроллерах, он так же
ещё раз абстрахировал в файле user-service.js, все функции, которые касаются работы с пользовательми. Создание, поиск, удаление и.т.д.
Так же теперь есть файлы mail-service, token-service для работы с токенами и отправки емэйла активации.

/// Это кстати, отличный пример объектно ориентированного стиля программирования, я думаю, т.е. абстракция
части кода с помщью создания отдельного модуля/файла с классом, в котором есть нужные функции и потом вызывать
эти функции, обращаясь к инстансу этого класса. Object.method().

Теперь нужно установить ещё несколько пакетов:

npm i jsonwebtoken     // Для создания веб токена
npm i bcrypt           // для зашифровки пароля
npm i uuid            // для создания своего id или генерации рандомных строк, например для ссылки активации.

пароль не рекомендуется хранить в начальном виде в базе данных, поэтому пароль хэшируется т.е. шифруется.
Для этого можно использовать пакет bcrypt. Процесс очень простой.

const hashPassword = await bcrypt.hash(password, 3);        асинхронное хэширования пароля, с помощью bcrypt.hash(password, 3)
const user = new User({ email, password: hashPassword });   в функцию так же передаётся какое то рандомное число, после этого

в класс User так же передаётся уже захешированый пароль.

Отличие между хешированием и шифрованием в основном в том, что захешированый пароль невозможно уже расхешировать
обратно. Но если тот же самый пароль захешированый ещё раз то результат будет тот же самый, так можно сверить пароли
по этому такой вариант более безопасный.

Так же с помощью пакера uuid создаётся специальная ссылка, по которой пользователь будет активировать аккаунт.
const activationLink = uuid.v4();
Она сохраняется с другими данными вместе, в базу данных в модель пользователя.

Можно так же использовать захешированый пароль как ссылку для активации, так тоже можно.

...









Для того, чтобы отправить пользователю сайта email, нужен пакет для Node.js - nodemailer. В большинстве случаев используется
именно этот пакет.
Если я подсоединяюсь с помощью пароля для приложения в gmail, То должно быть обязательно
secure: true
и пароль должен быть не от email а тот, что специально генерируется для smtp приложений.

// обработка ошибок с помощью расширения дефолтного класса Error.

нужно создать новый файл в котором будет класс, который расширяет существующий в JS по дефолту класс Error.

export default class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }
}

- он имеет статичные методы, которые возвращают инстансы его же, только с разными параметрами, т.е объект с ключами
и значениями, зависимыми от типа ошибки.
Так же создаётся middleware, который принимает объект ошибки, созданный с помощью class ApiError и передаёт его вместе
с указаным статусом на фронтенд через res.status().json().

- в главном файле подключается этот middleware
app.use(errorMiddleware);

//// в подключеный таким образом middleware можно передать ошибку поместив её в функцию next(), которую принимает,
как параметр функция, обрабатывающая запрос на сервер. Например: 

async login(req, res, next) {
    try {
    } catch (error) {
      next(e);
    }
  }
}

потом этот middleware отправляет ту ошибку со статусом ошибки (Http кодом) в ту функцию, где был вызван middleware.



/////////////////////////////////////////////////////Валидация//////////////////////////////////////////////////

При написании логина и регистрации необходимо валидировать данные, приходящие с фронтенда. Для этого можно использовать
пакет express-validator.

валидация настраивается в файле роутинга, auth.routes.js. Валидаторы помещаются между адресом запроса и функцией, которая
выполняется по этому запросу.
из express-validator нужно достать функцию body. Эта функция вызывается вместе с названием той переменной из req.body, которая валидируется
к этой функции добавляется метод валидации, через точку. Например:

import { body } from "express-validator";

router.post(
  "/register",
  body("email").isEmail(),                              // проверяет, является ли переменная "email" в body емэйлом.
  body("password").isLength({ min: 3, max: 32 }),       // проверяет, укладывается ли пароль в заданную длину.
  Usercontroller.register
);

///////////////////////////////////////////////////////////LOGIN//////////////////////////////////////////////////////////////////////////

....


///////////////////////////пока не могу затестить точно функцию логаута, т.к. надо прописать на бекэнде пост запрос logout

....


//////////////////////////////////REFRESH//////////////////////////////////////////////////////////////////////

не знаю пока точно, когда вызывается функция refresh. Когда истекает время жизни access token?

Функция вызывается по get запросу "/refresh";

Сначала refreshToken достаётся из req.cookies.
const { refreshToken } = req.cookies;
т.е. в req.cookies всегда есть cookie получается? Я передаю их при логине в res.cookie, а для обновления при запросе
достаю из res.cookies.

в Usercontroller по запросу refresh вызывается функция refresh у user-service, которая принимает refreshToken.
она возвращает в Usercontroller userData, которая содержит токены. В res.cookie() передаётся refreshToken, а в
res.json() передаются оба токена.

в функции refresh сначала проверяется токен, если он null или undefined if(!refreshToken),
то выбрасывается ошибка с помощью класса ApiError, UnauthorizedError. Так как если токена нет, то пользователь не авторизован.

Он создал потом две функции в token-service, для валидации AccessToken и RefreshToken:

validateAccessToken(token) {
  try {
      const userData = jwt.verify(token, config.get("JWT_ACCESS_SECRET"));
  } catch (error) {}
}

метод возвращает тот объект userData, с помощью которого создавался jwtToken.

и, после этого с помощью его создаются снова новые токены как в методе логин.

////////////////////////////////////////////////////GET USERS //////////////////////////////////////////////

метод возвращает всех пользователей из базы данных. Для этого был написан ещё один Middleware.

//// Например error-middleware, который подключается в главном файле, является функцией, которая передаётся в
функцию next() в запросе, поэтому он сам так же является функцией, которая принимает параметры req, res, next.

!!!!!!! Функция next() вызывает следующий в цепочке middleware!!!!! вот поэтому, когда что то передаётся в функцию
next, попадает в middleware, подключенный в главном файле проекта.


Для того чтобы сделать запрос доступным только авторизованным пользователям или как то изменить ответ в зависимости
от авторизации, необходимио к запросу прикрепить токен.
Это делается с помощью Headers - заголовков http запроса.

Обычно токен указывают в заголовке "Authorization":

Authorization: "Bearer ${ACCESS_TOKEN}";
сначала указывается тип токена, обычно Bearer, а потом сам токен.

в middleware из headers достаётся authorization, и потом из этой строки берётся вторая половина, т.е. сам токен.

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split('')[1];

потом он валидируется, в req.user передаётся userData и вызывается следующий middleware через next.

этот middleware помещается после запроса, который должен быть доступен только авторизованым.



///////////// Фронтэнд

на видео уроке он развернул react приложение с помощью команды включающей typescript

npx create-react-app my-app --template typescript

т.е в его приложении есть темплейт с использованием TS.

но он сказал, что не так это важно, главное понимать суть.

он поставил пакет mobx и mobx-react-lite

mobx нужен для управления состоянием, а mobx-react-lite для управления им в функциональных компонентах.

// npm i mobx mobx-react-lite

так же он поставил axios, для асинхронных запросов к серверу и для него поставил так же типы.

// npm i axios @types/axios

он создаёт interceptor с помощью axios, который есть для запросов и для ответов.
Для запросов он должен прикрепить к каждому запросу в headers {Authorization: "Bearer ${ACCESS_TOKEN}"} и добавить туда access token, который я получаю
с сервера, когда логинюсь на сайте.

Это нужно, чтобы каждый раз не цеплять этот header вручную.

А для ответов, приходящих с сервера он смотрит, какой http код содержит ответ. Если код 401, значит пользователь не авторизован. А пользователь не авторизован,
когда истёк срок действия его jwt access токена. Access token "умирает" (например) каждые 15 минут, но для этого есть refreshtoken, с помощью которого
можно обновить access token.

Так же есть эндпоинт refresh, который принимает refreshToken и по нему перезаписывает оба токена, если refreshToken есть.

После этого повторяется исходный запрос (тот, который вызвал ответ с кодом 401), но уже с новым access токеном. Тогда пользователь снова считается авторизованым.

////////////////////!!!!!! Получение данных на фронте, с сервера !!!!!!!!!!!!!/////////////////////////

я долго думал, как получить данные на фронте, которые были отправлены через res.json(), Но на самом деле надо было всего
лишь написать await и обработаь ответ с помощью такой же функции data.json().
await получается равносильно записи с .then().

const data = await sendRequest("POST", url, body); 
const dataJson = await data.json();


/////////////////////////ещё одна проблема, с которой я столкнулся, это то что я не могу отправить одновременно или
один за другим запросы res.redirect("/") и res.json(). Так как оба эти запросы отправляют headers на клиент, но
когда один из них уже отправил хэдеры, другой не может отправить их повторно. Но что делать, если после логина я хочу
перенаправить пользователя на другую страницу и так же отправить какие то данные, например токены на клиент?

Один из советов: добавить эту информацию как query параметры в url, на который происходит redirect, после чего
достать их на фронтэнде. Но тут проблема, если информация большая то ссылка будет слишком длинная. Как быть тогда?
Можно ли сделать редирект уже на реакте?

>>>> можно, есть тег Redirect, который можно возвращать из компонента как и любой другой jsx, и в нём пишется ссылка, куда направляется редирект.
Так же можно добавить условие, и возвращать редирект только в определённых случиях.


///////////////////////////////////////////////ПРОБЛЕМА С РЕНДЕРИНГОМ ПОСЛЕ РЕДИРЕКТА/////////////////////////////////////////////////////////////

я столкнулся с такой проблемой, что после вызова функции в одном компоненте, которая изменяет данные в базе данных и последующего редиректа на
другую страницу, на которой выводятся эти изменения или они как то влияют на выводимый контент, у меня не видны были изменения сразу.

Т.е. например компонент - форма логина, которая заполняется и после нажатия на кнопку логин, выполняется редирект на главую страницу, где в навигации
больше не должно быть пункта "Логин", а зато должна быть ссылка на аккаунт.

Или страница, где пользователь добавляет какую либо информацию, например какое то сообщение, после чего редирект на страницу, где оно должно быть выведено.
Т.е. при вводе информация добавляется в бд к уже существующей, а при редиректе идёт запрос на сервер уже на следующей странице и там выводится содержание с сервера.

Тут в обоих случаях должна при редиректе быть изменена информация на странице, на которую происходит редирект. Как сделать, чтобы при редиректе были
сразу видны изменения?

1) Первый способ - создание хука и передача функций и переменных из него через Context в другие компоненты. То есть:

- создаётся новый хук, содержит функцию и стейт, функция делает запрос на сервер, меняет там инфу и меняет стейт.
- функция и стейт достаются из хука на компоненте, на который после выполнения будет редирект и через контехт передаются в компонент, где она вызывается.
Напримент, компонент - форма логина.
- функция вызывается и она менчет стейт, который был передан через контекст из компонента, где его забрали из хука и передали в контекст, поэтому этот
стейт меняется и в том компоненте.
- когда происходит переадрессация, я могу проследить стейт из хука и вывести с помощью него другой контент на страницу.


2) Второй способ - отслеживание в useEffect по url:

- Та функция, которая должна обратится к серверу, получить изменённые данные и вывести их на страницу, 
на которую идёт переадрессация, находится на этой странице.
- я передаю специальные параметры как динамичные параметры url, когда делаю переадрессацию. Потом отслеживаю изменение этих параметров в useEffect,
получая их из useParams.
- как только params меняются, запускается useEffect, которая делает запрос на сервер и получает данные, которые выводятся на страницу, так как после
изменения данных происходит ре-рендер.


//////////////////////////////////////////////////РАБОТА С JWT НА СТОРОНЕ КЛИЕНТА////////////////////////////////////////////////////////////////////

- JWT токен передаётся на клиент с сервера, где он создаётся и содержит информацию о конкретном пользователе, который авторизован в данный момент.
- Клиенты могут использовать токен при взаимодействии с API, отправляя его как Html заголовок (header).
- Для большей безопасности jwt token содержит ещё и подпись, созданную тем сервером, который его создал. Это не даст другому клиенту создать токен, имея
данные пользователя и использовать его для взлома аккаунта. При получение токена в headers с клиента, сервер всегда проверяет подлинность этого токена,
сверяя подпись на токине.
- так же, на случай, если вор украдёт jwt token с подписью с клиента, у токенов всегда есть срок жизни, который обычно не превышает 15 мин. По истечению
15 мин, токен становится недействительным.
- Поэтому важно НЕ хранить токен на клиенте, в куки или локальном хранилище. Потому что таким образом приложение становится уязвимым для CSRF или XSS
атак, с помощью которых можно украсть токен с клиента.
- jwt token использует метод кодирования base64, это метод кодирования использует только 64 символа ASCII.
- в том туториале, который я сейчас читаю написано, что один из токенов нужно хранить не в cookie или localStorage, а в памяти, а другой в localStorage.
Токен, который хранится на клиенте в localStorage называется токен обновления.
- чтобы обеспечить большую безопасность, токен обновления отправляется с помощью куки httpOnly.
- получается, что токен обновления хранится в куки httpOnly и также в localStorage на клиенте одновременно, а обычный (AccessToken?) хранится в памяти.
/////на серверном API я по запросу login передаю сначала refreshToken в res.cookie(), а потом уже return res.json() со всеми данными.
Обратный отсчёт до обновления токена начинается с момента передачи обоих токенов на клиент, данные о сроке действия токена хранятся в каждом из них по
ключу "expiresIn".

- когда приходит время обновления токена, refreshToken в куки htmlOnly передаётся на API "refresh", где происходит феривикация токена и сервер генирирует
новые токены с новым временем действия, т.е. совершает login заново.
- таким образом, по истечению срока jwt токена, он обновляется автома 


/////////// В туториале от Владилена, как это происходит://////////////////////////////

- функция login() из хука useAuth принимает userId и jwtToken, назначает их в стейты, созданные зарание.
- так же token и userId добавляется в localStorage, в объекте, в формате json.
localStorage.setItem("userData", JSON.stringify({ userId, token }));

///// функция login и logout находятся в одном и том же хуке useAuth.

- функция logout очищает стейты, ставя их на Null, и убирает userData из localStorage
setToken(null);
setUserId(null);
localStorage.removeItem("userData");

так же он добавил хук useEffect, который следит за тем, есть ли в localStorage уже добавленные token и userId.
Если есть то они забираются из localStorage и добавляются в стейты.
Это можно сделать, хоть мне это бы не пришло в голову, я думаю.

Хук является функцией, которую я вызываю, чтобы оттуда забрать переменные, которые каждый раз при вызове хука создаются
заново.
Поэтому, если я создам useState внутри хука, то он будет срабатывать каждый раз при вызове хука.

Так же он обернул login и logout в useCallback, но я это пока не сделал, чтобы посмотреть, что будет буз него.
Т.к. я пока не совсем хорошо понял, как работает этот хук.

//////!!! У меня до этого было написанно немного криво: Я забирал token, userId из хука, где они так же добавляются
в localStorage и потом доставал ещё токен AccessToken из localStorage, и потом у меня было написано
token || AcessToken, потому что первый раз я проверял token, а при повторном вызове стейты чистятся и забираю пустые
стейты.

Таким образом я мог бы вообще не забирать эти стейты, а просто брать значение из localStorage.

///Но теперь я вижу как можно было написать всё гораздо лучше, в самом хуке есть useState, который при каждом запуске,
проверяет, есть ли в localStorage нужные данные, и если они есть - то добавляет их в стейты.

так же у меня в проекте, функция Logout() создана в компоненте AuthNavbar. Я могу её создать прямо в хуке useAuth и
потом передать в AuthNavbar через контекст.

/////!! также флаг isAuthenticated равняется !!token и он так же передаётся в Context.Provider

///// Так же isAuthenticated передаётся в компонент роутинга, который вызывается с этим параметром как функция и
возвращает jsx структуру. Эта jsx структура потом кладётся в return в фигурные скобки {navRouthes}.

таким образом тоже можно добавить переменную в компонент


////////////// у меня был рекурсивный рендеринг. Потому что:

- я создал в хуке функцию useEffect, которая имеет в зависимостях другую функцию, которую я из него забираю.
- потом необходимо в таком случае добавлять эту функцию в useCallback. Я это сделал, но не добавил зависимости,
а она без зависимостей не работает.
- поэтому теперь я знаю, что если в хуке есть useEffect, используйщий функцию из этого же хука, то необходимо
добавить функцию в useCallback и ОБЯЗАТЕЛЬНО добавить массив зависимостей, можно и пустой. [].

/////////////- если функция - хук что либо возвращает через return, то когда я достаю это что то, вызывая хук, то мне не надо при этом брать эту переменную
в фигурные скобки.


///////////////////////////////////ПРОБЛЕМА С SETSTATE////////////////////////////////////////////////////////////////

У меня была пробелма с тем что я вызывал функцию setState (setBox), она вызывалась, но стейт не менялся. Я решил это тем, что передавал в функцию ещё
prevstate. Не знаю точно почему, но prevState решил эту проблему.