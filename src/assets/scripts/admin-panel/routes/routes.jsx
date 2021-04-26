
// <Route exact path="/">
// {isLogined.isLogined ? 
// <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
// <LoginForm/>}
// </Route>
// <Route path="/register">
// <Register></Register>
// </Route>
// <Route path="/login">
// {isLogined.isLogined ? 
// <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
// <LoginForm/>}
// </Route>
// <Route  path="/cabinet">
// {isLogined.isLogined ? 
// <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
// <LoginForm/>}
// </Route>
// <Route path="/forgot-password">
//     <ForgotPassword/>
// </Route>
// ['Послуги психолога','/cabinet/psycho'],
//       ['Створити запитання','/cabinet/createQuestion'],
//       ['Історія запитань','/cabinet/questionHistory'],
//       ['Запит на онлайн консультацію','/cabinet/consult-request'],
//       ['Прийняті запити на консультацію','/cabinet'],
//       ['Послуги консультанта з пошуку роботи','/cabinet'],
const routes = [
    {
        name:'home',
        path:'/'
    },
    {
        name:'cabinet',
        path:'/cabinet'
    }, 
    {
        name:'forgotPassword',
        path:'/forgot-password',
    },
    {
        name:'register',
        path:'/register',
    },
    {
        name:'login',
        path:'/login',
    },
    
];
const routesMap = {};
const routesMapSidebar = [];

routes.forEach((route) => {
   if(route.hasOwnProperty('name')){
      routesMap[route.name] = route.path;
		}
	});
	
	
	for (let key in routesMap) {
		if (key == 'home' || key == 'order' || key == 'cart' ) {
			routesMapSidebar.push({
				'name': key,
				'url': routesMap[key]
			});
		}
	}
export default (function(){
    return routesMap;
})();