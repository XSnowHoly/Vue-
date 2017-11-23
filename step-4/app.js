import Vue from 'vue';
import 'normalize.css';
import './css/app.css';

var app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        todoList: [],
        id: []
    },
    created: function() {
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList);
            window.localStorage.setItem('myTodos', dataString);
        }

        let oldDataString = window.localStorage.getItem('myTodos');
        let oldData = JSON.parse(oldDataString);
        this.todoList = oldData || [];
    },
    methods: {
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
        },

        removeTodo: function(todo) {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
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