# Adding a page

## Create page module

New pages should be added in this folder `/server/src/pages/`. Independent pages should be added as new modules or folders directly in `pages/`. `pages/Landing/` and `pages/Home.example.js` can be referenced as examples for basic page setup.

Pages should export a single async function, which is passed `(req, res)`. Usually you will only need the `req` argument, since rendering is handled by `req.context.render()`.

`req` and `res` are the regular Express/http objects. `req` additionally has a `context` property which contains most of the functionality you need for dynamic pages.

`req.context`:
```js
{
  services,
  appSchema,
  addDebugData,
  render,
}
```

- `services` contains the functions you use to get data from the model.
- `appSchema` is a reference to the object exported by `pages/index`.
- `addDebugData` should be used to log important events.
  - `addDebugData` can be passed an object `addDebugData({ req, label, data })`, where `req` is the Express `req` object, `label` is a string which will label the event, and `data` can be any serializable (via `JSON.stringify()`) value which would be helpful with debugging. Alternatively, you can pass a function to `addDebugData`, like `addDebugData(() => [req, label, data])`, where the three array items are the same values as above. Passing a function allows you to do development-only computations to create `data`. The function will only be called when the app is in development mode.
- `render` is a React rendered response function.
  - `render` is passed an object with `{ title, element, ?stylesheets, ?scripts }`. `title` is a string title which will be used in the html head. `element` is a React element (reference how the example pages pass it.). `stylesheets` and `scripts` are both optional array arguments which should be URL paths to stylesheets or scripts. Additionally, you may pass full `<link>` element strings in the `stylesheets` array.

All pages which call `req.context.render()` should wrap the element with `<Layout req={req}>...</Layout>`, like the example pages do. For shared components which need the `req` object, you can require the `pages/util/appContext` file to get a React context Consumer (or HoC which uses the same Consumer) which is passed the `req` object as it's value by Layout.

## Adding the page to routing

To add a page to routing (and primary navigation where necessary), add an entry in the `pages` array in `src/pages/index.js`.

The entry can include these properties:
```js
{
  primary: true,
  path: <string>,
  label: <string>,
  route: require('<pathToPage>'),
},
```
- If `primary` is true, then the entry will be included in the primary navigation in Header and Footer.
- `path` (required) should be a string path which will be used to create the Express route, and will be used for the navigation link.
- `label` (required) will be used for the navigation link text, and to reference the route for debugging.
- `route` should be the `require()` call to get the page module. Technically, it just needs to be an async function which takes `req, res`.

`primary` or `route` must be included, or the entry will be ignored.

If `route` is omitted, a nav entry will be created, but no Express route. If `primary` is omitted, no navigation entry will be created.

## Assets and styles

### Stylesheets

Stylesheets should be `.scss` files next to the module which uses them. Stylesheets are compiled with css-modules when you `require()` them. When the project builds, all styles are compiled and concatentated into a single sheet in `/server/css/`. This stylesheet is served by the Express app, and included in all pages.

A single shared scss file can be used for common theme variables and mixins, and should be `/server/src/pages/styleVariables.scss`. Additional shared scss variable and mixin files should be placed in `/server/src/pages/styles/`. Shared style variable files should not have any styles directly defined, and should only include variables, mixins, functions, or other code which does not itself output any css styles. This is because any shared scss files may be used multiple times.

### Assets

To include image assets, you copy/move the image file to `/server/assets/images/` or a sub folder, which is served statically at the absolute path `/assets/images`.

The `/server/assets` folder is served statically as a whole, so you can also place other types of assets (e.g., fonts) in it as well, to be referenced by the same absolute path `/assets`.
