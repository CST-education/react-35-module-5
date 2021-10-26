# LESSON 7

## URL

origin - protocol + host
pathname - path + parameter
query string - ?key1=value1&key2=value2
hash - #contacts

## History

Browser History - HTML5 History API
Hash history - для старых браузеров
Memory History

## Routing

`npm i react-router-dom`

1. маршрутизатор: BrowserRouter
   `import { BrowserRouter } from 'react-router-dom'`
   оборачиваем в компонент маршрутизатора компонент всего приложения в корневом файле index.js для отслеживания адресной строки и обеспечения переходов между страницами

2. навигация: Link, NavLink (как Link, но с доп. пропсом activeClassName, в кот. можно передать селектор со стилями, когда ссылка активна)
   для каждой отдельной страницы создаем компонент маршрута и передаем ему следующие пропсы:

- to -
- exact - указывает на точное совпадение пути
  не пергружает страницу, а добавляет запись о переходе в историю

3. маршруты: Route, Redirect, Switch,
   `import { Route } from 'react-router-dom'`
   для каждой отдельной страницы создаем компонент маршрута и передаем ему следующие пропсы:

- path - строка, должна совпадать с пропсом to соответствующей ссылки
- exact - по умолчанию true, отрендерит компонент указанный в пропсе component, если значение пропса path и location.pathname совпадает
- component -

## useRouteMatch

```
const match = useRouteMatch()
console.log(match) // {url: "", path: ""}
<Link to={`${match.url}/${id}`}>link</Link>
```

чтобы рендерить раут отдельной страницы продукта, нужно установить exact
для раута страницы всех продуктов, а рауту отдельной страницы указать динамический параметр продукта

```
<Route path="products/:productId"/>
```

Вложенные маршруты и навигация (то, что рендерится на этой же текущей странице)

```
<Route path={`${match.path}/:productId`}/>
```

## useParams

```
const params = useParams()
console.log(params) // {productId: ""}

```