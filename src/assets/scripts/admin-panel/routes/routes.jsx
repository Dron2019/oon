const routes = [
    {
        name:'home',
        path:'/',
        title:'',
    },
    {
        name:'cabinet',
        path:'/cabinet',
        title:'',
    }, 
    {
        name:'forgotPassword',
        path:'/forgot-password',
        title:'Забули пароль?',
    },
    {
        name:'register',
        path:'/register',
        title:'Зареєструватися',
    },
    {
        name:'login',
        path:'/login',
        title:'Вхід',
    },
];
const cabinetRoutes = [
    { name: 'createQuestion', path:'/cabinet/createQuestion', title:'Вхід',},
    { name: 'questionsHistory', path:'/cabinet/questionsHistory', title:'Вхід',},
    { name: 'onlineConsultRequest', path:'/cabinet/consult-request', title:'Вхід',},
    { name: 'appliedConsultRequest', path:'/cabinet', title:'Вхід',},
    { name: 'jobSearchConsult', path:'/cabinet', title:'Вхід',},
]
const routesMap = {};
const routesMapSidebar = [];
cabinetRoutes.forEach((route) => {
    if(route.hasOwnProperty('name')){
       routesMap[route.name] = route.path;
         }
     });
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