import Vue from 'vue';
import AV from 'leancloud-storage';
import 'normalize.css';
import './css/app.css';

var APP_ID = 'T75QDBaNBgHKFY6aUJ2Rr9Pc-gzGzoHsz';
var APP_KEY = 'wW3q4jrktzc5suORpNP6dLUm';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        todoList: [],
        currentUser: null,
        id: [],
        username: null,
        actionType: 'signUp',
        formData: {
            usename: '',
            password: ''
        }
    },
    created: function() {
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList);
            window.localStorage.setItem('myTodos', dataString);
        }

        let oldDataString = window.localStorage.getItem('myTodos');
        let oldData = JSON.parse(oldDataString);
        this.todoList = oldData || [];
        this.currentUser = this.getCurrentUser();
        if (this.currentUser) {
            this.username = this.getUsername();
            console.log(this.username);
        }
    },
    methods: {
        saveTodos: function() {
            let dataString = JSON.stringify(this.todoList);
            var AVTodos = AV.Object.extend("AllTodos");
            var avTodos = new AVTodos();
            avTodos.set("content", dataString);
            avTodos.save().then(function() {
                alert("保存成功");
            }, function(error) {
                alert("保存失败");
            });
        },
        addTodo: function() {
            if (!this.newTodo) {
                alert("请输入值");
                return;
            }
            this.todoList.push({
                title: this.newTodo,
                createdAt: this.DateFormat(),
                done: false,
                id: this.idMaker()
            });
            this.newTodo = '';
            this.saveTodos();
        },

        removeTodo: function(todo) {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
            this.saveTodos();
        },

        signUp: function() {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
                if (this.currentUser) {
                    this.username = this.getUsername();
                    console.log(this.username);
                }
            }, function(error) {
                alert('注册失败');
            });
        },

        login: function() {
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
                if (this.currentUser) {
                    this.username = this.getUsername();
                    console.log(this.username);
                }
            }, function(error) {
                alert("登录失败");
            });
        },
        logout: function() {
            AV.User.logOut();
            this.currentUser = null;
            window.location.reload();
        },
        getCurrentUser: function() {
            let current = AV.User.current();
            if (current) {
                let { id, createdAt, attributes: { username } } = current;
                return { id, username, createdAt };
            } else {
                return null;
            }
        },
        getUsername: function() {
            let username = this.currentUser.username;
            if (username) {
                return username;
            } else {
                return null;
            }
        },

        DateFormat: function() {
            return new Date().toLocaleString("zh-CN");
        },

        idMaker: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r && 0x3 | 0x8);
                return v.toString(16);
            });
        }

    }
})