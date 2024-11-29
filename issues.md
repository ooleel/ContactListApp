1: Frontend: Edit screen fields are not editable
	Thu Nov 28 21:13:15 AUSEST 2024
		Open

2: Frontend: Edit screen → Save → error:
	Thu Nov 28 21:14:24 AUSEST 2024
```log 2.1
Uncaught ReferenceError: navigation is not defined
    handleSave \Repo\ContactListApp\ContactListApp\src\screens\AddEditContactScreen.js:36
    onClick \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\modules\usePressEvents\PressResponder.js:314
    React 22
    createRoot \Repo\ContactListApp\ContactListApp\node_modules\react-dom\client.js:12
    render \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\render\index.js:22
    renderApplication \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\AppRegistry\renderApplication.js:24
    run \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\AppRegistry\index.js:36
    runApplication \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\AppRegistry\index.js:74
    registerRootComponent \Repo\ContactListApp\ContactListApp\node_modules\expo\src\launch\registerRootComponent.tsx:52
    <anonymous> \Repo\ContactListApp\ContactListApp\index.js:8
    loadModuleImplementation \Repo\ContactListApp\ContactListApp\node_modules\metro-runtime\src\polyfills\require.js:278
    guardedLoadModule \Repo\ContactListApp\ContactListApp\node_modules\metro-runtime\src\polyfills\require.js:177
    metroRequire \Repo\ContactListApp\ContactListApp\node_modules\metro-runtime\src\polyfills\require.js:92
    <anonymous> index.bundle:77802
2 AddEditContactScreen.js:36:8
```
	When attempting to use the `save` button which should then go back, an error was thrown.
		Patch
			The navigation prop was not available for line `navigation.goBack(); //navigate back after saving` to work.
			Added the `let navigation = props.navigation` to ContactListApp/src/screens/AddEditContactScreen.js. Tested and now

3: Frontend Settings have no labels to explain what the 2 sliders, and one toggle does. 1 toggle does not toggle.
		Thu Nov 28 21:25:28 AUSEST 2024

4: Frontend settings `Save` does not save the settings.
		Thu Nov 28 21:26:08 AUSEST 2024

5: Frontend Contacts → `Add` → error "Uncaught TypeError: contact is undefined"
```log 5.1
Uncaught TypeError: contact is undefined
    AddEditContactScreen \Repo\ContactListApp\ContactListApp\src\screens\AddEditContactScreen.js:18
    React 4
AddEditContactScreen.js:18:9
    AddEditContactScreen \Repo\ContactListApp\ContactListApp\src\screens\AddEditContactScreen.js:18
    React 15
    setState \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useSyncState.js:24
    forEach self-hosted:157
    setState \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useSyncState.js:24
    setState \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useNavigationBuilder.js:191
    latestCallback \Repo\ContactListApp\ContactListApp\node_modules\use-latest-callback\lib\src\index.js:15
    onAction \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useOnAction.js:59
    dispatch \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useNavigationHelpers.js:26
    dispatch \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useNavigationCache.js:83
    useNavigationCache/cache.current</helpers</acc[name]/< \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useNavigationCache.js:111
    withStack \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useNavigationCache.js:97
    name \Repo\ContactListApp\ContactListApp\node_modules\@react-navigation\core\lib\module\useNavigationCache.js:109
    onPress \Repo\ContactListApp\ContactListApp\src\screens\ContactListScreen.js:55
    onClick \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\modules\usePressEvents\PressResponder.js:314
    React 19
    forEach self-hosted:4281
    React 3
    createRoot \Repo\ContactListApp\ContactListApp\node_modules\react-dom\client.js:12
    render \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\render\index.js:22
    renderApplication \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\AppRegistry\renderApplication.js:24
    run \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\AppRegistry\index.js:36
    runApplication \Repo\ContactListApp\ContactListApp\node_modules\react-native-web\dist\exports\AppRegistry\index.js:74
    registerRootComponent \Repo\ContactListApp\ContactListApp\node_modules\expo\src\launch\registerRootComponent.tsx:52
    <anonymous> \Repo\ContactListApp\ContactListApp\index.js:8
    loadModuleImplementation \Repo\ContactListApp\ContactListApp\node_modules\metro-runtime\src\polyfills\require.js:278
    guardedLoadModule \Repo\ContactListApp\ContactListApp\node_modules\metro-runtime\src\polyfills\require.js:177
    metroRequire \Repo\ContactListApp\ContactListApp\node_modules\metro-runtime\src\polyfills\require.js:92
    <anonymous> index.bundle:77803
```
		Thu Nov 28 21:33:46 AUSEST 2024
This one was a bit harder. I noticed the different parameters and started researching.... The other screens have {route, navigation}, after a bit of messing about I realised that what it really is is (props) ... then props( unpack object and keep route, navigation).
So what happens is if (props) says okay lets fill out contact, then contact = props.route.params.contact, which if in mode = 'Add' is going to be empty!!!!
modifying the line to contact = props.route.params.contact || {}, says okay, gimme the contact if its a real contact, but otherwise an empty contact will do. Not sure if this is the best way to do it, it's more a Luaism than anything. Probably should be if (mode === 'Add'),


Todo:

- [ ] Make a HTTP Post request to the backend to add a new contact
