import module1 from './module1'
import {school} from './module2'
// import {add,sub} from './module3'
import '../css/index.less'

//注册PWA相关配置
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}

console.log(module1);
console.log(school);
// console.log(add(1,2));
// console.log(sub(3,4));

// 若module.hot 为true，说明开启了HMR功能
if (module.hot) {
	module.hot.accept('./module1.js', () => {
		//accept方法会监听 module1.js 文件的变化，一旦发生变化，会执行后面的回调函数,其他模块不会重新打包构建。
		console.log(module1);
	});
}

const btn = document.getElementById('btn')
btn.addEventListener('click',()=>{
	import(/* webpackChunkName: 'module3'*/'./module3').then(
		({add,sub}) => {
			console.log(add(1,2));
			console.log(sub(3,4));
		},
		reason => {console.log('引入模块失败',reason);}
	);
})

